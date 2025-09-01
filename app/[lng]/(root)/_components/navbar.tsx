'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
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
		{ id: 5, href: `/${lng}/career`, label: t('navitem.career') },
		{ id: 4, href: `/${lng}/blog`, label: t('navitem.blog') },
	]

	return (
		<header className='w-full fixed top-0 left-0 z-50'>
			<div
				className='flex items-center justify-between md:justify-around px-8 py-4 
				bg-gradient-to-r from-[#0B192C]/95 to-[#0E223A]/95 backdrop-blur-md shadow-md'
			>
				{/* Logo */}
				<Link href={`/${lng}/`}>
					<Image
						src='/assets/logo.png'
						alt='Sifatdev'
						width={160}
						height={50}
						className='object-contain w-[160px] sm:w-[200px] h-auto'
					/>
				</Link>

				{/* Desktop menu */}
				<nav className='hidden md:flex gap-10 text-white text-[15px] font-semibold tracking-wide'>
					{NavItems.map(item => (
						<Link
							key={item.href}
							href={item.href}
							className='relative uppercase transition duration-300 hover:text-[#00CFFF]'
						>
							<span
								className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
								after:w-0 after:transition-all after:duration-300 hover:after:w-full after:bg-[#00CFFF]"
							>
								{item.label}
							</span>
						</Link>
					))}
				</nav>

				{/* Contact + Language (Desktop) */}
				<div className='hidden md:flex items-center gap-6'>
					<Link
						href='tel:+998712007007'
						className='text-gray-300 text-[16px] font-bold'
					>
						<span className='text-blue-200'>+998 88</span>{' '}
						<span className='text-white font-extrabold'>378 08 08</span>
					</Link>

					{/* Language button */}
					<div
						className='border border-gray-500 rounded flex items-center gap-1 
					text-white text-sm transition-all duration-300'
					>
						<LanguageDropdown />
					</div>
				</div>

				{/* Mobile button + Language */}
				<div className='md:hidden flex items-center gap-3'>
					{/* LanguageDropdown mobil uchun */}
					<div className='border border-gray-500 rounded text-white text-sm px-2 py-1'>
						<LanguageDropdown />
					</div>

					{/* Menu button */}
					<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
						{isMobileMenuOpen ? (
							<X className='text-white w-7 h-7' />
						) : (
							<Menu className='text-white w-7 h-7' />
						)}
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			<div
				className={`fixed top-0 right-0 h-full w-82 bg-[#0B192C] text-white p-6 flex flex-col gap-6 
				shadow-lg transform transition-all duration-300 ease-in-out md:hidden 
				${
					isMobileMenuOpen
						? 'translate-x-0 opacity-100'
						: 'translate-x-full opacity-0'
				}`}
			>
				<div className='flex justify-between items-center'>
					<span className='text-lg font-semibold'>Sifatdev</span>
					<button onClick={() => setIsMobileMenuOpen(false)}>
						<X className='w-6 h-6' />
					</button>
				</div>

				{NavItems.map(item => (
					<Link
						key={item.href}
						href={item.href}
						onClick={() => setIsMobileMenuOpen(false)}
						className='relative inline-block uppercase font-medium transition duration-300 hover:text-[#00CFFF]'
					>
						{item.label}
					</Link>
				))}

				{/* Mobile contact */}
				<Link
					href='tel:+998712007007'
					className='mt-4 inline-block text-[16px] font-bold'
				>
					<span className='text-[#00CFFF]'>+998 71</span>{' '}
					<span className='text-white font-extrabold'>200 70 07</span>
				</Link>
			</div>
		</header>
	)
}
