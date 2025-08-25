'use client'
import { Edit, Mail, MapPin, Phone, User } from 'lucide-react'
import React, { useState } from 'react'
import StarShower from '../_components/star-shower'
import { toast } from 'sonner'
import axios from 'axios'
import { API_SERVICE } from '@/services/api-service'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
const contactSchema = z.object({
	fullName: z.string().min(3, "Ism kamida 3 ta belgidan iborat bo'lishi kerak"),
	phoneNumber: z
		.string()
		.regex(/^\+998[0-9]{9}$/, 'Telefon raqam noto‘g‘ri kiritildi'),
	description: z
		.string()
		.min(5, 'Xabar kamida 5 ta belgidan iborat bo‘lishi kerak'),
})

type ContactErrors = {
	fullName?: string
	phoneNumber?: string
	description?: string
}

type InputFieldProps = {
	label: string
	placeholder?: string
	icon?: React.ReactNode
	value: string
	onChange: (val: string) => void
	error?: string
	isPhone?: boolean
	isTextarea?: boolean
}

function InputField({
	label,
	placeholder,
	icon,
	value,
	onChange,
	error,
	isPhone = false,
	isTextarea = false,
}: InputFieldProps) {
	return (
		<div>
			<h4 className='text-sm font-semibold text-gray-300 mb-2'>{label}</h4>
			<div className='relative'>
				{isPhone ? (
					<PhoneInput
						defaultCountry='uz'
						value={value}
						onChange={onChange}
						hideDropdown
						inputProps={{
							placeholder,
							className: `w-full h-12 rounded-xl bg-transparent border pl-4 pr-12 text-gray-300 placeholder-gray-500 outline-none 
									${
										error
											? 'border-red-500 focus:border-red-500'
											: 'border-gray-600 focus:border-blue-400'
									}`,
						}}
					/>
				) : isTextarea ? (
					<textarea
						placeholder={placeholder}
						className={`w-full h-40 rounded-xl bg-transparent border pl-4 pr-12 pt-3 text-gray-300 placeholder-gray-500 outline-none
								${
									error
										? 'border-red-500 focus:border-red-500'
										: 'border-gray-600 focus:border-blue-400'
								}`}
						value={value}
						onChange={e => onChange(e.target.value)}
					/>
				) : (
					<Input
						type='text'
						placeholder={placeholder}
						className={`w-full h-12 rounded-xl bg-transparent border pl-4 pr-12 text-gray-300 placeholder-gray-400 
								${
									error
										? 'border-red-500 focus:border-red-500'
										: 'border-gray-600 focus:border-blue-400'
								}`}
						value={value}
						onChange={e => onChange(e.target.value)}
					/>
				)}
				{icon && (
					<div className='absolute right-4 top-3 text-gray-400'>{icon}</div>
				)}
			</div>
			{error && <p className='text-red-400 text-sm mt-1'>{error}</p>}
		</div>
	)
}

function Contact() {
	const [fullName, setFullName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<ContactErrors>({})

	const resetData = () => {
		setFullName('')
		setPhoneNumber('')
		setDescription('')
		setErrors({})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const validation = contactSchema.safeParse({
			fullName,
			phoneNumber,
			description,
		})
		if (!validation.success) {
			const fieldErrors: ContactErrors = {}
			validation.error.issues.forEach(err => {
				const field = err.path[0] as keyof ContactErrors
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
			await axios.post(`${API_SERVICE.contact}`, {
				full_name: fullName,
				message: description,
				phone_number: phoneNumber,
			})
			toast.success('Xabarigiz adminnga yuborildi!', {
				position: 'top-center',
				richColors: true,
			})
			resetData()
		} catch (err) {
			toast.error('Xatolik yuz berdi, qaytadan urinib ko‘ring!', {
				position: 'top-center',
				richColors: true,
			})
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='mt-20 min-h-screen px-6 mb-10 text-white'>
			<section>
				<div className='relative flex items-center justify-center h-60 overflow-hidden'>
					<h1 className='absolute text-[210px] font-extrabold text-gray-700/20 select-none pt-20'>
						Aloqa
					</h1>
					<h1 className='relative text-4xl font-extrabold text-white z-10'>
						Aloqa
					</h1>
					<div className='absolute inset-0 z-[11] pointer-events-none'>
						<StarShower height={300} count={100} size={1.5} width={2000} />
					</div>
				</div>

				<div className='container mx-auto px-6 lg:px-8'>
					<div className='grid lg:grid-cols-2 gap-10'>
						{/* Left Form */}
						<div className='relative bg-[#38445A] rounded-2xl shadow-xl p-8 overflow-hidden'>
							<h3 className='text-2xl font-bold text-white mb-10'>
								How Can We Help You?
							</h3>

							<form className='space-y-6' onSubmit={handleSubmit}>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<InputField
										label='Full Name'
										placeholder='Thomas Alison'
										icon={<User size={18} />}
										value={fullName}
										onChange={setFullName}
										error={errors.fullName}
									/>

									<InputField
										label='Phone Number'
										placeholder='+998 90 123 45 67'
										icon={<Phone size={18} />}
										value={phoneNumber}
										onChange={setPhoneNumber}
										error={errors.phoneNumber}
										isPhone
									/>
								</div>

								<InputField
									label='Inquiry about'
									placeholder='Write your message'
									icon={<Edit size={18} />}
									value={description}
									onChange={setDescription}
									error={errors.description}
									isTextarea
								/>

								<div>
									<button
										type='submit'
										disabled={loading}
										className={`px-6 py-3 rounded-xl font-semibold shadow-md transition text-white 
														${
															loading
																? 'bg-gray-500 cursor-not-allowed'
																: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90'
														}`}
									>
										{loading ? 'Yuborilmoqda...' : 'Submit Now'}
									</button>
								</div>
							</form>
						</div>

						{/* Right Info */}
						<div className='text-white'>
							<div className='mb-6'>
								<span className='text-sm uppercase tracking-wider text-blue-400'>
									Get In Touch
								</span>
								<h2 className='text-3xl font-bold mt-2 leading-snug'>
									Start the Conversation – <br />{' '}
									<span className='text-blue-400'>Reach Out Anytime</span>
								</h2>
							</div>
							<p className='text-gray-400'>
								We&apos;re here to listen! Whether you have questions, feedback,
								or just want to say hello, feel free to reach out.
							</p>

							<ul className='mt-10 space-y-8'>
								<li className='flex gap-4 items-start border-b border-gray-700 pb-6'>
									<div className='w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-600'>
										<MapPin className='text-white' size={22} />
									</div>
									<div>
										<h4 className='text-lg font-bold'>Location</h4>
										<p className='text-gray-400'>
											1629 N. Dixie Avenue,
											<br />
											Kentucky, 42701
										</p>
									</div>
								</li>

								<li className='flex gap-4 items-start border-b border-gray-700 pb-6'>
									<div className='w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-600'>
										<Mail className='text-white' size={22} />
									</div>
									<div>
										<h4 className='text-lg font-bold'>Email Us</h4>
										<p>
											<a
												href='mailto:info@domain.com'
												className='text-gray-400 hover:text-white'
											>
												info@domain.com
											</a>
										</p>
										<p>
											<a
												href='mailto:support@domain.com'
												className='text-gray-400 hover:text-white'
											>
												support@domain.com
											</a>
										</p>
									</div>
								</li>

								<li className='flex gap-4 items-start'>
									<div className='w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-600'>
										<Phone className='text-white' size={22} />
									</div>
									<div>
										<h4 className='text-lg font-bold'>Contact</h4>
										<p>
											Tel:{' '}
											<a
												href='tel:1200456789000'
												className='text-gray-400 hover:text-white'
											>
												+12 (00) 456 7890 00
											</a>
										</p>
										<p>
											Mob:{' '}
											<a
												href='tel:9900567780'
												className='text-gray-400 hover:text-white'
											>
												+99 (00) 567 780
											</a>
										</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Contact
