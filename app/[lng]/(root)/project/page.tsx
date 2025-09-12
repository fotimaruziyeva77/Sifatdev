'use client'
import axios from 'axios'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import StarShower from '../_components/star-shower'
import useTranslate from '@/hooks/use-translate'
import { LucideLayoutGrid, ExternalLink } from 'lucide-react'
import { ProjectTypes } from '@/interfaces'
import Link from 'next/link'

export default function Portfolio() {
	const [active, setActive] = useState('ALL')
	const [portfolio, setPortfolio] = useState<ProjectTypes[]>([])
	const [filteredPortfolio, setFilteredPortfolio] = useState<ProjectTypes[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const { lng } = useParams()
	const t = useTranslate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const res = await axios.get('/api/projects', {
					headers: {
						'Accept-Language': lng,
					},
				})
				setPortfolio(res.data.data)
				setFilteredPortfolio(res.data.data)
			} catch (err) {
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [lng])

	useEffect(() => {
		let result = portfolio

		// Filter by category
		if (active !== 'ALL') {
			result = result.filter(p => p.category.title.toUpperCase() === active)
		}

		// Filter by search query

		setFilteredPortfolio(result)
	}, [active, portfolio])

	return (
		<div className='bg-gray-900 min-h-screen py-12 text-white px-4 sm:px-6 lg:px-12 mb-10'>
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

				{/* SEARCH AND FILTER CONTAINER */}
				<div className='border border-gray-700 rounded-xl p-4 sm:p-6 mb-10'>
					<div className='flex flex-col lg:flex-row gap-4 justify-between items-center'>
						{/* CATEGORY FILTERS */}
						{/* CATEGORY FILTERS */}
						<div className='flex flex-wrap justify-center lg:justify-end gap-2'>
							<button
								onClick={() => setActive('ALL')}
								className={`px-4 py-2 flex items-center gap-2 border rounded-lg text-sm font-medium transition-all uppercase 
      ${
				active === 'ALL'
					? 'border-[#00ffc3] bg-teal-500/10 text-white'
					: 'border-gray-600 hover:bg-teal-500/20 text-gray-400'
			}`}
							>
								<LucideLayoutGrid className='w-4 h-4' />
								{t('portfolio.all') || 'ALL'}
							</button>

							{Array.from(
								new Map(
									portfolio.map(p => [p.category.title, p.category])
								).values()
							).map(cat => (
								<button
									key={cat._id}
									onClick={() => setActive(cat.title.toUpperCase())}
									className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all uppercase 
        ${
					active === cat.title.toUpperCase()
						? 'border-[#00ffc3] bg-teal-500/10 text-white'
						: 'border-gray-600 hover:bg-teal-500/20 text-gray-400'
				}`}
								>
									{cat.title.toUpperCase()}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* LOADING STATE */}
				{isLoading && (
					<div className='flex justify-center items-center h-64'>
						<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500'></div>
					</div>
				)}

				{/* EMPTY STATE */}

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{filteredPortfolio.map(item => (
						<motion.div
							key={item._id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className='relative rounded-xl overflow-hidden bg-[#1a1a1a] shadow-lg group transition-all hover:shadow-2xl hover:-translate-y-1'
						>
							<Link href={`/${lng}/project/${item.slug}`}>
								<div className='relative h-64 overflow-hidden'>
									<Image
										src={item.image}
										alt={item.title}
										fill
										className='object-cover group-hover:scale-110 transition-transform duration-500'
									/>

									{/* Hover overlay with buttons */}
									<div className='absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4'>
										<button className='p-3 bg-teal-500 rounded-full hover:bg-teal-600 transition-colors'>
											<ExternalLink className='w-5 h-5' />
										</button>
									</div>

									{/* Category badge */}
									<span className='absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-teal-500/90 text-white rounded-full uppercase'>
										{item.category.title}
									</span>
								</div>
							</Link>

							<div className='p-5'>
								<div className='flex justify-between'>
									<Link href={`/${lng}/project/${item.slug}`}>
										<h3 className='text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors'>
											{item.title}
										</h3>
									</Link>
									<div className='flex flex-wrap gap-2 mb-4'>
										{item.technologies.slice(0, 3).map(tech => (
											<span
												key={tech._id}
												className='px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md'
											>
												{tech.name}
											</span>
										))}
										{item.technologies.length > 3 && (
											<span className='px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md'>
												+{item.technologies.length - 3}
											</span>
										)}
									</div>
								</div>
								<p className='text-gray-400 text-sm mb-4 line-clamp-2'>
									{item.description}
								</p>

								{/* Technologies */}

								<Link
									href={`/${lng}/project/${item.slug}`}
									className='flex items-center text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors'
								>
									{t('blog.read_more') || 'View Project'}
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	)
}
