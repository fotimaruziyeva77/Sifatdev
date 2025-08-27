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
import Link from 'next/link'
import { motion } from 'motion/react'
import useTranslate from '@/hooks/use-translate'



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
	const t=useTranslate()
	const contactSchema = z.object({
		fullName: z.string().min(3, t('notification.contactwarning.fullname')),
		phoneNumber: z
			.string()
			.regex(/^\+998[0-9]{9}$/, t('notification.contactwarning.phonenumber')),
		description: z.string().min(5, t('notification.contactwarning.message')),
	})
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
		<div className='mt-20 min-h-screen px-6 mb-10 text-white'>
			{/* Hero Section */}
			<div className='relative flex items-center justify-center h-40 sm:h-52 md:h-64 lg:h-72 overflow-hidden mt-16'>
				{/* Fon yozuvi */}
				<h1 className='absolute text-[40px] sm:text-[80px] md:text-[140px] lg:text-[180px] font-extrabold text-gray-700/10 select-none'>
					{t('navitem.contact')}
				</h1>

				{/* Asosiy title */}
				<motion.h1
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='relative text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold 
					bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 
					bg-clip-text text-transparent animate-gradient z-10 text-center px-2'
				>
					{t('navitem.contact')}
				</motion.h1>

				{/* Yulduzcha animatsiya */}
				<div className='absolute inset-0 z-[11] pointer-events-none'>
					<StarShower height={300} count={120} size={1.5} width={2000} />
				</div>
			</div>

			{/* Contact Section */}
			<section className='relative py-20 sm:py-28 bg-[#0b192c] text-white'>
				<div
					className='absolute left-0 right-0 bottom-0 h-[825px] bg-cover bg-bottom bg-no-repeat -z-10'
					style={{ backgroundImage: 'url(/images/contact-one-bg-shape.png)' }}
				></div>

				<div className='container mx-auto px-6 lg:px-8'>
					<div className='grid lg:grid-cols-2 gap-10'>
						{/* Left Form */}
						<div className='relative bg-[#38445A] rounded-2xl shadow-xl p-6 sm:p-8 overflow-hidden'>
							<h3 className='text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-10'>
							{t('contact.form.title')}
							</h3>

							<form className='space-y-6' onSubmit={handleSubmit}>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<InputField
										label={t('contact.form.fullname_label')}
										placeholder={t('contact.form.fullname_label')}
										icon={<User size={18} />}
										value={fullName}
										onChange={setFullName}
										error={errors.fullName}
									/>

									<InputField
										label={t('contact.form.phone_label')}
										placeholder={t('contact.form.phone_label')}
										icon={<Phone size={18} />}
										value={phoneNumber}
										onChange={setPhoneNumber}
										error={errors.phoneNumber}
										isPhone
									/>
								</div>

								<InputField
									label={t('contact.form.message_label')}
									placeholder={t('contact.form.message_placeholder')}
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
										className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold shadow-md transition text-white 
										${
											loading
												? 'bg-gray-500 cursor-not-allowed'
												: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90'
										}`}
									>
										{loading ?  t('contact.form.submitting')
										: t('contact.form.submit')}
									</button>
								</div>
							</form>
						</div>

						{/* Right Info */}
						<div className='text-white space-y-6 sm:space-y-8'>
							<div>
								<span className='text-sm uppercase tracking-wider text-blue-400'>
										{t('contact.info.title')}{' '}
								</span>
								<h2 className='text-2xl sm:text-3xl font-bold mt-2 leading-snug'>
									{t('contact.info.sub')}{' '}<br />
									<span className='text-blue-400'>
										{t('contact.info.subtitle')}{' '}
									</span>
								</h2>
							</div>
							<p className='text-gray-400 text-sm sm:text-base'>
								{t('contact.info.description')}{' '}
							</p>

							<ul className='mt-6 sm:mt-10 space-y-6 sm:space-y-8'>
								<li className='flex gap-4 items-start border-b border-gray-700 pb-6'>
									<div className='w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-600'>
										<MapPin className='text-white' size={22} />
									</div>
									<div>
										<h4 className='text-lg font-bold'>{t('contact.info.address_title')}</h4>
										<p className='text-gray-400'>
											{t('contact.info.address_value')}{' '}
										</p>
									</div>
								</li>

								<li className='flex gap-4 items-start border-b border-gray-700 pb-6'>
									<div className='w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-600'>
										<Mail className='text-white' size={22} />
									</div>
									<div>
										<h4 className='text-lg font-bold'>{t('contact.info.email_title')}</h4>
										<p>
											<Link
												href='mailto:info@sifatdev.uz'
												className='text-gray-400 hover:text-white'
											>
												info@sifatdev.uz
											</Link>
										</p>
									</div>
								</li>

								<li className='flex gap-4 items-start'>
									<div className='w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-600'>
										<Phone className='text-white' size={22} />
									</div>
									<div>
										<h4 className='text-lg font-bold'>{t('navitem.contact')}</h4>
										<p>
											<Link
												href='tel:+998883780808'
												className='text-gray-400 hover:text-white'
											>
												+998 88 378 08 08
											</Link>
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
