'use client'

import Link from 'next/link'
import useTranslate from '@/hooks/use-translate'
import { useParams } from 'next/navigation'

export default function NotFoundPage() {
	const t = useTranslate()
	const {lng}=useParams()

	return (
		<div className='min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden px-4'>
			<div className='absolute top-0 left-0 w-40 h-40 border-[20px] border-blue-700 rounded-full -translate-x-1/3 -translate-y-1/3' />
			<div className='absolute bottom-0 right-0 w-40 h-40 border-[20px] border-blue-700 rounded-full translate-x-1/3 translate-y-1/' />

			<div className='text-center relative z-10'>
				<h1 className='text-[150px] font-bold text-[#4A90E2]'>{t('notfound.title')}</h1>
				<h2 className='mt-2 text-2xl font-semibold text-gray-200'>
					{t('notfound.subtitle')}
				</h2>
				<p className='mt-4 text-gray-400 max-w-lg mx-auto'>
					{t('notfound.description')}
				</p>

				<div className='mt-8 flex justify-center gap-4'>
					<Link
						href={`/${lng}/`}
						className='bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-medium transition'
					>
						{t('notfound.btn_home')}
					</Link>
				</div>
			</div>

			{/* Dekorativ nuqtalar chap va o‘ngda */}
			<div className='absolute left-20 bottom-20 grid grid-cols-6 gap-8'>
				{Array.from({ length: 24 }).map((_, i) => (
					<div key={i} className='w-1.5 h-1.5 bg-blue-800 rounded-full' />
				))}
			</div>
			<div className='absolute right-10 top-20 grid grid-cols-6 gap-8'>
				{Array.from({ length: 24 }).map((_, i) => (
					<div key={i} className='w-1.5 h-1.5 bg-blue-800 rounded-full' />
				))}
			</div>
		</div>
	)
}
