'use client'
import Link from 'next/link'
import 'antd/dist/reset.css'
import React from 'react'
import Image from 'next/image'
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FaTelegram } from 'react-icons/fa6'
import StarShower from './star-shower'

export default function Footer() {
	return (
		<div className='w-full relative'>
			<div className='w-full md:p-2 p-5 overflow-hidden relative'>
				<div className='flex justify-between backdrop-blur-md text-white py-4 px-50 rounded-lg  relative z-10'>
					<div className='flex flex-col gap-3'>
						<Image
							src={'/assets/logo.png'}
							alt='logo'
							width={200}
							height={150}
						/>{' '}
						<br />
						<p className='text-sm text-gray-300'>
							SifatDev — innovatsion IT yechimlar va dasturiy ta’minot ishlab
							<br />
							chiqishda ishonchli hamkoringiz.
						</p>
					</div>
					<div>
						{' '}
						<br />
						<div>
							<h3 className='font-semibold text-lg'>Ijtimoiy tarmoqlar</h3>
							<div className='grid grid-cols-2 gap-2'>
								<Link
									href='#'
									className='flex gap-2  px-3 py-2 rounded-full bg-[#ffffff15] hover:bg-[#ffffff30] transition'
								>
									<FaInstagram size={18} />
									<span className='text-sm'>Instagram</span>
								</Link>

								<Link
									href='#'
									className='flex gap-2  px-3 py-2 rounded-full bg-[#ffffff15] hover:bg-[#ffffff30] transition'
								>
									<FaLinkedinIn size={18} />
									<span className='text-sm'>Linkedin</span>
								</Link>

								<Link
									href='#'
									className='flex gap-2  px-3 py-2 rounded-full bg-[#ffffff15] hover:bg-[#ffffff30] transition'
								>
									<FaTelegram size={18} />
									<span className='text-sm'>Telegram</span>
								</Link>

								<Link
									href='#'
									className='flex gap-2  px-3 py-2 rounded-full bg-[#ffffff15] hover:bg-[#ffffff30] transition'
								>
									<FaYoutube size={18} />
									<span className='text-sm'>Youtube</span>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className='absolute top-0 left-0 w-full h-full -z-10 blur-lg backdrop-blur-md rounded-lg overflow-hidden'>
					<Image
						src={'/assets/foo_back.png'}
						alt='image'
						width={1400}
						height={300}
						className='w-full h-full object-cover rounded-lg'
					/>
				</div>

				{/* Stars Effect */}
				<div className='absolute bottom-0 left-0 w-full h-full z-[11] pointer-events-none'>
					<StarShower height={300} count={100} size={1.5} width={2000} />
				</div>
			</div>
		</div>
	)
}
