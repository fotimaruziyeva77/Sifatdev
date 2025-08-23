'use client'

import { useEffect, useState } from 'react'
import StarShower from '../_components/star-shower'
import { Services } from '@/constants'
import axios from 'axios'
import { API_SERVICE } from '@/services/api-service'

export default function Service() {
	const [services, setServices] = useState<Services[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(API_SERVICE.services)
				setServices(res.data.results)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [])

	
	return (
		<div className='mt-20 min-h-screen px-6 mb-10'>
			<div className='relative flex items-center justify-center h-60 overflow-hidden'>
				<h1 className='absolute text-[210px] font-extrabold text-gray-700/20 select-none pt-20'>
					Xizmatlarimiz
				</h1>

				<h1 className='relative text-4xl font-extrabold text-white z-10'>
					Xizmatlarimiz
				</h1>

				<div className='absolute inset-0 z-[11] pointer-events-none'>
					<StarShower height={300} count={100} size={1.5} width={2000} />
				</div>
			</div>
			<section className=' text-white py-16'>
				<div className='max-w-6xl mx-auto px-6'>
					<h2 className='text-3xl md:text-4xl font-bold mb-10 '>
						Qanday yechim xohlaysiz?
					</h2>{' '}
					<br />
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
						{services.map(item => (
							<div
								key={item.id}
								className='bg-gray-800 rounded-xl p-6 shadow hover:bg-gray-700 transition'
							>
								<h3 className='text-xl font-semibold mb-3'>{item.title}</h3>
								<p
									className='text-gray-300 text-sm leading-relaxed line-clamp-3'
									dangerouslySetInnerHTML={{ __html: item.description }}
								/>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
