'use client'
import BookCard from '@/components/cards/blogs-card'
import { Blogs, Category } from '@/constants'
import { API_SERVICE } from '@/services/api-service'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StarShower from '../_components/star-shower'

import { Button } from '@/components/ui/button'
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
} from '@radix-ui/react-navigation-menu'
import { LucideLayoutGrid } from 'lucide-react'
import { motion } from 'motion/react'

function Blog() {
	const [blogs, setBlogs] = useState<Blogs[]>([])
	const [active, setActive] = useState<string>('All') // 👈 default All
	const [category, setCategory] = useState<Category[]>([])

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

	useEffect(() => {
		const categoryData = async () => {
			try {
				const res = await axios.get(API_SERVICE.category)
				const categories = res.data.results || res.data || []
				setCategory(categories)
			} catch (error) {
				console.log(error)
			}
		}
		categoryData()
	}, [])
	const filteredBlogs =
		active === 'All'
			? blogs
			: blogs.filter(item =>
					Array.isArray(item.category)
						? item.category.some(cat => cat.title === active)
						: item.category?.title === active
			  )

	return (
		<div className='mt-20 min-h-screen px-6 mb-10 '>
			<div className='relative flex items-center justify-center h-60 overflow-hidden'>
				<h1 className='absolute text-[210px] font-extrabold text-gray-700/20 select-none pt-20'>
					BLOG
				</h1>

				<h1 className='relative text-4xl font-extrabold text-white z-10'>
					BLOG
				</h1>

				<div className='absolute inset-0 z-[11] pointer-events-none'>
					<StarShower height={300} count={100} size={1.5} width={2000} />
				</div>
			</div>

			<div className='container mx-auto px-6 lg:px-12'>
				<div>
					<div className='bg-gradient-to-r from-slate-800/60 to-slate-900/60 border border-white/10  text-white p-4 flex items-center gap-4 rounded-2xl shadow-lg'>
						<Button
							variant='ghost'
							onClick={() => setActive('All')}
							className={`rounded-xl px-4 py-4 hover:bg-teal-500/20 transition ${
								active === 'All'
									? 'text-teal-300'
									: 'text-gray-400 hover:text-white'
							}`}
						>
							<LucideLayoutGrid className='w-[70px] h-[70px]' />
						</Button>

						<NavigationMenu className='pt-4'>
							<NavigationMenuList className='flex flex-row gap-3'>
								{category.map(item => (
									<NavigationMenuItem key={item.id}>
										<Button
											variant='ghost'
											className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all ${
												active === item.title
													? 'text-teal-300'
													: 'text-gray-400 hover:text-white'
											}`}
											onClick={() => setActive(item.title)}
										>
											{active === item.title && (
												<motion.div
													layoutId='active-pill'
													className='absolute inset-0 rounded-xl bg-teal-500/20 border border-teal-400/40'
													transition={{
														type: 'spring',
														stiffness: 300,
														damping: 25,
													}}
												/>
											)}
											<span className='relative z-10'>{item.title}</span>
										</Button>
									</NavigationMenuItem>
								))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
					{filteredBlogs.length > 0 ? (
						filteredBlogs.map(item => (
							<BookCard
								key={item.id}
								id={item.id}
								link={`/blog/${item.slug}`}
								face_image={item.face_image}
								title={item.title}
								category={item.category}
								date={item.date}
								slug={`/blog/${item.slug}`}
								description={item.description}
								views_count={item.views_count}
								type='card'
							/>
						))
					) : (
						<p className='text-gray-400 col-span-full text-center'>
							Bu category bo‘yicha bloglar topilmadi
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Blog
