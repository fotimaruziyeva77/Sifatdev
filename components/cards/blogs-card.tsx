'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import useTranslate from '@/hooks/use-translate'
import { TagTypes } from '@/interfaces'

interface IProps {
	_id: string
	title: string
	slug: string
	description: string
	image: string
	viewCount: number
	tags: TagTypes[]
	createdAt: string
	type: 'card' | 'list' | 'small-rated'
}

function BookCard({
	_id,
	tags,
	image,
	title,
	type,
	description,
	slug,
}: IProps) {
	const [imgSrc, setImgSrc] = useState(image)
	const t = useTranslate()

	return (
		<>
			{type === 'card' && (
				<div className='max-w-96 md:w-96 w-full flex flex-col gap-5 bg-white/5 border border-white/10 hover:bg-white/10 transition rounded-lg md:p-4 p-2 border-solid'>
					<Link href={slug} key={_id}>
						<div>
							<div className='relative w-full h-[250px] group overflow-hidden rounded-md'>
								<Image
									src={imgSrc}
									alt='book-image'
									className='w-full h-64 object-cover rounded-xl'
									width={400}
									height={300}
									onError={() => setImgSrc('/assets/open-book.png')}
									loading='lazy'
								/>
							</div>

							<div className='flex flex-col justify-between gap-2 mt-2'>
								<div className='flex flex-row justify-between'>
									<Link href={slug}>
										<h3 className='text-base line-clamp-2 text-white font-semibold mt-4 hover:text-blue-400 transition'>
											{title}
										</h3>
									</Link>
								</div>

								<div
									className='text-gray-400 mt-2 line-clamp-2'
									dangerouslySetInnerHTML={{
										__html: description.replace(/<img[^>]*>/g, ''),
									}}
								/>

								{/* Tags */}
								<div className="flex flex-wrap gap-2 mt-3">
									{tags?.map((tag) => (
										<span
											key={tag._id}
											className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400"
										>
											{tag.name}
										</span>
									))}
								</div>
							</div>

							<br />
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
