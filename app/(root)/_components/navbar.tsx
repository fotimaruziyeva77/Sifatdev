'use client'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import Image from 'next/image'

import { useState } from 'react'

import LanguageDropdown from './language-dropdown'

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const NavItems = [
		{ id: 1, href: '/', label: 'Bosh sahifa' },
		{ id: 2, href: '/about', label: 'Biz haqimizda' },
		{ id: 3, href: '/service', label: 'Xizmatlarimiz' },
		{ id: 4, href: '/team', label: 'Jamoamiz' },
		{ id: 5, href: '/blog', label: 'Maqolalar' },
		{ id: 6, href: '/contact', label: 'Aloqa' },
	]

	return (
		<header className='w-full fixed top-0 left-0 z-50'>
			<div
				className='flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0B192C] to-[#0B192C] 
    '
			>
				<Link href='/'>
					<Image
						src='/assets/logo.png'
						alt='Sifatdev dark'
						width={106}
						height={16}
						className='object-contain w-[160px] h-auto sm:w-[200px] '
					/>
				</Link>

				<nav className='hidden md:flex gap-8 text-white text-[18px] font-medium'>
					<div className='flex items-center gap-6 text-white '>
						{NavItems.map(item => (
							<Link
								key={item.href}
								href={item.href}
								className='relative inline-block transition duration-300 
                 hover:text-blue-500 dark:hover:text-[#FFD25D]'
							>
								<span
									className="
          after:content-['']
          after:absolute
          after:left-0
          after:-bottom-1
          after:h-[2px]
          after:w-0
          after:transition-all
          after:duration-300
          hover:after:w-full
          after:bg-blue-500
        "
								>
									{item.label}
								</span>
							</Link>
						))}
					</div>
				</nav>
				<div className='flex items-center gap-3'>
					<LanguageDropdown />
					<div className='hidden md:block relative max-w-xs'>
						<input
							type='text'
							placeholder='Qidirish...'
							className='w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
						/>
						<svg
							className='absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							/>
						</svg>
					</div>{' '}
					<div className='md:hidden'>
						<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
							<Menu className='text-white' />
						</button>
					</div>
				</div>
			</div>
			{isMobileMenuOpen && (
				<nav className='md:hidden bg-[#0B192C] text-white flex flex-col gap-4 p-4 text-base font-medium'>
					{NavItems.map(item => (
						<Link
							key={item.href}
							href={item.href}
							onClick={() => setIsMobileMenuOpen(false)}
							className='hover:text-[#FFD25D]'
						>
							{item.label}
						</Link>
					))}
				</nav>
			)}
		</header>
	)
}
