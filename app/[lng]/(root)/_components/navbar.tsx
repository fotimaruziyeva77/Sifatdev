'use client'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import Image from 'next/image'

import { useState } from 'react'

import LanguageDropdown from './language-dropdown'
import useTranslate from '@/hooks/use-translate'
import { useParams } from 'next/navigation'

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const t = useTranslate()
	const { lng } = useParams()
	const NavItems = [
		{ id: 1, href: `/${lng}/about`, label: t('navitem.about') },
		{ id: 2, href: `/${lng}/service`, label: t('navitem.service') },
		{ id: 6, href: `/${lng}/project`, label: t('navitem.portfolio') },
		{ id: 3, href: `/${lng}/team`, label: t('navitem.team') },
		{ id: 4, href: `/${lng}/blog`, label: t('navitem.blog') },
		{ id: 5, href: `/${lng}/contact`, label: t('navitem.contact') },
	]

	return (
		<header className='w-full fixed top-0 left-0 z-50'>
			<div
				className='flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0B192C] to-[#0B192C] 
    '
			>
				<Link href={`/${lng}/`}>
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

				<LanguageDropdown />

				<div className='md:hidden'>
					<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
						<Menu className='text-white' />
					</button>
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
