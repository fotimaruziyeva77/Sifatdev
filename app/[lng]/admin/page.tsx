'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	BlogTypes,
	ProjectTypes,
	ServiceTypes,
	VacancyTypes,
} from '@/interfaces'
import axios from 'axios'
import { Pizza } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Page() {
	const [projects, setProjects] = useState<ProjectTypes[]>([])
	const [vacancies, setVacancies] = useState<VacancyTypes[]>([])
	const [blogs, setBlogs] = useState<BlogTypes[]>([])
	const [services, setServices] = useState<ServiceTypes[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
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

		fetchProjects()
	}, [])

	useEffect(() => {
		const fetchVacancies = async () => {
			try {
				const res = await fetch('/api/vacancies')
				const data = await res.json()
				if (data.success) setVacancies(data.data)
			} catch (err) {
				console.error(err)
			}
		}
		fetchVacancies()
	}, [])

	useEffect(() => {
		const fetchBlogs = async () => {
			const res = await fetch('/api/blogs')
			const data = await res.json()
			if (data.success) setBlogs(data.data)
		}
		fetchBlogs()
	}, [])

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
				console.log(err.message)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	const days = [
		'Dushanba',
		'Seshanba',
		'Chorshanba',
		'Payshanba',
		'Juma',
		'Shanba',
		'Yakshanba',
	]

	if (loading) return <p>Loading...</p>

	return (
		<div className='w-full flex flex-col gap-3 p-5'>
			<div className='grid grid-cols-4 gap-5 h-40'>
				<div className='relative flex flex-col gap-3 border-2 border-solid border-blue-700 p-3 rounded-lg bg-blue-500/75'>
					<h1 className='text-3xl'>Projects</h1>
					<span className='absolute bottom-5 right-5 text-7xl text-blue-700'>
						{projects.length}
					</span>
				</div>
				<div className='relative flex flex-col gap-3 border-2 border-solid border-orange-700 p-3 rounded-lg bg-orange-500/75'>
					<h1 className='text-3xl'>Vacancies</h1>
					<span className='absolute bottom-5 right-5 text-7xl text-orange-700'>
						{vacancies.length}
					</span>
				</div>
				<div className='relative flex flex-col gap-3 border-2 border-solid border-green-700 p-3 rounded-lg bg-green-500/75'>
					<h1 className='text-3xl'>Blogs</h1>
					<span className='absolute bottom-5 right-5 text-7xl text-green-700'>
						{blogs.length}
					</span>
				</div>
				<div className='relative flex flex-col gap-3 border-2 border-solid border-fuchsia-700 p-3 rounded-lg bg-fuchsia-500/75'>
					<h1 className='text-3xl'>Services</h1>
					<span className='absolute bottom-5 right-5 text-7xl text-fuchsia-700'>
						{services.length}
					</span>
				</div>
			</div>

			<div className='w-full flex flex-col gap-3 mt-5'>
				<div className='p-3 bg-gradient-to-r from-blue-300 to-transparent flex items-center justify-between'>
					<h1 className='text-2xl !mb-0 font-semibold'>Projects</h1>
					<Link href={'/uz/admin/projects'} className='underline text-blue-600'>
						View All
					</Link>
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
			</div>
			<div className='w-full flex flex-col gap-3 mt-5'>
				<div className='p-3 bg-gradient-to-r from-orange-300 to-transparent flex items-center justify-between'>
					<h1 className='text-2xl !mb-0 font-semibold'>Vacancies</h1>
					<Link
						href={'/uz/admin/vacancies'}
						className='underline text-blue-600'
					>
						View All
					</Link>
				</div>

				<div className='flex flex-col px-3'>
					<Accordion type='single' collapsible>
						{vacancies.map(v => (
							<AccordionItem key={v._id} value={v._id}>
								<AccordionTrigger>
									<div className='flex justify-between items-center w-full'>
										<span>
											{v.title} —{' '}
											<span className='text-sm text-gray-500'>
												{`${v?.createdAt.split('T')[0]}, ${v?.createdAt
													.split('T')[1]
													.slice(0, 5)}`}
											</span>
										</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<div className='space-y-2'>
										<div
											className='prose max-w-none prose-li:marker:text-blue-500'
											dangerouslySetInnerHTML={{ __html: v.description }}
										/>

										<p>
											<b>Workdays:</b>{' '}
											{days[Number(v.workingDays.split('-')[0])]} -{' '}
											{days[Number(v.workingDays.split('-')[1])]}
										</p>
										<p>
											<b>Worktime:</b> {v.workingTimes}
										</p>
										<p>
											<b>Pricing:</b> {v.pricing}
										</p>
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
					{vacancies.length === 0 && (
						<p className='text-center w-full text-sm text-muted-foreground flex items-center justify-center'>
							<Pizza size={18} />
							No data
						</p>
					)}
				</div>
			</div>
			<div className='w-full flex flex-col gap-3 mt-5'>
				<div className='p-3 bg-gradient-to-r from-green-300 to-transparent flex items-center justify-between'>
					<h1 className='text-2xl !mb-0 font-semibold'>Blogs</h1>
					<Link href={'/uz/admin/blogs'} className='underline text-blue-600'>
						View All
					</Link>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3'>
					{blogs.map(blog => (
						<Card key={blog._id}>
							<CardHeader>
								<CardTitle className='flex justify-between items-center'>
									{blog.title}
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
			</div>
			<div className='w-full flex flex-col gap-3 mt-5'>
				<div className='p-3 bg-gradient-to-r from-fuchsia-300 to-transparent flex items-center justify-between'>
					<h1 className='text-2xl !mb-0 font-semibold'>Services</h1>
					<Link href={'/uz/admin/services'} className='underline text-blue-600'>
						View All
					</Link>
				</div>

				<div className='grid grid-cols-3 gap-3 p-3'>
					{services.map(item => (
						<div
							className='flex flex-col gap-1 relative border border-solid border-[#00000025] p-3 pb-10 rounded-lg'
							key={item._id}
						>
							<h1 className='text-xl'>{item.title}</h1>
							<p className='text-sm text-muted-foreground'>
								{item.description}
							</p>
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
						</div>
					))}
				</div>
				{services.length === 0 && (
					<p className='text-center w-full text-sm text-muted-foreground flex items-center justify-center'>
						<Pizza size={18} />
						No data
					</p>
				)}
			</div>
		</div>
	)
}

export default Page
