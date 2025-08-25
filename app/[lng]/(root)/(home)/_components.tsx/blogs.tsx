'use client'

import { Blogs } from '@/constants'
import { API_SERVICE } from '@/services/api-service'
import axios from 'axios'
import { CalendarCheck, MessageCircleMore } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BlogSection() {
	const [blogs, setBlogs] = useState<Blogs[]>([])
	const {lng}=useParams()
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(API_SERVICE.blog)
				setBlogs(res.data.results)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [])

	if (blogs.length === 0) {
		return (
			<div className='py-24 text-center text-white'>
				<p>Yuklanmoqda...</p>
			</div>
		)
	}

	const latestBlog = blogs[0]
	const otherBlogs = blogs.slice(1)

	return (
		<div
			id='blog'
			className='py-24 bg-gradient-to-b from-[#0B192C] to-[#0B192C]/90 text-white'
		>
			<div className='container mx-auto px-6 lg:px-12'>
				<div className='grid grid-cols-1 xl:grid-cols-2 gap-12'>
					{/* Left – eng so‘nggi blog */}
					<div className='animate-fadeInLeft'>
						<div className='mb-6'>
							<span className='text-blue-400 font-medium text-sm uppercase tracking-wide'>
								Bizning bloglar
							</span>
							<h2 className='text-3xl md:text-4xl font-bold leading-snug mt-3'>
								So‘nggi{' '}
								<span className='text-blue-400'>bloglarimizni o‘qing</span>
							</h2>
						</div>
						<p className='text-gray-300 mb-6'>
							Bizning bloglarimiz orqali mutaxassis fikrlari, foydali
							maslahatlar hamda sohadagi so‘nggi trendlar bilan tanishing.
						</p>
						<Link
							href={`/${lng}/blog`}
							className='inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full font-medium transition'
						>
							Barcha bloglarni ko‘rish →
						</Link>

						<div className='mt-12'>
							<div className='bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition'>
								<div className='relative'>
									<Link href={`/${lng}/blog/${latestBlog.slug}`}>
									<Image
										src={latestBlog.face_image}
										alt={latestBlog.title}
										width={600}
										height={350}
										className='rounded-xl object-cover'
									/>
									</Link>
								</div>
								<div className='mt-4'>
									<div className='flex items-center gap-2 text-xs text-gray-300 mb-2'>
										<div className='flex items-center gap-1 ml-4'>
											<CalendarCheck className='w-4 h-4' />
											<span>{latestBlog.date}</span>
										</div>
										<div className='flex items-center gap-1 ml-4'>
											<MessageCircleMore className='w-4 h-4' />
											<span>{latestBlog.views_count} ta ko‘rish</span>
										</div>
									</div>
									<h3 className='text-xl font-semibold mt-3 hover:text-blue-400 transition'>
										<Link href={`/blog/${latestBlog.slug}`}>
											{latestBlog.title}
										</Link>
									</h3>
									<Link href={`/blog/${latestBlog.slug}`}>
									<div
										className='text-gray-400 mt-2 line-clamp-3 hover:text-blue-400 transition leading-5'
										dangerouslySetInnerHTML={{
											__html: latestBlog.description.replace(/<img[^>]*>/g, ''),
										}}
									/>
									</Link>

									<Link
										href={`/blog/${latestBlog.slug}`}
										className='inline-block mt-10 text-blue-400 hover:underline'
									>
										Batafsil o‘qish →
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-7 animate-fadeInRight'>
						{otherBlogs.slice(0, 3).map(blog => (
						
							<div
								key={blog.id}
								className='flex bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition'
							>
								<Link href={blog.slug}>
								<Image
									src={blog.face_image}
									alt={blog.title}
									width={205}
									height={160}
									className='rounded-xl object-cover w-[250px] h-[135px]'
								/>
								</Link>
								<div className='ml-8 flex flex-col '>
									<div>
										<div className='flex items-center gap-10 text-xs text-gray-300 mb-2'>
											<div className='flex items-center gap-1'>
												<CalendarCheck className='w-4 h-4' />
												<span>{blog.date}</span>
											</div>
											<div className='flex items-center gap-1 ml-4'>
												<MessageCircleMore className='w-4 h-4' />
												<span>{blog.views_count} ta ko‘rish</span>
											</div>
										</div>
										<h3 className='text-lg font-semibold hover:text-blue-400 transition'>
											<Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
										</h3>
									</div>
									<Link
										href={`/blog/${blog.slug}`}
										className='text-blue-400 hover:underline text-sm mt-2'
									>
										Batafsil o‘qish →
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
