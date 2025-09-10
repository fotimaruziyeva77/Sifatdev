'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash, Pizza } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ProjectFormModal from './_components/project-form.modal'
import { ProjectTypes } from '@/interfaces'

function Page() {
	const [projects, setProjects] = useState<ProjectTypes[]>([])
	const [loading, setLoading] = useState(false)
	const [showForm, setShowForm] = useState(false)
	const [editProject, setEditProject] = useState<ProjectTypes | null>(null)

	const fetchProjects = async () => {
		setLoading(true)
		try {
			const res = await axios.get('/api/projects')
			setProjects(res.data.data)
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	const deleteProject = async (id: string) => {
		if (!confirm('Are you sure you want to delete this project?')) return
		try {
			await axios.delete(`/api/projects/${id}`)
			fetchProjects()
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		fetchProjects()
	}, [])

	if (loading) return <p>Loading...</p>

	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='px-3 py-3 bg-gradient-to-r from-neutral-300 to-transparent flex items-center justify-between'>
				<h1 className='text-3xl font-semibold !mb-0'>Projects</h1>
				<Button
					className='flex items-center gap-2 bg-blue-500 cursor-pointer hover:bg-blue-700 !text-white'
					onClick={() => {
						setEditProject(null)
						setShowForm(true)
					}}
				>
					<Plus size={18} /> Add Project
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3'>
				{projects.map(project => (
					<Card key={project._id} className='relative overflow-hidden'>
						<CardContent className='p-2'>
							<Image
								src={project?.image}
								alt={project.title}
								width={400}
								height={250}
								className='w-full h-48 object-cover rounded-md'
							/>
							<h2 className='text-xl font-semibold mt-2'>{project.title}</h2>
							<p className='text-sm text-gray-600 line-clamp-2'>
								{project.description}
							</p>
							<p className='text-xs mt-1 text-gray-500'>
								Category: {project.category?.title}
							</p>
							<p className='text-xs text-gray-500'>
								Tech: {project.technologies.map(t => t.name).join(', ')}
							</p>

							<div className='absolute bottom-0 right-0 w-full flex items-center justify-end bg-gradient-to-l from-neutral-200 to-transparent'>
								<Button
									variant='secondary'
									size='icon'
									onClick={() => {
										setEditProject(project)
										setShowForm(true)
									}}
									className='cursor-pointer'
								>
									<Pencil size={16} color='blue' />
								</Button>
								<Button
									variant='destructive'
									size='icon'
									onClick={() => deleteProject(project.slug)}
									className='cursor-pointer'
								>
									<Trash size={16} color='red' />
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{projects.length === 0 && (
				<p className='text-center w-full text-sm text-muted-foreground flex items-center justify-center'>
					<Pizza size={18} />
					No data
				</p>
			)}

			{showForm && (
				<ProjectFormModal
					onClose={() => setShowForm(false)}
					onSaved={fetchProjects}
					project={editProject}
				/>
			)}
		</div>
	)
}

export default Page
