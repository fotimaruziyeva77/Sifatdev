'use client'
import Link from 'next/link'
import { Home, User, Briefcase, FolderOpen, Newspaper, Rocket } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import LanguageDropdown from './language-dropdown'
import useTranslate from '@/hooks/use-translate'
import { useParams, usePathname } from 'next/navigation'

export default function Navbar() {
	const [activeTab, setActiveTab] = useState('')
	const t = useTranslate()
	const { lng } = useParams()
	const pathname = usePathname()

	// Set active tab based on current path
	useEffect(() => {
		const pathSegments = pathname.split('/')
		const currentPage = pathSegments[pathSegments.length - 1] || 'home'
		setActiveTab(currentPage)
	}, [pathname])

	const NavItems = [
		{ id: 0, href: `/${lng}/`, label: t('navitem.home'), icon: Home },
		{ id: 1, href: `/${lng}/about`, label: t('navitem.about'), icon: User },
		{ id: 2, href: `/${lng}/service`, label: t('navitem.service'), icon: Rocket },
		{ id: 6, href: `/${lng}/project`, label: t('navitem.portfolio'), icon: FolderOpen },
		{ id: 5, href: `/${lng}/career`, label: t('navitem.career'), icon: Briefcase },
		{ id: 4, href: `/${lng}/blog`, label: t('navitem.blog'), icon: Newspaper },
	]

	return (
		<>
			<header className='w-full fixed top-0 left-0 z-50'>
				<div
					className='flex items-center justify-between lg:justify-around px-4 sm:px-6 md:px-8 py-4 
					bg-gradient-to-r from-[#0B192C]/95 to-[#0E223A]/95 backdrop-blur-md shadow-md'
				>
					{/* Logo */}
					<Link href={`/${lng}/`}>
						<Image
							src='/assets/logo.png'
							alt='Sifatdev'
							width={140}
							height={45}
							className='object-contain w-[140px] sm:w-[160px] md:w-[180px] h-auto'
						/>
					</Link>

					{/* Desktop menu - now hidden on tablets too */}
					<nav className='hidden lg:flex gap-6 xl:gap-8 text-white text-[14px] xl:text-[15px] font-semibold tracking-wide'>
						{NavItems.filter(item => item.id !== 0).map(item => (
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
					<div className='hidden lg:flex items-center gap-4 xl:gap-6'>
						<Link
							href='tel:+998712007007'
							className='text-gray-300 text-[15px] xl:text-[16px] font-bold whitespace-nowrap'
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
					<div className='lg:hidden flex items-center gap-3'>
						{/* LanguageDropdown mobil uchun */}
						<div className='border border-gray-500 rounded text-white text-sm px-2 py-1'>
							<LanguageDropdown />
						</div>
					</div>
				</div>

				{/* Tablet menu - shown only on tablets (md to lg) */}
				<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B192C] border-t border-gray-700">
					<div className="flex justify-around items-center py-2 px-1">
						{NavItems.filter(item => item.id <= 6).map(item => {
							const IconComponent = item.icon;
							const isActive = activeTab === item.href.split('/').pop() || (item.id === 0 && activeTab === lng);
							
							return (
								<Link
									key={item.id}
									href={item.href}
									className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all min-w-[60px] ${isActive ? 'text-[#00CFFF] bg-[#0E223A]' : 'text-gray-400'}`}
									onClick={() => setActiveTab(item.href.split('/').pop() || 'home')}
								>
									<IconComponent className="w-5 h-5 mb-1" />
									<span className="text-xs text-center leading-tight">{item.label}</span>
								</Link>
							);
						})}
					</div>
				</div>
			</header>

			{/* Add padding to content to account for fixed navbar and tab bar */}
			<div className="pt-20 pb-16 lg:pb-0"></div>
		</>
	)
}