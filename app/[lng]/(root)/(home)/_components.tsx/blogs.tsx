'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { CalendarCheck, Eye, MessageCircleMore } from 'lucide-react'
import useTranslate from '@/hooks/use-translate'
import { BlogTypes } from '@/interfaces'

export default function BlogSection() {
	const [blogs, setBlogs] = useState<BlogTypes[]>([])
	const { lng } = useParams()
	const t = useTranslate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get('/api/blogs', {
					headers: { 'Accept-Language': lng },
				})
				setBlogs(res.data.data)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [lng])

	if (!blogs.length) return null

	const latestBlog = blogs[0]
	const otherBlogs = blogs.slice(1, 4) // faqat keyingi 3 blog

	return (
		<div
			id='blog'
			className='py-24 bg-gradient-to-b from-[#0B192C] to-[#0B192C]/90 text-white'
		>
			<div className='container mx-auto px-6 lg:px-12'>
				<div className='grid grid-cols-1 xl:grid-cols-2 gap-12'>
					
					<div className='animate-fadeInLeft'>
				<div className='flex items-center gap-2 mb-8'>
						<span className='h-[2px] w-6 bg-blue-400'></span>
						<span
							className='from-blue-400 via-cyan-200 to-blue-400 
						bg-clip-text  text-white animate-gradient z-10 uppercase tracking-wide text-sm'
						>
							{t('blog.section_title')}
						</span>
						<span className='h-[2px] w-6 bg-blue-400'></span>
					</div>
						<p className='text-gray-300 mb-6'>
							{t('blog.section_description')}
						</p>
						<Link
							href={`/${lng}/blog`}
							className='inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full font-medium transition'
						>
							{t('blog.view_all')}
						</Link>

						<div className='mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition'>
							<Link
								href={`/${lng}/blog/${latestBlog.slug}`}
								className='relative block'
							>
								<Image
									src={latestBlog.image}
									alt={latestBlog.title}
									width={800}
									height={350}
									className='rounded-xl object-cover'
								/>
							</Link>
							<div className='mt-6 flex justify-between'>
								<Link href={`/${lng}/blog/${latestBlog.slug}`}>
									<h3 className='text-xl font-semibold mt-3 hover:text-blue-400 transition'>
										{latestBlog.title}
									</h3>
								</Link>
								<div className='flex items-center gap-4 text-xs text-gray-300 mt-2 mb-4'>
									<div className='flex items-center gap-1'>
										<CalendarCheck className='w-4 h-4' />
										<span>
											{latestBlog.createdAt
												.slice(0, 10)
												.split('-')
												.reverse()
												.join('.')}
										</span>
									</div>
									<div className='flex items-center gap-1'>
										<Eye className='w-4 h-4' />
										<span>
											{latestBlog.viewCount} {t('blog.views_count')}
										</span>
									</div>
								</div>
							</div>

							<p
								className='text-gray-400 mt-2 line-clamp-3 hover:text-blue-400 transition leading-5'
								dangerouslySetInnerHTML={{
									__html: latestBlog.description.replace(/<img[^>]*>/g, ''),
								}}
							/>
							<Link
								href={`/${lng}/blog/${latestBlog.slug}`}
								className='inline-block mt-4 text-blue-400 hover:underline'
							>
								{t('blog.read_more')}
							</Link>
						</div>
					</div>

					{/* Right – boshqa bloglar */}
					<div className='flex flex-col gap-7 animate-fadeInRight'>
						{otherBlogs.map(blog => (
							<div
								key={blog._id}
								className='flex bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition'
							>
								<Link
									href={`/${lng}/blog/${blog.slug}`}
									className='block flex-shrink-0'
								>
									<Image
										src={blog.image}
										alt={blog.title}
										width={250}
										height={135}
										className='rounded-xl object-cover w-[250px] h-[135px]'
									/>
								</Link>
								<div className='ml-6 flex flex-col justify-between'>
									<div>
										<div className='flex items-center gap-4 text-xs text-gray-300 mb-1'>
											<div className='flex items-center gap-1'>
												<CalendarCheck className='w-4 h-4' />
												<span>
													{blog.createdAt
														.slice(0, 10)
														.split('-')
														.reverse()
														.join('.')}
												</span>
											</div>
											<div className='flex items-center gap-1'>
												<MessageCircleMore className='w-4 h-4' />
												<span>
													{blog.viewCount} {t('blog.views_count')}
												</span>
											</div>
										</div>
										<h3 className='text-lg font-semibold hover:text-blue-400 transition'>
											<Link href={`/${lng}/blog/${blog.slug}`}>
												{blog.title}
											</Link>
										</h3>
									</div>
									<Link
										href={`/${lng}/blog/${blog.slug}`}
										className='text-blue-400 hover:underline text-sm mt-2'
									>
										{t('blog.read_more')}
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
