'use client'

import { useState, useEffect } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css'
import dynamic from 'next/dynamic'

interface VacancyFormModalProps {
	open: boolean
	onClose: () => void
	onSaved: () => void
	vacancy?: any
}

export default function VacancyFormModal({
	open,
	onClose,
	onSaved,
	vacancy,
}: VacancyFormModalProps) {
	const [form, setForm] = useState({
		title: '',
		description: '',
		startDay: '1',
		endDay: '5',
		startTime: '09:00',
		endTime: '18:00',
		pricing: '',
	})

	useEffect(() => {
		if (vacancy) {
			const [startDay, endDay] = vacancy.workingDays?.split('-') || ['1', '5']
			const [startTime, endTime] = vacancy.workingTimes?.split('-') || [
				'09:00',
				'18:00',
			]

			setForm({
				title: vacancy.title,
				description: vacancy.description,
				startDay,
				endDay,
				startTime,
				endTime,
				pricing: vacancy.pricing || '',
			})
		}
	}, [vacancy])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async () => {
		const payload = {
			title: form.title,
			description: form.description,
			workingDays: `${form.startDay}-${form.endDay}`,
			workingTimes: `${form.startTime}-${form.endTime}`,
			pricing: form.pricing,
		}

		if (vacancy) {
			await fetch(`/api/vacancies/${vacancy._id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})
		} else {
			await fetch(`/api/vacancies`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})
		}
		onSaved()
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='max-w-lg bg-white max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>{vacancy ? 'Edit Vacancy' : 'Add Vacancy'}</DialogTitle>
				</DialogHeader>

				<div className='flex flex-col gap-3'>
					<Input
						name='title'
						placeholder='Title'
						value={form.title}
						onChange={handleChange}
					/>

					<label>Description:</label>
					<div className='h-48'>
						<ReactQuill
							theme='snow'
							value={form.description}
							onChange={val => setForm({ ...form, description: val })}
							modules={{
								toolbar: [
									[{ header: [1, 2, 3, false] }],
									['bold', 'italic', 'underline', 'strike'],
									[{ list: 'ordered' }, { list: 'bullet' }],
									['blockquote', 'code-block'],
									[{ align: [] }],
									['link', 'image'],
									['clean'],
								],
							}}
							className='h-full'
						/>
					</div>

					<div className='flex gap-2 mt-20'>
						<div className='flex flex-col w-1/2'>
							<label>Start Day (1=Mon, 7=Sun)</label>
							<Input
								type='number'
								min={1}
								max={7}
								name='startDay'
								value={form.startDay}
								onChange={handleChange}
							/>
						</div>
						<div className='flex flex-col w-1/2'>
							<label>End Day</label>
							<Input
								type='number'
								min={1}
								max={7}
								name='endDay'
								value={form.endDay}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className='flex gap-2'>
						<div className='flex flex-col w-1/2'>
							<label>Start Time</label>
							<Input
								type='time'
								name='startTime'
								value={form.startTime}
								onChange={handleChange}
							/>
						</div>
						<div className='flex flex-col w-1/2'>
							<label>End Time</label>
							<Input
								type='time'
								name='endTime'
								value={form.endTime}
								onChange={handleChange}
							/>
						</div>
					</div>

					<Input
						name='pricing'
						placeholder='Pricing'
						value={form.pricing}
						onChange={handleChange}
					/>

					<div className='flex justify-end gap-2 mt-4'>
						<Button
							variant='outline'
							onClick={onClose}
							className='!text-white hover:bg-blue-950 cursor-pointer'
						>
							Cancel
						</Button>
						<Button
							className='bg-blue-500 hover:bg-blue-600 !text-white cursor-pointer'
							onClick={handleSubmit}
						>
							{vacancy ? 'Update' : 'Create'}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
