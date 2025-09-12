'use client'

import { useState } from 'react'
import axios from 'axios'
import z from 'zod'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'

const contactSchema = z.object({
	email: z
		.string()
		.email('Email formati noto‘g‘ri, to‘g‘ri email kiriting')
		.min(5, 'Email juda qisqa')
		.max(50, 'Email juda uzun'),
	password: z
		.string()
		.min(5, 'Parol kamida 5 ta belgidan iborat bo‘lishi kerak')
		.max(12, 'Parol 12 tadan ko‘p bo‘lmasligi kerak'),
})

function Page() {
	const router = useRouter()
	const { lng } = useParams() as { lng: string }
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{}
	)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const validation = contactSchema.safeParse({ email, password })

		if (!validation.success) {
			const fieldErrors: { email?: string; password?: string } = {}

			validation.error.issues.forEach(err => {
				if (err.path[0] === 'email') fieldErrors.email = err.message
				if (err.path[0] === 'password') fieldErrors.password = err.message
			})

			setErrors(fieldErrors)
			return
		}
		setErrors({})
		setLoading(true)
		try {
			await axios.post('/api/auth', { email, password }).then(() => {
				toast.success('Success login!', {
					position: 'top-center',
					richColors: true,
				})
				router.push(`/${lng}/admin/`)
			})
		} catch (err: any) {
			const message = err.response?.data?.error || 'Error login!'

			toast.error(message, {
				position: 'top-center',
				richColors: true,
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='h-screen w-screen flex items-center justify-center'>
			<div className='p-5 rounded-md flex flex-col gap-3 bg-white max-w-xl w-full'>
				<h1 className='text-center text-3xl font-semibold'>
					Auth Administration
				</h1>
				<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
					<div className='flex flex-col gap-1'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder='Email'
							className='border rounded-md p-2'
						/>
						{errors.email && (
							<p className='text-red-500 text-sm'>{errors.email}</p>
						)}
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder='Password'
							className='border rounded-md p-2'
						/>
						{errors.password && (
							<p className='text-red-500 text-sm'>{errors.password}</p>
						)}
					</div>

					<button
						type='submit'
						disabled={loading}
						className='bg-blue-500 !text-white font-semibold py-2 rounded-md'
					>
						{loading ? 'Checking...' : 'Login'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default Page
