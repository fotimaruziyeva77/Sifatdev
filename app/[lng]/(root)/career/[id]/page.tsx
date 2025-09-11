'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useTranslate from '@/hooks/use-translate'
import { VacancyTypes } from '@/interfaces'
import axios from 'axios'
import { Home, Briefcase } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function JobPost() {
	const [vacancy, setVacancy] = useState<VacancyTypes | null>(null)
	const { lng, id } = useParams()
	const t = useTranslate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`/api/vacancies/${id}`, {
					headers: {
						'Accept-Language': lng,
					},
				})
				setVacancy(res.data.data) // object
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [lng, id])

	const days = [
		t('days.mon'),
		t('days.tue'),
		t('days.wed'),
		t('days.thu'),
		t('days.fri'),
		t('days.sat'),
		t('days.sun'),
	]

	const formatWorkingDays = (daysStr: string) => {
		if (!daysStr) return ''
		const [start, end] = daysStr.split('-').map(Number)
		return `${days[start - 1]} - ${days[end - 1]}`
	}

	if (!vacancy) return <p className='text-white'>Yuklanmoqda...</p>

	return (
		<div className='bg-gray-900 text-white min-h-screen p-10 '>
			<div className='max-w-4xl mx-auto space-y-6 bg-gray-800/70  rounded-xl p-6'>
			<div className='space-y-6'>
					<Breadcrumb>
						<BreadcrumbList className='flex items-center gap-2 bg-gray-800/70 px-4 py-4 rounded-xl '>
							<BreadcrumbItem>
								<BreadcrumbLink
									href={`/${lng}/`}
									className='flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-400  transition'
								>
									<Home className='w-5 h-5' />
									{t('navitem.home')}
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbSeparator className='text-gray-400' />
							<BreadcrumbItem>
								<BreadcrumbLink
									href={`/${lng}/career`}
									className='flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-400  transition'
								>
									<Briefcase className='w-5 h-5' />
									{t('navitem.career')}
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className='text-gray-400' />
							<BreadcrumbItem>
								<BreadcrumbPage className='text-white font-semibold'>
									{vacancy?.title || 'Vakansiya'}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<h1 className='text-3xl font-bold'>{vacancy.title}</h1>
				<p className='text-gray-400'>
					{formatWorkingDays(vacancy.workingDays)} | {vacancy.workingTimes}
				</p>

				<div
					className='space-y-3 text-gray-300'
					dangerouslySetInnerHTML={{ __html: vacancy.description }}
				/>

				<Dialog>
					<DialogTrigger asChild>
						<Button className='bg-green-600 hover:bg-green-700 text-white'>
							{t('vacancy.resume')}
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-2xl bg-gray-900 text-white '>
						<DialogHeader>
							<DialogTitle className='text-white'>{t('vacancy.resume')}</DialogTitle>
							<DialogDescription className='text-gray-300'>
							
								<form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									{' '}
									{/* F.I.SH. */}{' '}
									<div className='space-y-2'>
										{' '}
										<Label className='text-white'>{t('vacancy.fullname')}</Label>{' '}
										<Input
											placeholder={t('vacancy.name')}
											className='text-white placeholder:text-gray-600 border-none px-4 py-4 bg-gray-800'
										/>{' '}
									</div>{' '}
									{/* Telefon raqam */}{' '}
									<div className='space-y-2'>
										{' '}
										<Label className='text-white'>
											{t('vacancy.phone')}
										</Label>{' '}
										<Input
											type='tel'
											placeholder='+998 90 123 45 67'
											className='text-white placeholder:text-gray-600 border-none px-4 py-4 bg-gray-800'
										/>{' '}
									</div>{' '}
									{/* Vakansiya tanlash */}{' '}
								
									{/* CV Yuklash */}{' '}
									<div className='space-y-2'>
										{' '}
										<Label className='text-white font-medium'>
											{t('vacancy.select')}
										</Label>{' '}
										<label className='flex items-center justify-between w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-700 text-gray-300'>
											{' '}
											<span>	{t('vacancy.select')}</span>{' '}
											<span className='text-green-500 font-bold text-xl'>
												+
											</span>{' '}
											<input type='file' accept='.pdf' className='hidden' />{' '}
										</label>{' '}
									</div>{' '}
									{/* Submit button */}{' '}
									<div className='md:col-span-2 flex justify-center mt-2'>
										{' '}x
										<Button
											type='submit'
											className='w-1/3 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2'
										>
											{' '}
											{t('vacancy.submit')} 🚀{' '}
										</Button>{' '}
									</div>{' '}
								</form>
							</DialogDescription>
						</DialogHeader>
						{/* form qismi shu yerda qoladi */}
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
