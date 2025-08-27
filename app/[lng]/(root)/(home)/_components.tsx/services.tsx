'use client'

import React, { useEffect, useState } from 'react'
import 'react-alice-carousel/lib/alice-carousel.css'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Services } from '@/constants'
import { API_SERVICE } from '@/services/api-service'
import axios from 'axios'
import useTranslate from '@/hooks/use-translate'

const AliceCarousel = dynamic(() => import('react-alice-carousel'), {
	ssr: false,
})

export default function ServiceCarousel() {
	const responsive = {
		0: { items: 1 },
		640: { items: 1 },
		768: { items: 2 },
		1024: { items: 3 },
		1280: { items: 3 },
	}

	const [services, setServices] = useState<Services[]>([])
	const t=useTranslate()
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(API_SERVICE.services)
				setServices(res.data.results || [])
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [])

	// 🔹 Agar services bo‘sh bo‘lsa, hech narsa qaytarmaydi
	if (!services || services.length === 0) return null

	const itemsList = services.map((service, i) => (
		<div
			key={i}
			className='bg-gradient-to-b from-[#0B192C] to-[#11263D] text-white  
            p-6 rounded-2xl border border-gray-700 shadow-lg mx-4 
            min-h-[180px] flex flex-col md:flex-row items-center gap-6 
            hover:border-blue-500 transition-all duration-300'
		>
			{/* O‘ng tomonda text */}
			<div className='flex flex-col justify-between flex-1 text-center md:text-left'>
				<Link href={'/service'} key={service.id}>
					<h3 className='text-lg md:text-xl font-semibold mb-2'>
						{service.title}
					</h3>

					<div
						className='text-gray-300 text-sm md:text-base line-clamp-2 prose prose-invert max-w-none'
						dangerouslySetInnerHTML={{ __html: service.description }}
					/>
				</Link>
				<br />
				<button className='mt-4 flex items-center justify-center md:justify-start gap-2 text-sm font-semibold text-white  hover:text-blue-400 transition'>
					{t("services.read_more")} <ArrowRight size={16} />
				</button>
			</div>
		</div>
	))

	return (
		<div className='bg-[#0B192C] py-12 mt-20'>
			<div className='container mx-auto px-6'>
				{/* Text qismi */}
				<div className='flex flex-col md:flex-row text-white items-center mb-14'>
					<div>
						<div className='flex items-center gap-2 mb-3'>
							<span className='h-[2px] w-6 bg-blue-400'></span>
							<span
								className='from-blue-400 via-cyan-200 to-blue-400 
						bg-clip-text  text-white animate-gradient z-10 uppercase tracking-wide text-sm'
							>
							{t('services.section_title')}
							</span>
							<span className='h-[2px] w-6 bg-blue-400'></span>
						</div>
						<h2 className='text-3xl md:text-4xl font-bold leading-snug'>
							{t('services.main_title')} <br />
							<span className='block text-blue-400'>
								{t('services.subtitle_innovative')}
							</span>
							<span className='block'>
							{t('services.subtitle_success')}
							</span>
						</h2>
					</div>
				</div>
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
