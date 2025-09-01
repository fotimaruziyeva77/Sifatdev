'use client'
import { Project } from '@/constants'
import { API_SERVICE } from '@/services/api-service'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useTranslate from '@/hooks/use-translate'
import { MoveRight } from 'lucide-react'

export default function Portfolio() {
	const [portfolio, setPortfolio] = useState<Project[]>([])
	const { lng } = useParams()
	const t = useTranslate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(API_SERVICE.project, {
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

	if (!portfolio || portfolio.length === 0) return null

	return (
		<div className='py-24 bg-gradient-to-b from-[#0B192C] to-[#0B192C]/95 text-white'>
			<div className='container mx-auto px-6 lg:px-12'>
				{/* Section header */}
				<div className='flex items-center gap-2 mb-8'>
					<span className='h-[2px] w-6 bg-blue-400'></span>
					<span
						className='from-blue-400 via-cyan-200 to-blue-400 
						bg-clip-text  text-white animate-gradient z-10 uppercase tracking-wide text-sm'
					>
						{t('portfoilo.title')}
					</span>
					<span className='h-[2px] w-6 bg-blue-400'></span>
				</div>

				{/* Portfolio grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{portfolio.map(item => (
						<div
							key={item.id}
							className='group relative rounded-2xl overflow-hidden shadow-lg bg-[#1a1a1a] transition-transform transform hover:scale-[1.02] hover:shadow-2xl'
						>
							<Link href={`/${lng}/project/${item.slug}`}>
								{/* Project image */}
								<Image
									src={item.face_image}
									alt={item.title}
									width={600}
									height={400}
									className='w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110'
								/>

								{/* Gradient overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500' />

								{/* Text content */}
								{/* Text content */}
								<div className='absolute bottom-0 p-6 w-full'>
									<div className='flex items-center justify-between'>
										<div>
											<h2 className='text-xl sm:text-2xl font-bold'>
												{item.title}
											</h2>
											<p className='text-sm text-gray-300'>
												{item.category.title.toUpperCase()}
											</p>
										</div>
										<Link
											href={`/${lng}/project/${item.slug}`}
											className='ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium shadow-md hover:from-indigo-500 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105'
										>
											<MoveRight />
										</Link>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
