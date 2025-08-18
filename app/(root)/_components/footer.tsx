'use client'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { QRCode, Space } from 'antd'
import 'antd/dist/reset.css'
import React from 'react'
import Image from 'next/image'

export default function Footer() {
	return (
		<footer className='from-[#0B192C] to-[#0B192C] shadow-md text-white pt-12'>
	<div className='relative bg-[#0B0C14] overflow-hidden z-10'>
				{/* Background shapes */}
				<div className='absolute -top-24 -left-20 w-[730px] h-[765px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(102,105,216,0.62),rgba(7,12,20,0))] opacity-40 blur-[120px] -z-10'></div>
				<div className='absolute -bottom-64 left-[600px] w-[730px] h-[765px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(216,102,195,0.62),rgba(7,12,20,0))] opacity-40 blur-[120px] -z-10'></div>
				<div className='absolute -top-24 right-64 w-[730px] h-[765px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(102,105,216,0.62),rgba(7,12,20,0))] opacity-40 blur-[120px] -z-10'></div>

				{/* Top */}
				<div className='py-12 relative z-10'>
					<div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
						{/* About */}
						<div className='bg-white/5 rounded-[40px] p-10'>
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

						{/* Pages */}
						<div>
							<h4 className='text-white text-xl font-semibold mb-6'>Pages</h4>
							<ul className='space-y-4 text-white'>
								{[
									['/', 'Home'],
									['/about', 'About Us'],
									['/pricing', 'Pricing'],
									['/portfolio', 'Portfolio'],
									['/blog', 'Blogs'],
									['/contact', 'Careers'],
								].map(([href, label]) => (
									<li key={href}>
										<Link
											href={href}
											className='flex items-center gap-2 hover:text-blue-400'
										>
											<span>➡️</span> {label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Support */}
						<div>
							<h4 className='text-white text-xl font-semibold mb-6'>Support</h4>
							<ul className='space-y-4 text-white'>
								{[
									['/terms', 'Terms & Condition'],
									['/faq', 'FAQs'],
									['/contact', 'Contact Us'],
									['/404', '404 Page'],
									['/contact', 'Live Chat'],
									['/services', 'Our Services'],
								].map(([href, label]) => (
									<li key={href}>
										<Link
											href={href}
											className='flex items-center gap-2 hover:text-blue-400'
										>
											<span>➡️</span> {label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Services */}
						<div>
							<h4 className='text-white text-xl font-semibold mb-6'>
								Our Services
							</h4>
							<ul className='space-y-4 text-white'>
								{[
									['/services', 'UI/UX Design'],
									['/about', 'Website Design'],
									['/pricing', 'Web Development'],
									['/about', 'Product Design'],
									['/blog', 'Online Branding'],
									['/contact', 'Personal Branding'],
								].map(([href, label]) => (
									<li key={href}>
										<Link
											href={href}
											className='flex items-center gap-2 hover:text-blue-400'
										>
											<span>➡️</span> {label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom */}
				<div className='border-t border-white/10'>
					<div className='max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row items-center justify-between gap-4'>
						<p className='text-white text-sm'>
							© Copyright 2025{' '}
							<Link href='#' className='text-blue-400 hover:underline'>
								techguru
							</Link>{' '}
							All rights reserved
						</p>
						<div className='flex items-center gap-4'>
							<h4 className='text-white text-sm'>Follow Us:</h4>
							<div className='flex gap-3 text-white text-lg'>
								<Link href='#'>
									<span>📘</span>
								</Link>
								<Link href='#'>
									<span>🎨</span>
								</Link>
								<Link href='#'>
									<span>💼</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
