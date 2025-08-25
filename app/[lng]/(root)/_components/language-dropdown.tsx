'use client'

import { useEffect, useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { langs } from '@/constants'

function LanguageDropdown() {
	const [mounted, setMounted] = useState(false)
	const { lng } = useParams()
	const pathname = usePathname()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='!outline-none'>
				<button
					className='btn-i-primary rounded-full py-1 px-2 flex items-center justify-center'
					aria-label='Globe'
				>
					<Image
						src={`/assets/locales/${lng}.png`}
						alt={'lng'}
						width={30}
						height={30}
					/>
					<span className='ml-2 uppercase font-semibold text-base text-white'>
						{lng === 'uz' && "O'z"}
						{lng === 'en' && 'En'}
						{lng === 'ru' && 'Ру'}
					</span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='dark:bg-[#0B192C] bg-white border-none'>
				{langs.map(item => (
					<Link
						key={item.route}
						href={`/${item.route}${pathname.replace(/^\/[^/]+/, '')}`}
					>
						<DropdownMenuItem
							className={cn(
								'cursor-pointer flex items-center px-2 py-1.5 rounded-md transition-colors',
								'hover:bg-red-500 hover:text-white',
								'dark:hover:bg-gray-700',
								lng === item.route &&
									' bg-gray-200 font-semibold hover:text-white'
							)}
						>
							<Image
								src={`/assets/${item.route}.png`}
								alt={item.label}
								width={30}
								height={30}
							/>
							<span className='ml-2'>{item.label}</span>
						</DropdownMenuItem>
					</Link>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default LanguageDropdown
