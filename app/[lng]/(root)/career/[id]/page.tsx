'use client'

import { useState } from 'react'
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
import { toast } from 'sonner'
import axios from 'axios'

export default function JobPost() {
	const [senderName, setSenderName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [vacancy, setVacancy] = useState('')
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

			toast.success('Rezyume yuborildi 🚀')
			setSenderName('')
			setPhoneNumber('')
			setVacancy('')
			setFile(null)
		} catch (err: any) {
			console.error(err)
			toast.error(err.response?.data?.error || 'Xatolik yuz berdi!')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='bg-gray-900 text-white min-h-screen p-10 mt-10'>
			<div className='max-w-4xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold'>
					Middle Backend Software Engineer (Python Django)
				</h1>
				<p className='text-gray-400'>Dushanba-Juma | 09:00-18:00</p>
				<section>
					{' '}
					<h2 className='text-xl font-semibold mb-2'>Talablar</h2>{' '}
					<ul className='list-disc list-inside space-y-1 text-gray-300'>
						{' '}
						<li>Python va Django tajribasi kamida 2.5 yil</li>{' '}
						<li>Mikro-xizmat yechimlarini ishlab chiqish...</li>{' '}
						<li>Ma’lumotlar bazasi tajribasi va SQL so‘rovlari yozish</li>{' '}
						<li>Texnik hujjatlar bilan ishlash...</li>{' '}
						<li>Python 3, Django, Django Rest Framework...</li>{' '}
						<li>Portfolio (kamida 3 ta loyiha)</li>{' '}
						<li>Git versiya boshqarish tizimi</li> <li>Docker</li>{' '}
					</ul>{' '}
				</section>{' '}
				<section>
					{' '}
					<h2 className='text-xl font-semibold mb-2'>Vazifalar</h2>{' '}
					<ul className='list-disc list-inside space-y-1 text-gray-300'>
						{' '}
						<li>API-ni ishlab chiqish va sinovdan o‘tkazish</li>{' '}
						<li>Python, Django-da loyihalar ishlab chiqish</li>{' '}
						<li>Jamoa ishlarini qo‘llab-quvvatlash</li>{' '}
						<li>Ingliz tilida aloqa qilish</li>{' '}
						<li>Docker va konteynerlashtirish</li>{' '}
					</ul>{' '}
				</section>{' '}
				<section>
					{' '}
					<h2 className='text-xl font-semibold mb-2'>Shartlar</h2>{' '}
					<ul className='list-disc list-inside space-y-1 text-gray-300'>
						{' '}
						<li>Ish vaqti 5/2, 09:00 – 18:00</li>{' '}
						<li>Korporativ ta’lim va treninglar</li>{' '}
						<li>Professional jamoa bilan ishlash imkoniyati</li>{' '}
						<li>Yangi texnologiyalar va qulay ish muhiti</li>{' '}
						<li>Bonus tizimi</li> <li>Kodeksga muvofiq ish bilan ta’minlash</li>{' '}
					</ul>{' '}
				</section>
				<Dialog>
					<DialogTrigger asChild>
						<Button className='bg-green-600 hover:bg-green-700 text-white'>
							Rezyume yuborish
						</Button>
					</DialogTrigger>

					<DialogContent className='sm:max-w-2xl bg-gray-900 text-white'>
						<DialogHeader>
							<DialogTitle className='text-white'>Rezyume yuborish</DialogTitle>
							<DialogDescription className='text-gray-300'>
								Quyidagi formani to‘ldiring va rezyumeingizni yuboring.
							</DialogDescription>
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
								<Label className='text-white'>Vakansiya tanlang</Label>
								<select
									value={vacancy}
									onChange={e => setVacancy(e.target.value)}
									className='w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2'
								>
									<option value='' disabled className='text-gray-400'>
										Vakansiya tanlang
									</option>
									<option value='Frontend Developer'>Frontend Developer</option>
									<option value='Backend Developer'>Backend Developer</option>
									<option value='Designer'>Designer</option>
								</select>
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
