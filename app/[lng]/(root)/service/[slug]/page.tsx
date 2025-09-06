'use client'

import { Services } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { API_SERVICE } from '@/services/api-service'
import axios from 'axios'
import { LucideLoader, LucideRocket } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

type ServicesErrors = {
	fullName?: string
	phoneNumber?: string
	description?: string
}

export default function ServiceSlug() {
	const params = useParams()
	const [services, setServices] = useState<Services[]>([])
	const [loading, setLoading] = useState(false)
	const [companyName, setCompanyName] = useState('')
	const [fullName, setFullName] = useState('')
	const [description, setDescription] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [, setErrors] = useState<ServicesErrors>({})
	const [projectType, setProjectType] = useState<string | ''>('')
	const { lng } = useParams()
	const t = useTranslate()

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.normalize('NFKD')
			.replace(/[‘’ʻ`]/g, "'")
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9'-]+/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-+|-+$/g, '')
	}

	const slug = slugify(decodeURIComponent(params.slug as string))

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`${API_SERVICE.services}${slug}/`, {
					headers: {
						'Accept-Language': lng,
					},
				})
				if (Array.isArray(res.data.results)) {
					setServices(res.data.results)
				} else if (res.data) {
					setServices([res.data])
				} else {
					setServices([])
				}
			} catch (err) {
				console.error(err)
				setServices([])
			}
		}
		fetchData()
	}, [slug, lng])

	const resetData = () => {
		setCompanyName('')
		setFullName('')
		setPhoneNumber('')
		setDescription('')
		setProjectType('')
	}

	const contactSchema = z.object({
		fullName: z.string().min(3, t('notification.contactwarning.fullname')),
		phoneNumber: z
			.string()
			.regex(/^\+998[0-9]{9}$/, t('notification.contactwarning.phonenumber')),
		description: z.string().min(5, t('notification.contactwarning.message')),
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const validation = contactSchema.safeParse({
			fullName,
			phoneNumber,
			description,
		})

		if (!validation.success) {
			const fieldErrors: ServicesErrors = {}
			validation.error.issues.forEach(err => {
				const field = err.path[0] as keyof ServicesErrors
				fieldErrors[field] = err.message
				toast.warning(err.message, {
					position: 'top-center',
					richColors: true,
				})
			})
			setErrors(fieldErrors)
			return
		}

		setErrors({})
		setLoading(true)
		try {
			await axios.post(`${API_SERVICE.serrequest}`, {
				company_name: companyName,
				service: Number(projectType),
				full_name: fullName,
				description: description,
				phone_number: phoneNumber,
			})
			toast.success(t('success.contactmessage'), {
				position: 'top-center',
				richColors: true,
			})
			resetData()
		} catch (err) {
			toast.error(t('error.contacterror'), {
				position: 'top-center',
				richColors: true,
			})
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen from-[#0B192C] to-[#0B192C]/90 flex items-center justify-center px-4'>
			<div className='grid grid-cols-1 md:grid-cols-3 max-w-7xl w-full text-white gap-8'>
				{/* Chap tarafdagi matn */}
				<div className='md:col-span-1 flex flex-col'>
					<h2 className='text-sm text-blue-400 font-semibold mb-2'>
						SIZNING RAQAMLI HAMKORINGIZ
					</h2>
					{services.map(item => (
						<h1 key={item.id} className='text-4xl font-bold mb-4 text-white'>
							{item.title}
						</h1>
					))}
					<p className='text-gray-400'>
						Ushbu birlamchi malumotlarni to‘ldirganingizdan so‘ng bizning mas’ul
						xodimlarimiz siz bilan aloqaga chiqishadi.
					</p>
				</div>

				{/* Forma */}
				<div className='md:col-span-2 bg-[#0622639f] p-6 rounded-lg'>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm mb-1'>
									Kompaniya nomini kiriting
								</label>
								<input
									type='text'
									name='company'
									value={companyName}
									onChange={e => setCompanyName(e.target.value)}
									placeholder='Kompaniya nomini kiriting'
									className='w-full px-4 py-4 rounded-md bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-300'
								/>
							</div>
							<div>
								<label className='block text-sm mb-1'>F.I.SH</label>
								<input
									type='text'
									name='fullName'
									value={fullName}
									onChange={e => setFullName(e.target.value)}
									placeholder='Ismingizni kiriting'
									className='w-full px-4 py-4 rounded-md bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-300'
								/>
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm mb-1'>Telefon raqamingiz</label>
								<input
									type='text'
									name='phone'
									value={phoneNumber}
									placeholder='+998'
									onChange={e => setPhoneNumber(e.target.value)}
									className='w-full px-4 py-4 rounded-md bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-300'
								/>
							</div>

							<div>
								<label className='block text-sm mb-1'>Xizmat turi</label>
								<select
									name='projectType'
									value={projectType}
									onChange={e => setProjectType(e.target.value)}
									className='w-full px-4 py-4 rounded-md bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-300'
								>
									<option value=''>Xizmat turini tanlang</option>
									{services.map(service => (
										<option key={service.id} value={service.id}>
											{service.title}
										</option>
									))}
								</select>
							</div>
						</div>

						<div>
							<label className='block text-sm mb-1'>Loyiha tavsifi</label>
							<textarea
								name='description'
								value={description}
								rows={4}
								onChange={e => setDescription(e.target.value)}
								placeholder="Loyiha haqida ma'lumot yozing..."
								className='w-full px-4 py-2 rounded-md bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-300  min-h-72 max-h-48 resize-y border  p-2'
							/>
						</div>

						<div className='flex justify-end'>
							<button
								type='submit'
								disabled={loading}
								className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-4 rounded-lg transition disabled:opacity-50'
							>
								{loading ? (
									<>
										<LucideLoader className='w-6 h-6 animate-spin' />
										Yuborilmoqda...
									</>
								) : (
									<>
										Yuborish
										<LucideRocket className='w-6 h-6' />
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		// <div className='min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6'>
		//   <div className='max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
		//     {/* Chap tomoni */}
		//     <div className='flex flex-col justify-center text-gray-300'>
		//       <p className='text-sm uppercase text-emerald-400 tracking-wider mb-2'>
		//         Sizning raqamli hamkoringiz
		//       </p>
		//       {services.map(service => (
		//         <h1 key={service.id} className='text-3xl font-bold mb-4'>
		//           {service.title}
		//         </h1>
		//       ))}

		//       <p className='text-gray-400 text-sm'>
		//         Ushbu birlamchi ma’lumotlarni to‘ldirganingizdan so‘ng bizning
		//         mas’ul xodimlarimiz siz bilan aloqaga chiqishadi.
		//       </p>
		//     </div>

		//     {/* Forma */}
		//     <form
		//       onSubmit={handleSubmit}
		//       className='bg-[#1c1c1c] p-6 rounded-xl shadow-lg flex flex-col gap-4'
		//     >
		//       {/* Kompaniya va FISH */}
		//       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
		//         <div>
		//           <label className='block mb-1 text-sm'>
		//             Kompaniya nomini kiriting
		//           </label>
		//           <input
		//             type='text'
		//             placeholder='Kompaniya nomi'
		//             value={companyName}
		//             onChange={e => setCompanyName(e.target.value)}
		//             className='w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:border-emerald-500'
		//           />
		//         </div>
		//         <div>
		//           <label className='block mb-1 text-sm'>F.I.SH</label>
		//           <input
		//             type='text'
		//             placeholder='Ismingizni kiriting'
		//             value={fullName}
		//             onChange={e => setFullName(e.target.value)}
		//             className='w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:border-emerald-500'
		//           />
		//         </div>
		//       </div>

		//       {/* Telefon va loyiha turi */}
		//       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
		//         <div>
		//           <label className='block mb-1 text-sm'>Telefon raqamingiz</label>
		//           <div className='flex items-center gap-2'>

		//             <input
		//               type='text'
		//               placeholder='Telefon raqam'
		//               value={phoneNumber}
		//               onChange={e => setPhoneNumber(e.target.value)}
		//               className='w-full p-3 rounded-r-lg bg-black text-white border border-gray-700 focus:outline-none focus:border-emerald-500'
		//             />
		//           </div>
		//         </div>
		//         <div>
		//           <label className='block mb-1 text-sm'>Loyiha turi</label>
		//           <select
		//             value={projectType}
		//             onChange={e =>
		//               setProjectType(e.target.value === '' ? '' : Number(e.target.value))
		//             }
		//             className='w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:border-emerald-500'
		//           >
		//             <option value=''>{t('service.selectProject')}</option>
		//             {services.map(service => (
		//               <option key={service.id} value={service.id}>
		//                 {service.title}
		//               </option>
		//             ))}
		//           </select>
		//         </div>
		//       </div>

		//       {/* Loyiha tavsifi */}
		//       <div>
		//         <label className='block mb-1 text-sm'>Loyiha tavsifi</label>
		//         <textarea
		//           placeholder='Loyihangiz haqida qisqacha yozing...'
		//           value={description}
		//           onChange={e => setDescription(e.target.value)}
		//           className='w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:border-emerald-500 h-28'
		//         />
		//       </div>

		//       {/* Tugma */}
		//       <div className='flex justify-end'>
		//         <button
		//           type='submit'
		//           disabled={loading}
		//           className='flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-md text-white transition disabled:opacity-50'
		//         >
		//           {loading ? 'Yuborilmoqda...' : 'Yuborish 🚀'}
		//         </button>
		//       </div>
		//     </form>
		//   </div>
		// </div>
	)
}
