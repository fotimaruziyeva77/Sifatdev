import Image from 'next/image'
import React from 'react'

function subscribe() {
	return (
		<div className='relative bg-[#131C30] overflow-hidden z-10'>
				<div className='absolute top-5 left-0 opacity-20 mix-blend-screen animate-pulse z-0'>
					<Image
						src='/icons/newsletter-two-shape-1.png'
						alt='shape-1'
						width={400}
						height={400}
						className='w-auto h-auto'
					/>
				</div>
				
				<div className='absolute top-5 -right-10 opacity-20 mix-blend-screen animate-pulse z-0'>
					<Image
						src='/icons/newsletter-two-shape-2.png'
						alt='shape-2'
						width={400}
						height={400}
						className='w-auto h-auto'
					/>
				</div>

				<div className='container mx-auto px-6 relative z-10'>
					<div className='flex flex-col lg:flex-row items-center justify-between py-16 gap-8'>
						{/* Left */}
						<div className='max-w-xl'>
							<h2 className='text-4xl font-medium bg-gradient-to-r from-[#FA5674] to-[#6065D4] bg-clip-text text-transparent'>
								Subscribe to Our Newsletter
							</h2>
							<p className='text-base text-white mt-3'>
								Get the latest SEO tips and software insights straight to your
								inbox.
							</p>
						</div>

						{/* Right */}
						<div className='w-full max-w-lg'>
							<form className='relative'>
								<input
									type='email'
									placeholder='Enter email address'
									className='w-full h-[60px] px-6 pr-44 rounded-2xl bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none'
								/>
								<button
									type='submit'
									className='absolute top-[6px] right-[6px] h-[48px] px-6 rounded-xl bg-gradient-to-r from-[#FA5674] to-[#6065D4] text-white font-medium hover:opacity-90 transition'
								>
									Subscribe Now →
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
	)
}

export default subscribe