'use client'
import Link from 'next/link'
import 'antd/dist/reset.css'
import React from 'react'
import Image from 'next/image'
import { FaBehance, FaDribbble, FaStar } from 'react-icons/fa'
import { FaTelegram, FaXTwitter } from 'react-icons/fa6'
// import StarShower from './star-shower'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import StarShower from './star-shower'
import useTranslate from '@/hooks/use-translate'

export default function Footer() {
	const t = useTranslate()
	return (
		<footer className=' text-gray-300 w-full relative'>
			<div className='container mx-auto px-6 py-10 flex flex-col gap-8'>
				{/* Menu Links */}

				<div className='flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-700 pb-6'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-4 text-sm'>
						<div className='flex flex-col gap-3'>
							<Image
								src={'/assets/logo.png'}
								alt='logo'
								width={200}
								height={150}
							/>{' '}
							<br />
							<p className='text-sm text-gray-300'>
								{t('footer.title')}
								<br />
								{t('footer.activetitle')}
							</p>
						</div>
					</div>

					{/* Contact */}
					<div className='flex flex-col sm:flex-row items-center gap-4 text-sm'>
						<div className='flex gap-4 text-lg'>
							<Link
								href='#'
								className='p-2 rounded-full border border-gray-500 hover:border-white hover:text-white'
							>
								<Facebook size={16} />
							</Link>
							<Link
								href='#'
								className='p-2 rounded-full border border-gray-500 hover:border-white hover:text-white'
							>
								<FaXTwitter size={16} />
							</Link>
							<Link
								href='#'
								className='p-2 rounded-full border border-gray-500 hover:border-white hover:text-white'
							>
								<Instagram size={16} />
							</Link>
							<Link
								href='#'
								className='p-2 rounded-full border border-gray-500 hover:border-white hover:text-white'
							>
								<FaTelegram size={16} />
							</Link>
							<Link
								href='#'
								className='p-2 rounded-full border border-gray-500 hover:border-white hover:text-white'
							>
								<Linkedin size={16} />
							</Link>
							<Link
								href='#'
								className='p-2 rounded-full border border-gray-500 hover:border-white hover:text-white'
							>
								<FaBehance size={16} />
							</Link>
							<Link
								href='#'
								className='p-2 rounded-full border border-gray-500 hover:border-white hover:text-white'
							>
								<FaDribbble size={16} />
							</Link>
							<Link
								href='#'
								className='p-2 rounded-full border border-gray-500 hover:border-white hover:text-white'
							>
								<FaStar size={16} />
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='absolute top-0 left-0 w-full h-full -z-10 blur-lg backdrop-blur-md rounded-lg overflow-hidden'>
				{' '}
				<Image
					src={'/assets/foo_back.png'}
					alt='image'
					width={1400}
					height={300}
					className='w-full h-full object-cover rounded-lg'
				/>{' '}
			</div>{' '}
			<div className='absolute bottom-0 left-0 w-full h-full z-[11] pointer-events-none'>
				<StarShower height={300} count={100} size={1.5} width={2000} />{' '}
			</div>
		</footer>
	)
}
