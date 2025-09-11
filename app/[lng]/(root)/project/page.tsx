'use client'
import axios from 'axios'
import { motion } from 'motion/react'
import Image from 'next/image'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import StarShower from '../_components/star-shower'
import useTranslate from '@/hooks/use-translate'
import { LucideLayoutGrid } from 'lucide-react'
import { ProjectTypes } from '@/interfaces'

export default function Portfolio() {
	const [active, setActive] = useState('ALL')
	const [portfolio, setPortfolio] = useState<ProjectTypes[]>([])
	const { lng } = useParams()
	const t = useTranslate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get('/api/projects', {
					headers: {
						'Accept-Language': lng,
					},
				})
				setPortfolio(res.data.data)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [lng])


	const filtered =
		active === 'ALL'
			? portfolio
			: portfolio.filter(p => p.category.title.toUpperCase() === active)

	return (
		<div className='bg-gray-900 min-h-screen py-12 text-white  px-4 sm:px-6 lg:px-12 mb-10'>
			<div className='container mx-auto'>
				{/* HEADER */}
				<div className='relative flex items-center justify-center h-40 sm:h-52 md:h-64 lg:h-72 overflow-hidden mt-10 sm:mt-20'>
					<h1 className='absolute text-[40px] sm:text-[80px] md:text-[120px] lg:text-[180px] font-extrabold text-gray-700/10 select-none'>
						{t('navitem.portfolio')}
					</h1>

					<motion.h1
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold 
							bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 
							bg-clip-text text-transparent animate-gradient z-10 text-center px-2'
					>
						{t('navitem.portfolio')}
					</motion.h1>

					<div className='absolute inset-0 z-[11] pointer-events-none'>
						<StarShower height={300} count={120} size={1.5} width={2000} />
					</div>
				</div>

				{/* CATEGORY container */}
				<div className='border border-gray-700 rounded-xl p-2 sm:p-6 mb-10 '>
					<div className='flex flex-wrap justify-center lg:justify-start gap-3'>
						<button
							onClick={() => setActive('ALL')}
							className={`px-4 sm:px-5 py-2 border rounded-lg text-sm sm:text-base font-medium transition-all uppercase 
							${
								active === 'ALL'
									? 'border-[#00ffc3] text-white'
									: 'border-gray-600 hover:bg-teal-500/20 text-gray-400 '
							}`}
						>
							<LucideLayoutGrid className='w-[30px] h-[30px]' />
						</button>

						{portfolio.map(p => p.category).map(cat => (
							<button
								key={cat._id}
								onClick={() => setActive(cat.title.toUpperCase())}
								className={`px-4 sm:px-5 py-2 border rounded-lg text-sm sm:text-base font-medium transition-all uppercase 
								${
									active === cat.title.toUpperCase()
										? 'border-[#00ffc3] text-white'
										: 'border-gray-600 hover:bg-teal-500/20 text-gray-400 '
								}`}
							>
								{cat.title.toUpperCase()}
							</button>
						))}
					</div>
				</div>

				{/* PORTFOLIO GRID */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{filtered.map((item) => (
					<div
					key={item._id}
	className="relative rounded-xl overflow-hidden bg-[#1f1f1f] shadow-lg group transition-all hover:shadow-2xl"
>
	<Image
		src={item.image}
		alt={item.title}
		width={400}
		height={300}
		className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
	/>
	{/* Overlay */}
	<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
	
	{/* Text content */}
	<div className="absolute bottom-4 left-4 right-4 flex flex-row justify-between">
		<h2 className="text-lg sm:text-xl font-bold text-white">{item.title}</h2>
		<span className="mt-2 inline-block px-3 py-1 text-xs font-medium bg-teal-500/80 text-white rounded-full w-fit uppercase text-center pt-2">
			{item.category.title}
		</span>
	</div>
</div>

					))}
				</div>
			</div>
		</div>
	)
}
