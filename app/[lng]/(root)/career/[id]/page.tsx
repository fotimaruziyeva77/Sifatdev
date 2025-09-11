'use client'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import useTranslate from '@/hooks/use-translate'
import { VacancyTypes } from '@/interfaces'
import axios from 'axios'
import { Home, Briefcase } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function JobPost() {
	const [vacancy, setVacancy] = useState<VacancyTypes | null>(null)
	const { lng, id } = useParams()
const router = useRouter()
	const t = useTranslate()
	const [senderName, setSenderName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const [file, setFile] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!senderName || !phoneNumber || !vacancy || !file) {
			toast.error('Barcha maydonlarni to‘ldiring!')
			return
		}

		setLoading(true)
		try {
			const formData = new FormData()
			formData.append('file', file)

			const uploadRes = await axios.post('/api/upload', formData)
			const fileUrl = uploadRes.data.url

			await axios.post('/api/send-resume', {
				senderName,
				phoneNumber,
				vacancy,
				cv: fileUrl,
			})

			toast.success(t('success.toast'))
			setSenderName('')
			setPhoneNumber('')
			setVacancy(null)
			setFile(null)
			router.push(`/${lng}/`)
		} catch (err: any) {
			console.error(err)
			toast.error(err.response?.data?.error || t('error.contacterror'))
		} finally {
			setLoading(false)
		}
	}
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

	if (!vacancy) return 
	<div className="loader"></div>


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
							<DialogTitle>Rezyume yuboring</DialogTitle>
						</DialogHeader>
						<form
							onSubmit={handleSubmit}
							className='grid grid-cols-1 md:grid-cols-2 gap-4'
						>
							<div className='space-y-2'>
								<Label className='text-white'>F.I.SH.</Label>
								<Input
									value={senderName}
									onChange={e => setSenderName(e.target.value)}
									placeholder='Ismingizni kiriting'
									className='text-white placeholder:text-gray-600 border-none px-4 py-4 bg-gray-800'
								/>
							</div>

							<div className='space-y-2'>
								<Label className='text-white'>Telefon raqamingiz</Label>
								<Input
									type='tel'
									value={phoneNumber}
									onChange={e => setPhoneNumber(e.target.value)}
									placeholder='+998 90 123 45 67'
									className='text-white placeholder:text-gray-600 border-none px-4 py-4 bg-gray-800'
								/>
							</div>

							<div className='space-y-2'>
								<Label className='text-white'>Vakansiya</Label>
								<Input value={vacancy.title} readOnly className='text-white placeholder:text-gray-600 border-none px-4 py-6 bg-gray-800'/>
							
							</div>

							<div className='space-y-2'>
								<Label className='text-white font-medium'>Upload CV</Label>
								<label className='flex items-center justify-between w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-700 text-gray-300'>
									<span>{file ? file.name : 'Upload CV'}</span>
									<span className='text-green-500 font-bold text-xl'>+</span>
									<input
										type='file'
										accept='.pdf,.doc,.docx'
										className='hidden'
										onChange={e =>
											setFile(e.target.files ? e.target.files[0] : null)
										}
									/>
								</label>
							</div>

							<div className='md:col-span-2'>
								<Button
									type='submit'
									disabled={loading}
									className='w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2'
								>
									{loading ? 'Yuborilmoqda...' : 'Ariza yuborish 🚀'}
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
