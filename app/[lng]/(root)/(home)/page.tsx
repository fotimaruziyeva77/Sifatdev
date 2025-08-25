'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
	ArrowRight,
	CheckCircle2,
	Facebook,
	Instagram,
	Linkedin,
	Send,
} from 'lucide-react'
import {  stats } from '@/constants'
import { Card } from '@/components/ui/card'

import BlogSection from './_components.tsx/blogs'
import ServiceCarousel from './_components.tsx/services'
import ContactSection from './_components.tsx/contact'
import TeamSection from './_components.tsx/team'

function Page() {
	const slides = [
		'/assets/slider-2-1.jpg',
		'/assets/slider-2-2.jpg',
		'/assets/slider-2-3.jpg',
	]
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent(prev => (prev + 1) % slides.length)
		}, 5000)
		return () => clearInterval(interval)
	}, [slides.length])

	return (
		<div>
			{/* HERO */}
			<div className='mt-16 md:mt-20'>
				<div className='relative shadow-md z-10'>
					<div className='relative'>
						<div className='relative h-[500px] sm:h-[600px] lg:h-[750px]'>
							{/* BG IMAGE */}
							<div
								className='absolute inset-0 bg-center bg-cover transition-all duration-1000'
								style={{ backgroundImage: `url(${slides[current]})` }}
							>
								<div className='absolute inset-0 bg-gradient-to-l from-transparent to-[#08111fe6]' />
								<div className='absolute inset-0 opacity-80 bg-gradient-to-tl from-transparent to-black' />
							</div>

							{/* CONTENT */}
							<div className='relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-32 py-18 sm:py-36 md:py-48 z-30 text-center md:text-left'>
								<div className='inline-flex items-center gap-2 bg-white/5 rounded-[17px] px-4 sm:px-5 py-2 border border-gradient-to-r from-[#6065d4] to-[#fa5674]'>
									{/* Faqat katta ekranlarda chiqadi */}
									<p className='hidden md:block text-xs font-bold text-white'>
										Sizning muvaffaqiyatingiz uchun yaratilgan IT yechimlar
									</p>
								</div>

								<h2 className='mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium leading-snug text-white max-w-3xl'>
									Sifatli IT{' '}
									<span className='text-blue-400'>strategiyalar</span>{' '}
									biznesingizni
									<span className='text-blue-400'>
										{' '}
										yangi marralarga olib chiqish
									</span>
								</h2>

								<p className='mt-4 mb-8 text-sm sm:text-base md:text-lg text-gray-300 leading-7 max-w-2xl mx-auto md:mx-0'>
									Strategik IT maslahatlaridan tortib mukammal loyiha joriy
									etishgacha — biz sizga samaradorlikni oshiradigan yechimlar
									taklif etamiz
								</p>
								<div className='flex flex-row gap-4 justify-center md:justify-start'>
									<Link
										href='/contact'
										className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2'
									>
										Bog‘lanish <ArrowRight />
									</Link>
									<Link
										href='/about'
										className='border border-gradient-to-r from-[#6065d4] to-[#fa5674] text-white px-6 py-3 rounded-lg flex items-center gap-2'
									>
										Batafsil <ArrowRight />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ABOUT */}
			<div className='bg-[#0B192C] py-12 shadow-md text-white'>
	<div className='container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
		{/* IMAGES */}
		<div className='flex flex-wrap gap-4 lg:w-[700px]'>
			<Card className='relative overflow-hidden cursor-pointer w-full aspect-[16/9]'>
				<Image
					src='/assets/about.png'
					alt='SifatDev jamoasi'
					fill
					className='object-cover hover:scale-105 transition-transform duration-500'
				/>
			</Card>
			<Card className='relative overflow-hidden cursor-pointer w-full sm:w-[48%] aspect-[4/3]'>
				<Image
					src='/assets/about-one-img-1.jpg'
					alt='SifatDev ish jarayoni'
					fill
					className='object-cover hover:scale-105 transition-transform duration-500'
				/>
			</Card>
			<Card className='relative overflow-hidden cursor-pointer w-full sm:w-[48%] aspect-[4/3]'>
				<Image
					src='/assets/about-two-img-2.jpg'
					alt='Jamoa uchrashuvi'
					fill
					className='object-cover hover:scale-105 transition-transform duration-500'
				/>
			</Card>
		</div>

		{/* TEXT (o‘zgarmagan qismi) */}
		<div className='flex-1 flex flex-col gap-4 text-center lg:text-left'>
			<h1 className='text-blue-400 tracking-wider uppercase text-sm'>
				Biz haqimizda
			</h1>
			<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold leading-snug'>
				🚀 <span className='text-blue-400'>SifatDev</span> — Kelajakni{' '}
				<span className='text-blue-400'>Kodlaymiz</span>
			</h2>
			<p className='text-gray-300 mt-2 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0'>
				SifatDev — bu turli yo‘nalishdagi iqtidorli dasturchilar,
				dizaynerlar va IT mutaxassislar jamlangan professional jamoa...
			</p>

			{/* CHECKS */}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-300'>
				{[
					'Zamonaviy texnologiyalar va frameworklar',
					'Sifat va tezlikka asoslangan ishlab chiqish',
					'Innovatsion va foydalanuvchiga qulay dizayn',
					'Doimiy qo‘llab-quvvatlash va hamkorlik',
				].map((item, idx) => (
					<div key={idx} className='flex items-start gap-2'>
						<CheckCircle2 className='text-blue-400 w-5 h-5 mt-1' />
						<span className='text-sm sm:text-base'>{item}</span>
					</div>
				))}
			</div>

			{/* STATS */}
			<div className='flex flex-wrap justify-center lg:justify-start items-center gap-6 mt-6'>
				<div>
					<p className='text-yellow-400 text-2xl sm:text-3xl font-bold'>5+</p>
					<p className='text-gray-400 text-sm'>Yillik Tajriba</p>
				</div>
				<div>
					<p className='text-yellow-400 text-2xl sm:text-3xl font-bold'>50+</p>
					<p className='text-gray-400 text-sm'>Loyihalar</p>
				</div>
				<div>
					<p className='text-yellow-400 text-2xl sm:text-3xl font-bold'>30+</p>
					<p className='text-gray-400 text-sm'>Hamkorlar</p>
				</div>
			</div>

			{/* CTA */}
			<div className='flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-6 mt-6'>
				<div className='text-center sm:text-left'>
					<p className='text-blue-400 text-sm'>Bog‘lanish uchun</p>
					<p className='font-semibold text-lg'>+998 (88) 378 08 08</p>
				</div>
				<Link
					href='/service'
					className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition'
				>
					Xizmatlarimiz <ArrowRight />
				</Link>
			</div>
		</div>
	</div>
</div>


			{/* STATS */}
			<section className='bg-gradient-to-r from-[#0a1d4d] to-[#042b70] py-12 relative overflow-hidden'>
				<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center'>
					{stats.map((item, idx) => {
						const Icon = item.icon
						return (
							<div key={idx} className='flex flex-col items-center'>
								<div className='bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full shadow-lg mb-3 text-white'>
									<Icon size={28} strokeWidth={2} />
								</div>
								<h3 className='text-white text-2xl sm:text-3xl font-bold'>
									{item.number}
								</h3>
								<p className='text-gray-300 text-sm sm:text-base'>
									{item.label}
								</p>
							</div>
						)
					})}
				</div>
			</section>

			{/* SECTIONS */}
			<div>
				<ServiceCarousel />
			</div>
			<div>
				<TeamSection />
			</div>
			<div>
				<BlogSection />
			</div>
			<div>
				<ContactSection />
			</div>
		</div>
	)
}

export default Page
