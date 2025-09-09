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
	const isAdminPage = pathname.includes('/admin')

	const hideLayout = isNotFoundPage || isAdminPage

	return (
		<>
			{!hideLayout && <Navbar />}
			<Toaster />
			<main className='overflow-x-hidden'>{children}</main>
			{!hideLayout && <Footer />}
		</>
	)
}
