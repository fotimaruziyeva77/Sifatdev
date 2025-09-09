'use client'

import { useState, useEffect } from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash, Pizza } from 'lucide-react'
import VacancyFormModal from './_components/accordion-form'
import { VacancyTypes } from '@/interfaces'

export default function Page() {
	const [vacancies, setVacancies] = useState<VacancyTypes[]>([])
	const [openModal, setOpenModal] = useState(false)
	const [selectedVacancy, setSelectedVacancy] = useState<VacancyTypes | null>(
		null
	)

	const fetchVacancies = async () => {
		try {
			const res = await fetch('/api/vacancies')
			const data = await res.json()
			if (data.success) setVacancies(data.data)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		fetchVacancies()
	}, [])

	const handleAdd = () => {
		setSelectedVacancy(null)
		setOpenModal(true)
	}

	const handleEdit = (vacancy: VacancyTypes) => {
		setSelectedVacancy(vacancy)
		setOpenModal(true)
	}

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this vacancy?')) return
		try {
			await fetch(`/api/vacancies/${id}`, { method: 'DELETE' })
			fetchVacancies()
		} catch (err) {
			console.error(err)
		}
	}

	const days = [
		'Dushanba',
		'Seshanba',
		'Chorshanba',
		'Payshanba',
		'Juma',
		'Shanba',
		'Yakshanba',
	]

	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='px-3 py-3 bg-gradient-to-r from-neutral-300 to-transparent flex items-center justify-between'>
				<h1 className='text-3xl font-semibold !mb-0'>Vacancies</h1>
				<Button
					onClick={handleAdd}
					className='flex items-center gap-2 bg-blue-500 cursor-pointer hover:bg-blue-700 !text-white'
				>
					<Plus size={18} /> Add Vacancy
				</Button>
			</div>

			<div className='flex flex-col px-3'>
				<Accordion type='single' collapsible>
					{vacancies.map(v => (
						<AccordionItem key={v._id} value={v._id}>
							<AccordionTrigger>
								<div className='flex justify-between items-center w-full'>
									<span>
										{v.title} —{' '}
										<span className='text-sm text-gray-500'>
											{`${v?.createdAt.split('T')[0]}, ${v?.createdAt
												.split('T')[1]
												.slice(0, 5)}`}
										</span>
									</span>
									<div className='flex gap-2'>
										<Pencil
											size={18}
											className='cursor-pointer text-blue-500'
											onClick={e => {
												e.stopPropagation()
												handleEdit(v)
											}}
										/>
										<Trash
											size={18}
											className='cursor-pointer text-red-500'
											onClick={e => {
												e.stopPropagation()
												handleDelete(v._id)
											}}
										/>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className='space-y-2'>
									<div
										className='prose max-w-none prose-li:marker:text-blue-500'
										dangerouslySetInnerHTML={{ __html: v.description }}
									/>

									<p>
										<b>Workdays:</b> {days[Number(v.workingDays.split('-')[0])]}{' '}
										- {days[Number(v.workingDays.split('-')[1])]}
									</p>
									<p>
										<b>Worktime:</b> {v.workingTimes}
									</p>
									<p>
										<b>Pricing:</b> {v.pricing}
									</p>
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
			{vacancies.length === 0 && (
				<p className='text-center w-full text-sm text-muted-foreground flex items-center justify-center'>
					<Pizza size={18} />
					No data
				</p>
			)}

			<VacancyFormModal
				open={openModal}
				onClose={() => setOpenModal(false)}
				onSaved={() => {
					fetchVacancies()
					setOpenModal(false)
				}}
				vacancy={selectedVacancy || undefined}
			/>
		</div>
	)
}
