'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash, Pizza } from 'lucide-react'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import BlogFormModal from './_components/blog-form'
import Image from 'next/image'
import { BlogTypes } from '@/interfaces'

export default function Page() {
	const [blogs, setBlogs] = useState<BlogTypes[]>([])
	const [openModal, setOpenModal] = useState(false)
	const [selectedBlog, setSelectedBlog] = useState<BlogTypes | null>(null)

	const fetchBlogs = async () => {
		const res = await fetch('/api/blogs')
		const data = await res.json()
		if (data.success) setBlogs(data.data)
	}

	useEffect(() => {
		fetchBlogs()
	}, [])

	const handleAdd = () => {
		setSelectedBlog(null)
		setOpenModal(true)
	}

	const handleEdit = (blog: BlogTypes) => {
		setSelectedBlog(blog)
		setOpenModal(true)
	}

	const handleDelete = async (slug: string) => {
		if (!confirm('Delete this blog?')) return
		await fetch(`/api/blogs/${slug}`, { method: 'DELETE' })
		fetchBlogs()
	}

	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='px-3 py-3 bg-gradient-to-r from-neutral-300 to-transparent flex items-center justify-between'>
				<h1 className='text-3xl font-semibold !mb-0'>Blogs</h1>
				<Button
					onClick={handleAdd}
					className='flex items-center gap-2 bg-blue-500 cursor-pointer hover:bg-blue-700 !text-white'
				>
					<Plus size={18} /> Add Blog
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3'>
				{blogs.map(blog => (
					<Card key={blog._id}>
						<CardHeader>
							<CardTitle className='flex justify-between items-center'>
								{blog.title}
								<div className='flex gap-2'>
									<Pencil
										size={18}
										className='cursor-pointer text-blue-500'
										onClick={() => handleEdit(blog)}
									/>
									<Trash
										size={18}
										className='cursor-pointer text-red-500'
										onClick={() => handleDelete(blog.slug)}
									/>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Image
								src={blog.image}
								alt={blog.title}
								className='w-full h-40 object-cover rounded mb-2'
								width={300}
								height={160}
							/>
							<div
								className='text-sm text-gray-700 line-clamp-3'
								dangerouslySetInnerHTML={{ __html: blog.description }}
							/>
							<div className='flex gap-2 mt-2 flex-wrap'>
								{blog.tags.map(t => (
									<span
										key={t._id}
										className='text-xs bg-gray-200 px-2 py-1 rounded'
									>
										#{t.name}
									</span>
								))}
							</div>
						</CardContent>
						<CardFooter>
							<span className='text-xs text-gray-500'>
								Views: {blog.viewCount}
							</span>
						</CardFooter>
					</Card>
				))}
			</div>
			{blogs.length === 0 && (
				<p className='text-center w-full text-sm text-muted-foreground flex items-center justify-center'>
					<Pizza size={18} />
					No data
				</p>
			)}

			<BlogFormModal
				open={openModal}
				onClose={() => setOpenModal(false)}
				onSaved={fetchBlogs}
				blog={selectedBlog || undefined}
			/>
		</div>
	)
}
