'use client'

import React, { useEffect, useState } from 'react'
import 'react-alice-carousel/lib/alice-carousel.css'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import axios from 'axios'
import useTranslate from '@/hooks/use-translate'
import { useParams } from 'next/navigation'
import { ServiceTypes } from '@/interfaces'
import Image from 'next/image'

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
	const { lng } = useParams()

	const [services, setServices] = useState<ServiceTypes[]>([])
	const t = useTranslate()
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get('/api/services', {
					headers: {
						'Accept-Language': lng,
					},
				})
				setServices(res.data.data || [])
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [lng])

	if (!services || services.length === 0) return null

const itemsList = services.map((service, i) => (
	<div
		key={i}
		className='bg-gradient-to-b from-[#0B192C] to-[#11263D] text-white  
            rounded-2xl border border-gray-700 shadow-lg mx-2 
            min-h-[320px] flex flex-col hover:border-blue-500 transition-all duration-300'
	>
		{/* Yuqorida rasm */}
		<div className='w-full h-[180px]'>
			<Image
				src={service.icon}
				alt={service.title}
				width={400}
				height={180}
				className='w-full h-full rounded-t-2xl object-cover shadow-md'
			/>
		</div>

		{/* Pastda text */}
		<div className='flex flex-col flex-1 justify-between p-6  md:text-left'>
			<Link href={`/${lng}/service/${service.slug}`} key={service._id}>
			<div className='flex justify-between'>
					<h3 className='text-lg md:text-xl font-semibold mb-2'>
					{service.title}
				</h3>
				<span>{service.createdAt.slice(0, 10).split('-').reverse().join('.')}</span>
			</div>

				<div
					className='text-gray-300 text-sm md:text-base line-clamp-2 prose prose-invert max-w-none'
					dangerouslySetInnerHTML={{ __html: service.description }}
				/>
			</Link>

			<Link href={`/${lng}/service/${service.slug}`}>
				<button className='mt-4 flex items-center justify-center md:justify-start gap-2 text-sm font-semibold text-white hover:text-blue-400 transition'>
					{t('services.read_more')} <ArrowRight size={16} />
				</button>
			</Link>
		</div>
	</div>
))



	return (
		<div className='bg-[#0B192C] py-12 '>
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
							<span className='block'>{t('services.subtitle_success')}</span>
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
