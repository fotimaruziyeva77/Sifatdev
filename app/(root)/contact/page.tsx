import { Edit, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'
import StarShower from '../_components/star-shower'

function Contact() {
	return (
		<div className='mt-20 min-h-screen px-6 mb-10'>
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

				<div className='container mx-auto px-6 lg:px-8 mt-20'>
					<div className='grid lg:grid-cols-2 gap-10'>
						<div className='relative bg-[#38445A] rounded-2xl shadow-xl p-8 overflow-hidden'>
							<h3 className='text-2xl font-bold text-white mb-10'>
								How Can We Help You?
							</h3>

							<form className='space-y-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div>
										<h4 className='text-sm font-semibold text-gray-300 mb-2'>
											Full Name
										</h4>
										<div className='relative'>
											<input
												type='text'
												placeholder='Thomas Alison'
												className='w-full h-12 rounded-xl bg-transparent border border-gray-600 pl-4 pr-12 text-gray-300 placeholder-gray-500 outline-none focus:border-blue-400'
											/>
											<User
												className='absolute right-4 top-3 text-gray-400'
												size={18}
											/>
										</div>
									</div>

									<div>
										<h4 className='text-sm font-semibold text-gray-300 mb-2'>
											Phone Number
										</h4>
										<div className='relative'>
											<input
												type='text'
												placeholder='+12 (00) 123 4567 890'
												className='w-full h-12 rounded-xl bg-transparent border border-gray-600 pl-4 pr-12 text-gray-300 placeholder-gray-500 outline-none focus:border-blue-400'
											/>
											<Phone
												className='absolute right-4 top-3 text-gray-400'
												size={18}
											/>
										</div>
									</div>
								</div>

								{/* Message */}
								<div>
									<h4 className='text-sm font-semibold text-gray-300 mb-2'>
										Inquiry about
									</h4>
									<div className='relative'>
										<textarea
											placeholder='Write your message'
											className='w-full h-40 rounded-xl bg-transparent border border-gray-600 pl-4 pr-12 pt-3 text-gray-300 placeholder-gray-500 outline-none focus:border-blue-400'
										/>
										<Edit
											className='absolute right-4 top-4 text-gray-400'
											size={18}
										/>
									</div>
								</div>

								{/* Button */}
								<div>
									<button
										type='submit'
										className='px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-500 text-white  font-semibold shadow-md hover:opacity-90 transition'
									>
										Submit Now
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
								Were here to listen! Whether you have questions, feedback, or
								just want to say hello, feel free to reach out.
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
