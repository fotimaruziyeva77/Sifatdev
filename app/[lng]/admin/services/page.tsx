'use client'

import { ServiceTypes } from '@/interfaces'
import { Pencil, Trash2, Plus, Pizza } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function Page() {
	const [services, setServices] = useState<ServiceTypes[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const [showForm, setShowForm] = useState(false)
	const [editingService, setEditingService] = useState<ServiceTypes | null>(
		null
	)

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [slug, setSlug] = useState('')
	const [iconFile, setIconFile] = useState<File | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('/api/services', {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				})
				if (!res.ok) throw new Error(`Error: ${res.status}`)
				const { data } = await res.json()
				setServices(data)
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	const resetForm = () => {
		setTitle('')
		setDescription('')
		setSlug('')
		setIconFile(null)
		setEditingService(null)
		setShowForm(false)
	}

	const handleSave = async () => {
		try {
			let iconUrl = editingService?.icon || ''

			if (iconFile) {
				const uploadData = new FormData()
				uploadData.append('file', iconFile)
				const uploadRes = await fetch('/api/upload', {
					method: 'POST',
					body: uploadData,
				})
				const uploadJson = await uploadRes.json()
				if (uploadJson.success) {
					iconUrl = uploadJson.url
				}
			}

			const payload = { title, description, slug, icon: iconUrl }

			const res = await fetch(
				editingService
					? `/api/services/${editingService.slug}`
					: '/api/services',
				{
					method: editingService ? 'PUT' : 'POST',
					headers: {
						'Content-Type': 'application/json',
						credentials: 'include',
					},
					body: JSON.stringify(payload),
				}
			)

			if (!res.ok) throw new Error('Failed to save service')

			const { data } = await res.json()

			if (editingService) {
				setServices(prev =>
					prev.map(s => (s._id === editingService._id ? data : s))
				)
			} else {
				setServices(prev => [...prev, data])
			}

			resetForm()
		} catch (err: any) {
			alert(err.message)
		}
	}

	const handleDelete = async (slug: string) => {
		if (!confirm('Delete this service?')) return
		try {
			const res = await fetch(`/api/services/${slug}`, {
				method: 'DELETE',
				headers: { credentials: 'include' },
			})
			if (!res.ok) throw new Error('Failed to delete service')
			setServices(prev => prev.filter(s => s.slug !== slug))
		} catch (err: any) {
			alert(err.message)
		}
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p className='text-red-500'>Error: {error}</p>

	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='px-3 py-3 bg-gradient-to-r from-neutral-300 to-transparent flex items-center justify-between'>
				<h1 className='text-3xl font-semibold !mb-0'>Services</h1>
				<button
					onClick={() => setShowForm(true)}
					className='flex items-center gap-2 p-3 px-5 rounded-sm bg-blue-500 text-white cursor-pointer'
				>
					<Plus size={18} /> Add Service
				</button>
			</div>

			<div className='grid grid-cols-3 gap-3 p-3'>
				{services.map(item => (
					<div
						className='flex flex-col gap-1 relative border border-solid border-[#00000025] p-3 pb-10'
						key={item._id}
					>
						<h1 className='text-xl'>{item.title}</h1>
						<p className='text-sm text-muted-foreground'>{item.description}</p>
						{item.icon && (
							<Image
								src={item.icon}
								alt={item.title}
								className='w-16 h-16 mt-2'
								width={64}
								height={64}
								loading='lazy'
							/>
						)}

						<div className='absolute bottom-0 right-0 px-3 py-1.5 bg-gradient-to-l from-neutral-300 to-transparent flex items-center justify-end gap-3 w-full'>
							<Pencil
								size={18}
								color='blue'
								className='cursor-pointer'
								onClick={() => {
									setEditingService(item)
									setTitle(item.title)
									setDescription(item.description)
									setSlug(item.slug)
									setShowForm(true)
								}}
							/>
							<Trash2
								size={18}
								color='red'
								className='cursor-pointer'
								onClick={() => handleDelete(item.slug)}
							/>
						</div>
					</div>
				))}
			</div>

			{services.length === 0 && (
				<p className='text-center w-full text-sm text-muted-foreground flex items-center justify-center'>
					<Pizza size={18} />
					No data
				</p>
			)}

			{showForm && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
					<div className='bg-white p-4 rounded shadow w-[400px] flex flex-col gap-3'>
						<h2 className='text-xl font-bold text-center uppercase'>
							{editingService ? 'Edit Service' : 'Add Service'}
						</h2>
						<input
							type='text'
							placeholder='Title'
							value={title}
							onChange={e => setTitle(e.target.value)}
							className='border p-2 border-[#00000025] rounded-md active:!border-blue-500/25'
						/>
						<textarea
							placeholder='Description'
							value={description}
							onChange={e => setDescription(e.target.value)}
							className='border p-2 border-[#00000025] rounded-md active:!border-blue-500/25'
						/>
						<input
							type='text'
							placeholder='Slug'
							value={slug}
							onChange={e => setSlug(e.target.value)}
							className='border p-2 border-[#00000025] rounded-md active:!border-blue-500/25'
						/>
						<input
							type='file'
							accept='image/*'
							onChange={e => setIconFile(e.target.files?.[0] || null)}
							className='border p-2 border-[#00000025] rounded-md active:!border-blue-500/25'
						/>

						<div className='flex justify-end gap-2 mt-3'>
							<button
								onClick={resetForm}
								className='px-4 py-2 bg-gray-300 rounded cursor-pointer'
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								className='px-4 py-2 bg-blue-500 text-white rounded cursor-pointer'
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Page
