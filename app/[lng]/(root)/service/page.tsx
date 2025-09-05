'use client'

import { useEffect, useState } from 'react'
import StarShower from '../_components/star-shower'
import { Services } from '@/constants'
import axios from 'axios'
import { API_SERVICE } from '@/services/api-service'
import { motion } from 'motion/react'
import useTranslate from '@/hooks/use-translate'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useParams } from 'next/navigation'




export default function Service() {
	const [services, setServices] = useState<Services[]>([])
	

	const t = useTranslate()
	const { lng } = useParams()
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
			<div className='relative flex items-center justify-center h-48 sm:h-60 md:h-72 overflow-hidden mt-20'>
				<h1 className='absolute text-[60px] sm:text-[100px] md:text-[160px] lg:text-[200px] font-extrabold text-gray-700/10 select-none'>
					{t('navitem.service')}
				</h1>

				<motion.h1
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='relative text-2xl sm:text-4xl md:text-6xl font-extrabold 
			bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 
			bg-clip-text text-transparent animate-gradient z-10 text-center px-2'
				>
					{t('navitem.service')}
				</motion.h1>

				{/* Yulduzcha animatsiya */}
				<div className='absolute inset-0 z-[11] pointer-events-none'>
					<StarShower height={300} count={120} size={1.5} width={2000} />
				</div>
			</div>
			<section className=' text-white py-16'>
				<div className='max-w-6xl mx-auto px-6'>
					<h2 className='text-3xl md:text-4xl font-bold mb-10 '>
						{t('services.section_t')}
					</h2>{' '}
					<br />
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 '>
						{services.map(item => (
							<div
								key={item.id}
								className='bg-gray-800 rounded-xl p-6 shadow hover:bg-gray-700 transition'
							>
								<h3 className='text-xl font-semibold mb-3'>{item.title}</h3>
								<p
									className='text-gray-300 text-sm leading-relaxed line-clamp-5'
									dangerouslySetInnerHTML={{ __html: item.description }}
								/>
								<Link href={`/${lng}/service/${item.slug}`}>
									<button className='mt-4 flex items-center justify-center md:justify-start gap-2 text-sm font-semibold text-white  hover:text-blue-400 transition'>
										{t('services.read_more')} <ArrowRight size={16} />
									</button>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
