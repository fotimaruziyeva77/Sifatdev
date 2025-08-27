'use client'
import { Category } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Badge } from '../ui/badge'
import useTranslate from '@/hooks/use-translate'

interface IProps {
	id: number
	category: Category
	date: string
	title: string
	slug: string
	description: string
	face_image: string
	views_count: number
	link: string
	type: 'card' | 'list' | 'small-rated'
}

function BookCard({
	face_image,
	title,
	category,
	type,
	description,
	slug,
}: IProps) {
	const [imgSrc, setImgSrc] = useState(face_image)
	const t=useTranslate()
	return (
		<>
			{type === 'card' && (
				<div className='max-w-96 md:w-96 w-full flex flex-col gap-5 bg-white/5 border border-white/10  hover:bg-white/10 transition rounded-lg md:p-4 p-2  border-solid'>
					<Link href={slug}>
						<div>
							<div className='relative w-full h-[250px] group overflow-hidden rounded-md'>
								<Image
									src={imgSrc}
									alt='book-image'
									className='w-full h-64 object-cover rounded-xl '
									width={400}
									height={300}
									onError={() => setImgSrc('/assets/open-book.png')}
									loading='lazy'
								/>
							</div>

							<div className='flex flex-col justify-between gap-2 mt-2'>
								<div className='flex flex-row justify-between'>
									<Link href={slug}>
										<h3 className='text-base  line-clamp-2  text-white font-semibold mt-4 hover:text-blue-400 transition'>
											{title}
										</h3>
									</Link>
									<Badge>
										<span className=' rounded-xl  px-2 py-1 text-sm bg-blue-500 text-white'>
											{Array.isArray(category)
												? category.map(c => c.title).join(', ')
												: category && (category as Category).title}
										</span>
									</Badge>
								</div>

								<div
									className='text-gray-400 mt-2 line-clamp-2'
									dangerouslySetInnerHTML={{
										__html: description.replace(/<img[^>]*>/g, ''),
									}}
								/>
							</div> <br />
							<Link
								href={slug}
								className='text-blue-400 hover:underline text-sm mt-2'
							>
								{t('blog.read_more')}
							</Link>
						</div>
					</Link>
				</div>
			)}
		</>
	)
}
export default BookCard
