'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SkillTypes } from '@/interfaces'
import axios from 'axios'
import { Pencil, Pizza, Plus, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

function Page() {
	const [skills, setSkills] = useState<SkillTypes[]>([])
	const [loading, setLoading] = useState(false)
	const [editSkill, setEditSkill] = useState<SkillTypes | null>(null)
	const [showForm, setShowForm] = useState(false)
	const [name, setName] = useState('')
	const [saving, setSaving] = useState(false)

	const fetchSkills = async () => {
		setLoading(true)
		try {
			const res = await axios.get('/api/skills')
			setSkills(res.data.data)
		} catch (err: any) {
			toast.error(err.response?.data?.error || 'Failed to fetch skills', {
				position: 'top-center',
				richColors: true,
			})
		} finally {
			setLoading(false)
		}
	}

	const deleteSkill = async (id: string) => {
		if (!confirm('Are you sure you want to delete this skill?')) return
		try {
			await axios.delete(`/api/skills/${id}`)
			toast.success('Skill deleted!', {
				position: 'top-center',
				richColors: true,
			})
			fetchSkills()
		} catch (err: any) {
			console.error(err)
			toast.error(err.response?.data?.error || 'Failed to delete skill', {
				position: 'top-center',
				richColors: true,
			})
		}
	}

	const saveSkill = async () => {
		if (!name.trim()) {
			toast.error('Skill name cannot be empty', {
				position: 'top-center',
				richColors: true,
			})
			return
		}
		setSaving(true)
		try {
			if (editSkill) {
				await axios.put(`/api/skills/${editSkill._id}`, { name })
				toast.success('Skill updated!', {
					position: 'top-center',
					richColors: true,
				})
			} else {
				await axios.post('/api/skills', { name })
				toast.success('Skill added!', {
					position: 'top-center',
					richColors: true,
				})
			}
			fetchSkills()
			setShowForm(false)
			setName('')
			setEditSkill(null)
		} catch (err: any) {
			toast.error(err.response?.data?.error || 'Failed to save skill', {
				position: 'top-center',
				richColors: true,
			})
		} finally {
			setSaving(false)
		}
	}

	useEffect(() => {
		fetchSkills()
	}, [])

	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='px-3 py-3 bg-gradient-to-r from-neutral-300 to-transparent flex items-center justify-between'>
				<h1 className='text-3xl font-semibold !mb-0'>Skills</h1>
				<Button
					className='flex items-center gap-2 bg-blue-500 cursor-pointer hover:bg-blue-700 !text-white'
					onClick={() => {
						setEditSkill(null)
						setName('')
						setShowForm(true)
					}}
				>
					<Plus size={18} /> Add Skills
				</Button>
			</div>

			<div className='flex flex-col gap-3 px-3'>
				{loading && <p>Loading...</p>}
				<div className='flex items-center gap-5'>
					{skills.map(item => (
						<div
							className='flex items-center justify-between p-2 border rounded-md gap-3'
							key={item._id}
						>
							<h1 className='text-lg font-medium !mb-0'>{item.name}</h1>
							<span className='flex items-center gap-1'>
								<Pencil
									size={16}
									className='cursor-pointer text-blue-500'
									onClick={() => {
										setEditSkill(item)
										setName(item.name)
										setShowForm(true)
									}}
								/>
								<Trash2
									size={16}
									className='cursor-pointer text-red-500'
									onClick={() => deleteSkill(item._id)}
								/>
							</span>
						</div>
					))}
				</div>
			</div>

			{!loading && skills.length === 0 && (
				<p className='text-center w-full text-sm text-muted-foreground flex items-center justify-center gap-2'>
					<Pizza size={18} />
					No data
				</p>
			)}

			{showForm && (
				<div className='fixed w-screen h-screen top-0 left-0 z-50 bg-black/75 flex items-center justify-center'>
					<div className='flex flex-col gap-5 p-4 rounded-md bg-white relative max-w-md w-full'>
						<X
							size={20}
							className='absolute top-3 right-3 cursor-pointer'
							onClick={() => {
								setShowForm(false)
								setName('')
								setEditSkill(null)
							}}
						/>

						<h1 className='text-center text-2xl font-semibold'>
							{editSkill ? 'Edit skill' : 'Add skill'}
						</h1>

						<div className='flex flex-col gap-1'>
							<Label htmlFor='skill'>Enter skill name</Label>
							<Input
								type='text'
								id='skill'
								placeholder='Skill name'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>

						<Button
							onClick={saveSkill}
							disabled={saving}
							className='bg-blue-500 hover:bg-blue-700 !text-white cursor-pointer'
						>
							{saving
								? editSkill
									? 'Updating...'
									: 'Adding...'
								: editSkill
								? 'Update Skill'
								: 'Add Skill'}
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Page
