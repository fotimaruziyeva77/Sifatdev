'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import StarShower from '../_components/star-shower'
import { ArrowRight, CalendarDays, Clock, CreditCard } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { VacancyTypes } from '@/interfaces'
import useTranslate from '@/hooks/use-translate'
function Page() {
	const [vacancy, setVacancy] = useState<VacancyTypes[]>([])
	const { lng } = useParams()
	const t = useTranslate()
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get('/api/vacancies', {
					headers: {
						'Accept-Language': lng,
					},
				})
				setVacancy(res.data.data)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [lng])
	const days = [
		t('days.mon'),
		t('days.tue'),
		t('days.wed'),
		t('days.thu'),
		t('days.fri'),
		t('days.sat'),
		t('days.sun'),
	]
	return (
		<div className=' min-h-screen px-6 mb-10 text-white'>
			<div className='relative flex items-center justify-center h-40 sm:h-52 md:h-64 lg:h-72 overflow-hidden mt-16'>
				{/* Fon yozuvi */}
				<h1 className='absolute text-[40px] sm:text-[80px] md:text-[140px] lg:text-[180px] font-extrabold text-gray-700/10 select-none'>
					 {t('navitem.career')}
				</h1>

				{/* Asosiy title */}
				<motion.h1
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='relative text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold 
					bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 
					bg-clip-text text-transparent animate-gradient z-10 text-center px-2'
				>
          {t('navitem.career')}
				</motion.h1>

				{/* Yulduzcha animatsiya */}
				<div className='absolute inset-0 z-[11] pointer-events-none'>
					<StarShower height={300} count={120} size={1.5} width={2000} />
				</div>
			</div>
			<div className='container max-w-8xl mx-auto px-4 mt-10'>
				<div className='grid md:grid-cols-2 gap-6 w-full max-w-6xl'>
					{vacancy.map((job, idx) => (
						<div
							key={idx}
							className='bg-gray-800 rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition'
						>
							{/* Title */}
							<h1 className=' text-2xl md:text-3xl uppercase font-semibold text-white mb-4'>
								{job.title}
							</h1>
<hr /> <br />
							{/* Info */}
							<div className='space-y-2 text-gray-400 text-sm w-96'>
							<div className='flex items-center justify-between'>
                	<div className='flex items-center gap-2'>
									<CalendarDays className='w-4 h-4' />
									<span>
										{' '}
										{(() => {
											if (
												typeof job.workingDays === 'string' &&
												job.workingDays.includes('-')
											) {
												const [start, end] = job.workingDays
													.split('-')
													.map(Number)
												return `${days[start - 1]} - ${days[end - 1]}`
											}
											return days[Number(job.workingDays) - 1]
										})()}
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<Clock className='w-4 h-4' />
									<span>{job.workingTimes}</span>
								</div>
              </div>
							</div>

							{/* Salary */}
							<div className='mt-6 flex items-center justify-between bg-gray-900 rounded-lg p-3'>
								<div className='flex items-center gap-2 text-green-400 font-semibold'>
									<CreditCard className='w-5 h-5' />
									<span>{Number(job.pricing).toLocaleString()}</span>

								</div>
								<Link
									href={`/${lng}/career/${job._id}`}
									className='bg-teal-500 hover:bg-teal-600 p-2 rounded-full'
								>
									<ArrowRight className='w-5 h-5 text-white' />
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Page
