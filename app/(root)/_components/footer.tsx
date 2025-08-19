'use client'
import Link from 'next/link'
import 'antd/dist/reset.css'
import React from 'react'
import Image from 'next/image'

export default function Footer() {
	return (
		<footer className='from-[#0B192C] to-[#0B192C] shadow-md text-white pt-12 h-54'>
			<div className='relative  overflow-hidden z-10'>
				{/* Background shapes */}
				<div className='absolute -top-24 -left-20 w-[730px] h-[765px] rounded-full bg-gradient-to-tr from-blue-700 to-cyan-700 opacity-40 blur-[120px] -z-10'></div>

				<div className='absolute -bottom-64 left-[600px] w-[730px] h-[765px] rounded-full bg-gradient-to-br from-blue-500 to-blue-500 opacity-40 blur-[120px] -z-10'></div>

				<div className='absolute -top-24 right-64 w-[730px] h-[765px] rounded-full bg-gradient-to-tl from-blue-400 to-cyan-400 opacity-40 blur-[120px] -z-10'></div>

				<div className='bg-white/5  p-10'>
					<div className='mb-12'>
						<Link href='/'>
							<Image
								src='/assets/logo.png'
								alt='Logo'
								width={180}
								height={50}
								className='w-auto h-auto'
							/>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
