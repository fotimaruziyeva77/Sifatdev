'use client'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Blogs } from '@/constants'
import { API_SERVICE } from '@/services/api-service'
import axios from 'axios'
import {
	Blocks,
	Calendar,
	Eye,
	Facebook,
	Home,
	Linkedin,
	Twitter,
} from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Page() {
	const [blogs, setBlogs] = useState<Blogs[]>([])
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
				const res = await axios.get(`${API_SERVICE.blog}${slug}/`)
				console.log(res.data)
				if (Array.isArray(res.data.results)) {
					setBlogs(res.data.results)
				} else if (res.data) {
					setBlogs([res.data])
				} else {
					setBlogs([])
				}
			} catch (err) {
				console.error(err)
				setBlogs([])
			}
		}
		fetchData()
	}, [slug])
	function formatDate(dateStr: string): string {
		const date = new Date(dateStr)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	return (
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
									href='/blog'
									className='flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-400  transition'
								>
									<Blocks className='w-5 h-5' />
									Blog
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className='text-gray-400' />
							<BreadcrumbItem>
								<BreadcrumbPage className='text-white font-semibold'>
									{blogs[0]?.title || 'Blog'}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				{blogs.length === 0 ? (
					<p className='text-center text-gray-400'>Error</p>
				) : (
					blogs.map((item, idx) => (
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
									<span className='bg-gray-900 text-sm px-3 py-1 rounded'>
										{item.category.title}
									</span>
								</div>
							</div>

							<div className='p-6 space-y-4'>
								<h1 className='text-2xl font-bold'>{item.title}</h1>
								<div className='flex items-center gap-6 text-gray-400 text-sm'>
									<div className='flex items-center gap-2'>
										<Calendar size={16} />{' '}
										{item.date ? formatDate(item.date) : '---'}
									</div>

									<div className='flex items-center gap-2'>
										<Eye size={16} /> {item.views_count || 0}
									</div>
								</div>

								<div
									className='space-y-3 text-gray-300'
									dangerouslySetInnerHTML={{ __html: item.description }}
								/>

								{/* Footer */}
								<div className='pt-4 border-t border-gray-700 flex flex-col gap-3'>
									<p className='text-sm text-gray-400'>
										{' '}
										<span className='font-semibold text-white'>
											<span className='text-blue-400'>SifatDev</span>
										</span>{' '}
										– o‘z qadriyatlari va g‘oyalariga ega jamoa
									</p>

									{/* Social Icons */}
									<div className='flex gap-4 text-gray-400'>
										<a href='#' className='hover:text-white'>
											<Facebook size={20} />
										</a>
										<a href='#' className='hover:text-white'>
											<Twitter size={20} />
										</a>
										<a href='#' className='hover:text-white'>
											<Linkedin size={20} />
										</a>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default Page
