'use client'
import { Category, Project } from '@/constants'
import { API_SERVICE } from '@/services/api-service'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Portfolio() {
	const [active, setActive] = useState('ALL')
	const [portfolio, setPortfolio] = useState<Project[]>([])
	const [category, setCategory] = useState<Category[]>([])
	const { lng } = useParams()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(API_SERVICE.project)
				setPortfolio(res.data.results)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const res = await axios.get(API_SERVICE.projectcategory)
				setCategory(res.data.results)
			} catch (err) {
				console.error(err)
			}
		}
		fetchCategory()
	}, [])

	const filtered =
		active === 'ALL'
			? portfolio
			: portfolio.filter(p => p.category.title.toUpperCase() === active)

	return (
		<div className='bg-gray-900 min-h-screen py-12 text-white mt-20 px-4 sm:px-6 lg:px-12 mb-10'>
			<div className='container mx-auto'>
				<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center lg:text-left'>
					PORTFOLIO
				</h1>

				{/* Category buttons */}
				<div className='flex flex-wrap justify-center lg:justify-start gap-3 mb-10'>
					<button
						onClick={() => setActive('ALL')}
						className={`px-4 sm:px-5 py-2 active:border border-[#00ffc3] rounded-lg text-sm sm:text-base font-medium transition-all uppercase 
              ${
								active === 'ALL'
									? 'border-[#00ffc3] text-white'
									: 'hover:bg-teal-500/20 text-gray-400 '
							}`}
					>
						Hammasi
					</button>

					{category.map(cat => (
						<button
							key={cat.id}
							onClick={() => setActive(cat.title.toUpperCase())}
							className={`px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base font-medium transition-all uppercase 
              ${
								active === cat.title.toUpperCase()
									? 'border border-[#00ffc3] text-white'
									: 'hover:bg-teal-500/20 text-gray-400 '
							}`}
						>
							{cat.title.toUpperCase()}
						</button>
					))}
				</div>

				{/* Portfolio grid */}
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
									className='w-full h-60 sm:h-72 md:h-80 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300'
								/>
								<div className='absolute inset-0 bg-black/40 flex flex-col justify-end p-4'>
									<h2 className='text-base sm:text-lg md:text-xl font-bold'>
										{item.title}
									</h2>
									<p className='text-xs sm:text-sm text-gray-300'>
										{item.category.title.toUpperCase()}
									</p>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
