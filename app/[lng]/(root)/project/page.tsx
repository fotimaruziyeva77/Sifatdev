'use client'
import { Category, Project } from '@/constants'
import { API_SERVICE } from '@/services/api-service'
import axios from 'axios'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import StarShower from '../_components/star-shower'
import useTranslate from '@/hooks/use-translate'
import { LucideLayoutGrid } from 'lucide-react'

export default function Portfolio() {
	const [active, setActive] = useState('ALL')
	const [portfolio, setPortfolio] = useState<Project[]>([])
	const [category, setCategory] = useState<Category[]>([])
	const { lng } = useParams()
	const t = useTranslate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(API_SERVICE.project,{
						headers: {
						'Accept-Language': lng,
					},
				})
				setPortfolio(res.data.results)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [lng])

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const res = await axios.get(API_SERVICE.projectcategory, {
					headers: {
						'Accept-Language': lng,
					},
				})
				setCategory(res.data.results)
			} catch (err) {
				console.error(err)
			}
		}
		fetchCategory()
	}, [lng])

	const filtered =
		active === 'ALL'
			? portfolio
			: portfolio.filter(p => p.category.title.toUpperCase() === active)

	return (
		<div className='bg-gray-900 min-h-screen py-12 text-white mt-20 px-4 sm:px-6 lg:px-12 mb-10'>
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

						{category.map(cat => (
							<button
								key={cat.id}
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
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filtered.map((item, idx) => (
						<div
							key={item.id}
							className={`relative rounded-xl overflow-hidden bg-[#2a2a2a] shadow-lg cursor-pointer group 
                ${idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
						>
							<Link href={`/${lng}/project/${item.slug}`}>
								<Image
									src={item.face_image}
									alt={item.title}
									width={600}
									height={400}
									className='w-full h-56 sm:h-72 md:h-80 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300'
								/>
								<div className='absolute inset-0 bg-black/40 flex flex-col justify-end p-4'>
									<h2 className='text-base sm:text-lg md:text-xl font-bold'>
										{item.title}
									</h2>
									<p className='text-xs sm:text-sm text-gray-300'>
										{item.category.title.toUpperCase()}
									</p>
									<div
									className='text-gray-400 mt-2 line-clamp-2'
									dangerouslySetInnerHTML={{
										__html: item.description.replace(/<img[^>]*>/g, ''),
									}}
								/>
									<Link
								href={`${lng}/${item.slug}`}
								className='text-blue-400 hover:underline text-sm mt-2'
							>
								{t('blog.read_more')}
							</Link>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
