'use client'

import { Input } from '@/components/ui/input'
import { API_SERVICE } from '@/services/api-service'
import axios from 'axios'
import { Mail, Phone, MapPin, User, Edit } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import Link from 'next/link'
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

export default function ContactSection() {
	const [fullName, setFullName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<ContactErrors>({})
	const t = useTranslate()
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
		<section className='relative py-32 bg-[#0b192c] text-white'>
			{/* Background Shape */}
			<div
				className='absolute left-0 right-0 bottom-0 h-[825px] bg-cover bg-bottom bg-no-repeat -z-10'
				style={{ backgroundImage: 'url(/images/contact-one-bg-shape.png)' }}
			></div>

			<div className='container mx-auto px-6 lg:px-8'>
				<div className='grid lg:grid-cols-2 gap-10'>
					{/* Left Form */}
					<div className='relative bg-[#38445A] rounded-2xl shadow-xl p-8 overflow-hidden'>
						<h3 className='text-2xl font-bold text-white mb-10'>
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
									className={`px-6 py-3 rounded-xl font-semibold shadow-md transition text-white 
										${
											loading
												? 'bg-gray-500 cursor-not-allowed'
												: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90'
										}`}
								>
									{loading
										? t('contact.form.submitting')
										: t('contact.form.submit')}
								</button>
							</div>
						</form>
					</div>

					{/* Right Info */}
					<div className='text-white'>
						<div className='mb-6'>
							<span className='text-sm uppercase tracking-wider text-blue-400'>
								{t('contact.info.title')}{' '}
							</span>
							<h2 className='text-3xl font-bold mt-2 leading-snug'>
							{t('contact.info.sub')}{' '}  <br />{' '}
								<span className='text-blue-400'>
									{t('contact.info.subtitle')}{' '}
								</span>
							</h2>
						</div>
						<p className='text-gray-400'>
							{t('contact.info.description')}{' '}
						</p>

						<ul className='mt-10 space-y-8'>
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
									<h4 className='text-lg font-bold'>{t('contact.info.phone_title')}{' '}</h4>
									<p>
										{t('contact.info.phone')}{' '}:{' '}
										<Link
											href='tel:+998712345678'
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
	)
}
