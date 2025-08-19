'use client'

import {
	CalendarCheck,
	MessageCircleMore,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const blogsLeft = [
	{
		id: 1,
		img: '/blog/blog-2-1.jpg',
		date: '2025-yil 5-aprel',
		comments: 80,
		tags: ['Raqamli', 'Texnologiya'],
		title: 'Kelajak hozir: 2025-yilgi raqamli transformatsiya qo‘llanmasi',
		desc: 'Raqamli poygada g‘olib bo‘lish: 2025-yil transformatsiya yo‘l xaritasi. Keyingi avlod raqamli o‘zgarishlari',
		link: '/blog-details',
	},
]

const blogsRight = [
	{
		id: 2,
		img: '/blog/blog-2-2.jpg',
		date: '2025-yil 13-yanvar',
		comments: 12,
		tags: ['Raqamli', 'Texnologiya'],
		title: 'Texnologiya kelajagini shakllantirayotgan 5 asosiy trend',
		link: '/blog-details',
	},
	{
		id: 3,
		img: '/blog/blog-2-3.jpg',
		date: '2025-yil 13-yanvar',
		comments: 12,
		tags: ['Raqamli', 'Texnologiya'],
		title: 'Smart biznes bilan samaradorlikni oshirish yo‘llari',
		link: '/blog-details',
	},
	{
		id: 4,
		img: '/blog/blog-2-3.jpg',
		date: '2025-yil 13-yanvar',
		comments: 12,
		tags: ['Raqamli', 'Texnologiya'],
		title: '2025-yilda raqamli transformatsiya bo‘yicha mukammal qo‘llanma',
		link: '/blog-details',
	},
]

export default function BlogSection() {
	return (
		<div
			id='blog'
			className='py-24 bg-gradient-to-b from-[#0B192C] to-[#0B192C]/90 text-white'
		>
			<div className='container mx-auto px-6 lg:px-12'>
				<div className='grid grid-cols-1 xl:grid-cols-2 gap-12'>
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
							href='/blogs'
							className='inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full font-medium transition'
						>
							Barcha bloglarni ko‘rish →
						</Link>

						<div className='mt-12'>
							{blogsLeft.map(blog => (
								<div
									key={blog.id}
									className='bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition'
								>
									<div className='relative'>
										<Image
											src={blog.img}
											alt={blog.title}
											width={600}
											height={350}
											className='rounded-xl'
										/>
										<div className='absolute bottom-4 left-4 flex gap-2'>
											{blog.tags.map((tag, i) => (
												<span
													key={i}
													className='bg-blue-400 text-black text-xs px-3 py-1 rounded-full'
												>
													{tag}
												</span>
											))}
										</div>
									</div>
									<div className='mt-4'>
										<div className='flex items-center gap-2 text-xs text-gray-300 mb-2'>
											<div className='flex items-center gap-1 ml-4'>
												<CalendarCheck className='w-4 h-4' />
												<span>{blog.date}</span>
											</div>
											<div className='flex items-center gap-1 ml-4'>
												<MessageCircleMore className='w-4 h-4' />
												<span>{blog.comments} ta izoh</span>
											</div>
										</div>
										<h3 className='text-xl font-semibold mt-3 hover:text-blue-400 transition'>
											<Link href={blog.link}>{blog.title}</Link>
										</h3>
										<p className='text-gray-400 mt-2'>{blog.desc}</p>
										<Link
											href={blog.link}
											className='inline-block mt-4 text-blue-400 hover:underline'
										>
											Batafsil o‘qish →
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className='flex flex-col gap-8 animate-fadeInRight'>
						{blogsRight.map(blog => (
							<div
								key={blog.id}
								className='flex bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition'
							>
								<Image
									src={blog.img}
									alt={blog.title}
									width={205}
									height={160}
									className='rounded-xl'
								/>
								<div className='ml-6 flex flex-col justify-between'>
									<div>
										<div className='flex items-center gap-2 text-xs text-gray-300 mb-2'>
											<div className='flex items-center gap-1'>
												<CalendarCheck className='w-4 h-4' />
												<span>{blog.date}</span>
											</div>
											<div className='flex items-center gap-1 ml-4'>
												<MessageCircleMore className='w-4 h-4' />
												<span>{blog.comments} ta izoh</span>
											</div>
										</div>
										<div className='flex gap-2 mb-2'>
											{blog.tags.map((tag, i) => (
												<span
													key={i}
													className='bg-gradient-to-r from-blue-400 to-cyan-400 text-black text-xs px-2 py-1 rounded-full'
												>
													{tag}
												</span>
											))}
										</div>
										<h3 className='text-lg font-semibold hover:text-blue-400 transition'>
											<Link href={blog.link}>{blog.title}</Link>
										</h3>
									</div>
									<Link
										href={blog.link}
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
