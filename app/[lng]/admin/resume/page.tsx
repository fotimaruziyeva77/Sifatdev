'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { ResumeTypes } from '@/interfaces'
import axios from 'axios'
import { Pizza, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DocxPreview } from './_components/doc-preview'

function Page() {
	const [resumes, setResumes] = useState<ResumeTypes[]>([])
	const [loading, setLoading] = useState(false)

	const fetchResume = async () => {
		setLoading(true)
		try {
			const res = await axios.get('/api/resume')
			setResumes(res.data.data)
		} catch (err: any) {
			toast.error(err.response?.data?.error || 'Failed to fetch resumes', {
				position: 'top-center',
				richColors: true,
			})
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this resume?')) return
		try {
			await fetch(`/api/resume/${id}`, { method: 'DELETE' })
			fetchResume()
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		fetchResume()
	}, [])
	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='px-3 py-3 bg-gradient-to-r from-neutral-300 to-transparent flex items-center justify-between'>
				<h1 className='text-3xl font-semibold !mb-0'>Resumes</h1>
			</div>

			<div className='flex flex-col px-3'>
				<Accordion type='single' collapsible>
					{resumes.map(v => (
						<AccordionItem key={v._id} value={v._id}>
							<AccordionTrigger>
								<div className='flex justify-between items-center w-full'>
									<span>
										{v.vacancy} —{' '}
										<span className='text-sm text-gray-500'>
											{`${v?.createdAt.split('T')[0]}, ${v?.createdAt
												.split('T')[1]
												.slice(0, 5)}`}
										</span>
									</span>
									<div className='flex gap-2'>
										<Trash2
											size={18}
											className='cursor-pointer text-red-500'
											onClick={e => {
												e.stopPropagation()
												handleDelete(v._id)
											}}
										/>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className='flex items-center gap-3'>
									<h1 className='text-xl font-semibold'>Sender name: </h1>
									<h2 className='text-lg'>{v.senderName}</h2>
								</div>
								<div className='flex items-center gap-3'>
									<h1 className='text-xl font-semibold'>Sender phone: </h1>
									<h2 className='text-lg'>{v.phoneNumber}</h2>
								</div>
								<div className='flex items-center gap-3'>
									<h1 className='text-xl font-semibold'>Vacancy: </h1>
									<h2 className='text-lg'>{v.vacancy}</h2>
								</div>
								<div className='w-full h-[50vh]'>
									{v.cv.endsWith('.pdf') ? (
										<iframe
											src={v.cv}
											className='w-full h-full border rounded'
											title='PDF Preview'
										/>
									) : v.cv.endsWith('.doc') || v.cv.endsWith('.docx') ? (
										<DocxPreview url={v.cv} />
									) : (
										<a
											href={v.cv}
											target='_blank'
											rel='noopener noreferrer'
											className='text-blue-500 underline'
										>
											Faylni yuklab oling
										</a>
									)}
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
			{resumes.length === 0 && (
				<p className='text-center w-full text-sm text-muted-foreground flex items-center justify-center'>
					<Pizza size={18} />
					No data
				</p>
			)}
		</div>
	)
}

export default Page
