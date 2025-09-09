'use client'

import { useState, useEffect } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css'
import dynamic from 'next/dynamic'

interface BlogFormModalProps {
	open: boolean
	onClose: () => void
	onSaved: () => void
	blog?: any
}

export default function BlogFormModal({
	open,
	onClose,
	onSaved,
	blog,
}: BlogFormModalProps) {
	const [form, setForm] = useState({
		title: '',
		description: '',
		image: '',
		tags: [] as string[],
	})
	const [availableTags, setAvailableTags] = useState<any[]>([])
	const [newTag, setNewTag] = useState('')
	const [uploading, setUploading] = useState(false)

	useEffect(() => {
		fetchTags()
	}, [])

	const fetchTags = async () => {
		const res = await fetch('/api/tags')
		const data = await res.json()
		if (data.success) setAvailableTags(data.data)
	}

	useEffect(() => {
		if (blog) {
			setForm({
				title: blog.title,
				description: blog.description,
				image: blog.image,
				tags: blog.tags?.map((t: any) => t._id) || [],
			})
		} else {
			setForm({ title: '', description: '', image: '', tags: [] })
		}
	}, [blog])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleAddTag = async () => {
		if (!newTag.trim()) return
		const res = await fetch('/api/tags', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: newTag }),
		})
		const data = await res.json()
		if (data.success) {
			setAvailableTags([...availableTags, data.data])
			setForm({ ...form, tags: [...form.tags, data.data._id] })
			setNewTag('')
		}
	}

	const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.[0]) return
		const file = e.target.files[0]

		const formData = new FormData()
		formData.append('file', file)

		setUploading(true)
		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			})
			const data = await res.json()
			if (data.success) {
				setForm({ ...form, image: data.url })
			}
		} finally {
			setUploading(false)
		}
	}

	const handleSubmit = async () => {
		const payload = { ...form }

		if (blog) {
			await fetch(`/api/blogs/${blog.slug}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})
		} else {
			await fetch(`/api/blogs`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})
		}

		onSaved()
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className=' w-[800px] bg-white max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>{blog ? 'Edit Blog' : 'Add Blog'}</DialogTitle>
				</DialogHeader>
				<div className='flex flex-col gap-3'>
					<Input
						name='title'
						placeholder='Title'
						value={form.title}
						onChange={handleChange}
					/>

					<label>Description (Rich Text)</label>
					<div className='h-48'>
						<ReactQuill
							theme='snow'
							value={form.description}
							onChange={val => setForm({ ...form, description: val })}
							modules={{
								toolbar: [
									[{ header: [1, 2, 3, false] }],
									['bold', 'italic', 'underline', 'strike'],
									[{ list: 'ordered' }, { list: 'bullet' }],
									['blockquote', 'code-block'],
									[{ align: [] }],
									['link', 'image'],
									['clean'],
								],
							}}
							className='h-full'
						/>
					</div>

					<label className='mt-20'>Image Upload</label>
					<input type='file' accept='image/*' onChange={handleUploadImage} />
					{uploading && <p className='text-sm text-gray-500'>Uploading...</p>}
					{form.image && (
						<Image
							src={form.image}
							alt='Preview'
							className='w-full h-40 object-cover rounded'
							width={300}
							height={160}
						/>
					)}

					<label>Tags</label>
					<div className='flex flex-wrap gap-2'>
						{availableTags.map(t => (
							<label key={t._id} className='flex items-center gap-1'>
								<input
									type='checkbox'
									checked={form.tags.includes(t._id)}
									onChange={e => {
										if (e.target.checked) {
											setForm({ ...form, tags: [...form.tags, t._id] })
										} else {
											setForm({
												...form,
												tags: form.tags.filter(id => id !== t._id),
											})
										}
									}}
								/>
								{t.name}
							</label>
						))}
					</div>

					<div className='flex gap-2 mt-2'>
						<Input
							placeholder='New tag name'
							value={newTag}
							onChange={e => setNewTag(e.target.value)}
						/>
						<Button
							onClick={handleAddTag}
							className='bg-blue-500 cursor-pointer hover:bg-blue-700 !text-white'
						>
							Add Tag
						</Button>
					</div>

					<div className='flex justify-end gap-2 mt-4'>
						<Button
							variant='outline'
							onClick={onClose}
							className='!text-white hover:bg-blue-950 cursor-pointer'
						>
							Cancel
						</Button>
						<Button
							className='bg-blue-500 hover:bg-blue-600 !text-white cursor-pointer'
							onClick={handleSubmit}
						>
							{blog ? 'Update' : 'Create'}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
