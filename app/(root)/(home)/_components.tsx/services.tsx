'use client'

import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
	{
		id:1,
		title: 'Data Analytics Consulting',
		desc: 'Maʼlumotlarni tahlil qilish orqali biznes qarorlaringizni optimallashtiring.',
	},
	{
		id:2,
		title: 'Cloud Solutions Provider',
		desc: 'Bulut texnologiyalari bilan xavfsiz va tezkor IT infratuzilmani yarating.',
	},
	{
		id:3,
		title: 'Cybersecurity Services',
		desc: 'Biznesingizni kiberxavflardan himoya qilish uchun ilg‘or xavfsizlik yechimlari.',
	},
	{
		id:4,
		title: 'Software Development',
		desc: 'Moslashtirilgan dasturiy taʼminot orqali ish jarayonlaringizni avtomatlashtiring.',
	},
	{
		id:5,
		title: 'IT Infrastructure Management',
		desc: 'Serverlar, tarmoqlar va tizimlarni samarali boshqarish va qo‘llab-quvvatlash.',
	},
	{
		id:6,
		title: 'AI & Machine Learning',
		desc: 'Sunʼiy intellekt yordamida maʼlumotlardan ko‘proq foyda oling.',
	},
]

export default function ServiceCarousel() {
	const responsive = {
		0: { items: 1 },
		768: { items: 2 },
		992: { items: 3 },
		1200: { items: 3 },
	}

	const itemsList = services.map((service, i) => (
		<div
			key={i}
			className='bg-gradient-to-b from-[#0B192C] to-[#11263D] text-white  p-6 rounded-2xl border border-gray-700 shadow-lg mx-2 h-56 flex flex-col justify-between hover:border-blue-500 transition-all duration-300'
		>
			<div>
				<Link href={'/service'}>
					<h3 className='text-xl font-semibold mb-2'>{service.title}</h3>
					<p className='text-gray-300 text-sm'>{service.desc}</p>
				</Link>
			</div>
			<button className='flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-400 transition'>
				Read More <ArrowRight size={16} />
			</button>
		</div>
	))

	return (
		<div className='bg-[#0B192C] py-12'>
			<div className='container mx-auto px-6'>
				{/* Text qismi */}
				<div className='flex flex-col md:flex-row text-white items-center mb-14'>
					<div>
						<div className='flex items-center gap-2 mb-3'>
							<span className='h-[2px] w-6 bg-blue-400'></span>
							<span className='text-blue-400 uppercase tracking-wide text-sm'>
								Bizning xizmatlar
							</span>
							<span className='h-[2px] w-6 bg-blue-400'></span>
						</div>
						<h2 className='text-3xl md:text-4xl font-bold leading-snug'>
							Zamonaviy IT yechimlari bilan biznesingizni rivojlantiring <br />
							<span className='block text-blue-400'>
								Innovatsion IT xizmatlari
							</span>
							<span className='block'>
								Sizning muvaffaqiyatingiz uchun moslashtirilgan
							</span>
						</h2>
					</div>
				</div>

				{/* Carousel qismi */}
				<AliceCarousel
					mouseTracking
					infinite
					autoPlay
					autoPlayInterval={3000}
					disableDotsControls={false}
					disableButtonsControls
					responsive={responsive}
					items={itemsList}
				/>
			</div>
		</div>
	)
}
