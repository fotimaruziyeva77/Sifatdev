'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import axios from 'axios'

export default function CategoryFormModal({
	onClose,
	onSaved,
}: {
	onClose: () => void
	onSaved: () => void
}) {
	const [title, setTitle] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		setLoading(true)
		try {
			await axios.post('/api/categories', { title })
			onSaved()
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
			<Card className='w-[400px] p-5 relative bg-white'>
				<button className='absolute top-2 right-2' onClick={onClose}>
					<X size={20} />
				</button>
				<h2 className='text-xl mb-3 font-semibold'>Add Category</h2>
				<input
					type='text'
					placeholder='Category title'
					className='border p-2 w-full rounded'
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<Button
					className='mt-3 bg-blue-500 hover:bg-blue-700 cursor-pointer'
					onClick={handleSubmit}
					disabled={loading}
				>
					{loading ? 'Saving...' : 'Save'}
				</Button>
			</Card>
		</div>
	)
}
