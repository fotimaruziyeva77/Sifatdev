'use client'

import { usePathname } from 'next/navigation'
import { Toaster } from 'sonner'
import { ReactNode } from 'react'
import Navbar from './navbar'
import Footer from './footer'

interface Props {
	children: ReactNode
}

export default function LayoutWrapper({ children }: Props) {
	const pathname = usePathname()
	const isNotFoundPage = pathname === '/not-found'

	return (
		<>
			{!isNotFoundPage && <Navbar />}
			<Toaster />
			<main className='overflow-x-hidden'>{children}</main>
			{!isNotFoundPage && <Footer />}
		</>
	)
}
