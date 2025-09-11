'use client'
import BookCard from '@/components/cards/blogs-card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StarShower from '../_components/star-shower'
import { useParams } from 'next/navigation'
import useTranslate from '@/hooks/use-translate'
import { BlogTypes } from '@/interfaces'

function Blog() {
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
				console.log(res.data)
			} catch (error) {
				console.error('Error fetching blogs:', error)
			}
		}
		fetchData()
	}, [lng])

	return (
		<div className=' min-h-screen px-6 mb-10 '>
			
			<div className='relative flex items-center justify-center h-60 overflow-hidden'>
				<h1 className='absolute text-[210px] font-extrabold text-gray-700/20 select-none pt-20'>
					{t('navitem.blog')}
				</h1>
				<h1 className='relative text-4xl font-extrabold text-white z-10'>
					{t('navitem.blog')}
				</h1>
				<div className='absolute inset-0 z-[11] pointer-events-none'>
					<StarShower height={300} count={100} size={1.5} width={2000} />
				</div>
			</div>

			{/* Blog list */}
			<div className='container mx-auto px-6 lg:px-12'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
					{blogs.length > 0 ? (
						blogs.map(item => (
							<BookCard
								key={item._id}
								slug={`/${lng}/blog/${item.slug}`}
								image={item.image}
								title={item.title}
								createdAt={item.createdAt}
								description={item.description}
								viewCount={item.viewCount}
								type='card' _id={''} tags={[]}					
							/>
						))
					) : (
						<p className='text-gray-400 col-span-full text-center'>
							{t('notfound.blog')}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Blog
