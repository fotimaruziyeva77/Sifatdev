'use client'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Home, Blocks } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Project } from '@/constants'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { API_SERVICE } from '@/services/api-service'

function Page() {
	const [portfolio, setPortfolio] = useState<Project[]>([])
	const {lng}=useParams()
	const params = useParams()

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.normalize('NFKD')
			.replace(/[‘’ʻ`]/g, "'")
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9'-]+/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-+|-+$/g, '')
	}

	const slug = slugify(decodeURIComponent(params.slug as string))

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`${API_SERVICE.project}${slug}/`)
				console.log(res.data)
				if (Array.isArray(res.data.results)) {
					setPortfolio(res.data.results)
				} else if (res.data) {
					setPortfolio([res.data])
				} else {
					setPortfolio([])
				}
			} catch (err) {
				console.error(err)
				setPortfolio([])
			}
		}
		fetchData()
	}, [slug])
	return (
		<div>
			<div className='min-h-screen bg-gray-900 text-white flex items-center justify-center p-10 mt-10'>
				<div className='max-w-4xl w-full '>
					<div className='space-y-6'>
						<Breadcrumb>
							<BreadcrumbList className='flex items-center gap-2 bg-gray-800/70 px-4 py-4 rounded-xl '>
								<BreadcrumbItem>
									<BreadcrumbLink
										href='/'
										className='flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-400  transition'
									>
										<Home className='w-5 h-5' />
										Home
									</BreadcrumbLink>
								</BreadcrumbItem>

								<BreadcrumbSeparator className='text-gray-400' />
								<BreadcrumbItem>
									<BreadcrumbLink
										href={`/${lng}/project`}
										className='flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-400  transition'
									>
										<Blocks className='w-5 h-5' />
										Project
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className='text-gray-400' />
								<BreadcrumbItem>
									<BreadcrumbPage className='text-white font-semibold'>
										{portfolio[0]?.title || 'Blog'}
									</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					{portfolio.length === 0 ? (
						<p className='text-center text-gray-400'>Error</p>
					) : (
						portfolio.map((item, idx) => (
							<div
								key={idx}
								className='bg-gray-800 rounded-2xl shadow-lg overflow-hidden'
							>
								<div className='relative'>
									<Image
										src={item.face_image || '/fallback.jpg'}
										alt={item.title || 'Article'}
										width={800}
										height={400}
										className='w-full h-72 object-cover'
										priority
									/>
									<div className='absolute bottom-4 left-4'>
										<span className='bg-gray-900 text-sm px-3 py-1 rounded uppercase'>
											{item.category.title}
										</span>
									</div>
								</div>

								<div className='p-6 space-y-4'>
									<div className='flex justify-between'>
										<h1 className='text-2xl font-bold'>{item.title}</h1>
										<p className='flex flex-wrap gap-2'>
											{item.technologies.map(i => (
												<span
													key={i.id}
													className='px-2 py-1 text-sm rounded-full bg-gray-200 text-gray-700'
												>
													{i.name}
												</span>
											))}
										</p>
									</div>

									<div
										className='space-y-3 text-gray-300'
										dangerouslySetInnerHTML={{ __html: item.description }}
									/>

								
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}

export default Page
