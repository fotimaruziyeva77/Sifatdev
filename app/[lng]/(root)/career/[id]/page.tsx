'use client'

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


export default function JobPost() {
	return (
		<div className='bg-gray-900 text-white min-h-screen p-10 mt-10'>
			<div className='max-w-4xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold'>
					Middle Backend Software Engineer (Python Django)
				</h1>
				<p className='text-gray-400'>Dushanba-Juma | 09:00-18:00</p>

				{/* Talablar */}
				<section>
					<h2 className='text-xl font-semibold mb-2'>Talablar</h2>
					<ul className='list-disc list-inside space-y-1 text-gray-300'>
						<li>Python va Django tajribasi kamida 2.5 yil</li>
						<li>Mikro-xizmat yechimlarini ishlab chiqish...</li>
						<li>Ma’lumotlar bazasi tajribasi va SQL so‘rovlari yozish</li>
						<li>Texnik hujjatlar bilan ishlash...</li>
						<li>Python 3, Django, Django Rest Framework...</li>
						<li>Portfolio (kamida 3 ta loyiha)</li>
						<li>Git versiya boshqarish tizimi</li>
						<li>Docker</li>
					</ul>
				</section>

				{/* Vazifalar */}
				<section>
					<h2 className='text-xl font-semibold mb-2'>Vazifalar</h2>
					<ul className='list-disc list-inside space-y-1 text-gray-300'>
						<li>API-ni ishlab chiqish va sinovdan o‘tkazish</li>
						<li>Python, Django-da loyihalar ishlab chiqish</li>
						<li>Jamoa ishlarini qo‘llab-quvvatlash</li>
						<li>Ingliz tilida aloqa qilish</li>
						<li>Docker va konteynerlashtirish</li>
					</ul>
				</section>

				{/* Shartlar */}
				<section>
					<h2 className='text-xl font-semibold mb-2'>Shartlar</h2>
					<ul className='list-disc list-inside space-y-1 text-gray-300'>
						<li>Ish vaqti 5/2, 09:00 – 18:00</li>
						<li>Korporativ ta’lim va treninglar</li>
						<li>Professional jamoa bilan ishlash imkoniyati</li>
						<li>Yangi texnologiyalar va qulay ish muhiti</li>
						<li>Bonus tizimi</li>
						<li>Kodeksga muvofiq ish bilan ta’minlash</li>
					</ul>
				</section>

				{/* Dialog ochiladigan tugma */}
				<Dialog>
					<DialogTrigger asChild>
						<Button className='bg-green-600 hover:bg-green-700 text-white'>
							Rezyume yuborish
						</Button>
					</DialogTrigger>

					<DialogContent className='sm:max-w-2xl bg-gray-900 text-white '>
						<DialogHeader>
							<DialogTitle className='text-white'>Rezyume yuborish</DialogTitle>
							<DialogDescription className='text-gray-300'>
								Quyidagi formani to‘ldiring va rezyumeingizni yuboring.
							</DialogDescription>
						</DialogHeader>

						<form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{/* F.I.SH. */}
							<div className='space-y-2'>
								<Label className='text-white'>F.I.SH.</Label>
								<Input
									placeholder='Ismingizni kiriting'
									className='text-white placeholder:text-gray-600 border-none px-4 py-4 bg-gray-800'
								/>
							</div>

							{/* Telefon raqam */}
							<div className='space-y-2'>
								<Label className='text-white'>Telefon raqamingiz</Label>
								<Input
									type='tel'
									placeholder='+998 90 123 45 67'
									className='text-white placeholder:text-gray-600 border-none px-4 py-4 bg-gray-800'
								/>
							</div>

							{/* Vakansiya tanlash */}
							<div className='space-y-2'>
								<Label className='text-white'>Vakansiya tanlang</Label>
								<select
									defaultValue=''
									className='w-full rounded-md border placeholder:text-gray-600 border-gray-600 bg-gray-800 text-white px-3 py-2'
								>
									<option value='' disabled className='text-gray-400'>
										Vakansiya tanlang
									</option>
									<option value='1' className='text-white'>
										Frontend Developer
									</option>
									<option value='2' className='text-white'>
										Backend Developer
									</option>
									<option value='3' className='text-white'>
										Designer
									</option>
								</select>
							</div>

							{/* CV Yuklash */}
							<div className='space-y-2'>
								<Label className='text-white font-medium'>Upload CV</Label>
								<label className='flex items-center justify-between w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-700 text-gray-300'>
									<span>Upload CV</span>
									<span className='text-green-500 font-bold text-xl'>+</span>
									<input type='file' accept='.pdf' className='hidden' />
								</label>
							</div>

							{/* Submit button */}
							<div className='md:col-span-2'>
								<Button
									type='submit'
									className='w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2'
								>
									Ariza yuborish 🚀
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
