'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, Plus, Check } from 'lucide-react'
import CategoryFormModal from './category-form.modal'
import TechnologyFormModal from './technology-form.modal'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
	onClose: () => void
	onSaved: () => void
	project?: any
}

function ProjectFormModal({ onClose, onSaved, project }: Props) {
	const [title, setTitle] = useState(project?.title || '')
	const [slug, setSlug] = useState(project?.slug || '')
	const [description, setDescription] = useState(project?.description || '')
	const [image, setImage] = useState(project?.image || '')
	const [category, setCategory] = useState(project?.category?._id || '')
	const [technology, setTechnology] = useState<string[]>(
		project?.technologies?.map((t: any) => t._id) || []
	)

	const [categories, setCategories] = useState<any[]>([])
	const [technologies, setTechnologies] = useState<any[]>([])
	const [loading, setLoading] = useState(false)

	const [showCategoryModal, setShowCategoryModal] = useState(false)
	const [showTechnologyModal, setShowTechnologyModal] = useState(false)

	const generateSlug = (text: string) =>
		text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')

	useEffect(() => {
		if (!project) {
			setSlug(generateSlug(title))
		}
	}, [title])

	const fetchMeta = async () => {
		try {
			const [catRes, techRes] = await Promise.all([
				axios.get('/api/categories'),
				axios.get('/api/technologies'),
			])
			setCategories(catRes.data.data)
			setTechnologies(techRes.data.data)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		fetchMeta()
	}, [])

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.[0]) return
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		try {
			const res = await axios.post('/api/upload', formData)
			setImage(res.data.url)
		} catch (err) {
			console.error(err)
		}
	}

	const handleSubmit = async () => {
		setLoading(true)
		try {
			if (project) {
				await axios.put(`/api/projects/${project.slug}`, {
					title,
					slug,
					description,
					image: image,
					category,
					technologies: technology,
				})
			} else {
				await axios.post('/api/projects', {
					title,
					slug,
					description,
					image: image,
					category,
					technologies: technology,
				})
			}
			onSaved()
			onClose()
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	const toggleTechnology = (id: string) => {
		if (technology.includes(id)) {
			setTechnology(technology.filter(t => t !== id))
		} else {
			setTechnology([...technology, id])
		}
	}

	return (
		<div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
			<Card className='w-[600px] p-5 relative bg-white rounded-xl shadow-lg max-h-[90vh] overflow-y-auto overflow-x-hidden'>
				<button
					className='absolute top-2 right-2 text-gray-500 hover:text-black'
					onClick={onClose}
				>
					<X size={20} />
				</button>

				<h2 className='text-2xl font-semibold mb-4'>
					{project ? 'Edit Project' : 'Add Project'}
				</h2>

				<div className='flex flex-col gap-3'>
					<input
						type='text'
						placeholder='Title'
						className='border p-2 rounded-md border-solid border-[#00000025]'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<input
						type='text'
						placeholder='Slug'
						className='border p-2 rounded-md border-solid border-[#00000025]'
						value={slug}
						onChange={e => setSlug(generateSlug(e.target.value))}
					/>

					<textarea
						placeholder='Description'
						className='border p-2 rounded-md border-solid border-[#00000025]'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>

					<div>
						<input type='file' onChange={handleImageUpload} />
						{image && (
							<Image
								src={image}
								alt='preview'
								className='w-40 h-28 mt-2 object-cover rounded-md border'
								width={160}
								height={112}
							/>
						)}
					</div>

					<div className='flex items-center gap-2'>
						<select
							value={category}
							onChange={e => setCategory(e.target.value)}
							className='border p-2 rounded-md border-solid border-[#00000025] flex-1'
						>
							<option value=''>Select category</option>
							{categories.map(cat => (
								<option key={cat._id} value={cat._id}>
									{cat.title}
								</option>
							))}
						</select>
						<Button
							variant='secondary'
							className='bg-blue-500 hover:bg-blue-700 cursor-pointer'
							size='icon'
							onClick={() => setShowCategoryModal(true)}
						>
							<Plus size={18} />
						</Button>
					</div>

					<div className='flex items-center gap-2'>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant='outline'
									role='combobox'
									className='flex-1 justify-between bg-white'
								>
									{technology.length > 0
										? `${technology.length} selected`
										: 'Select technologies'}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-[550px] p-0 bg-white'>
								<Command>
									<CommandGroup>
										{technologies.map(tech => (
											<CommandItem
												key={tech._id}
												onSelect={() => toggleTechnology(tech._id)}
											>
												<Check
													className={cn(
														'mr-2 h-4 w-4',
														technology.includes(tech._id)
															? 'opacity-100'
															: 'opacity-0'
													)}
												/>
												{tech.name}
											</CommandItem>
										))}
									</CommandGroup>
								</Command>
							</PopoverContent>
						</Popover>
						<Button
							variant='secondary'
							size='icon'
							className='bg-blue-500 hover:bg-blue-700 cursor-pointer'
							onClick={() => setShowTechnologyModal(true)}
						>
							<Plus size={18} />
						</Button>
					</div>

					<Button
						onClick={handleSubmit}
						disabled={loading}
						className='bg-blue-500 hover:bg-blue-700 cursor-pointer !text-white'
					>
						{loading ? 'Saving...' : 'Save'}
					</Button>
				</div>
			</Card>

			{showCategoryModal && (
				<CategoryFormModal
					onClose={() => setShowCategoryModal(false)}
					onSaved={() => {
						setShowCategoryModal(false)
						fetchMeta()
					}}
				/>
			)}

			{showTechnologyModal && (
				<TechnologyFormModal
					onClose={() => setShowTechnologyModal(false)}
					onSaved={() => {
						setShowTechnologyModal(false)
						fetchMeta()
					}}
				/>
			)}
		</div>
	)
}

export default ProjectFormModal
