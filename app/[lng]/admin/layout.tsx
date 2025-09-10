'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import NextTopLoader from 'nextjs-toploader'
import {
	CardSim,
	Cog,
	FolderGit2,
	LayoutDashboard,
	PencilRuler,
	Rss,
	TicketsPlane,
} from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname()

	if (pathname.endsWith('/admin/auth')) {
		return <>{children}</>
	}

	const links = [
		{ href: '/uz/admin', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/uz/admin/projects', label: 'Projects', icon: FolderGit2 },
		{ href: '/uz/admin/vacancies', label: 'Vacancies', icon: TicketsPlane },
		{ href: '/uz/admin/blogs', label: 'Blogs', icon: Rss },
		{ href: '/uz/admin/services', label: 'Services', icon: CardSim },
		{ href: '/uz/admin/utils', label: 'Utils', icon: Cog },
		{ href: '/uz/admin/constructor', label: 'Constructor', icon: PencilRuler },
	]

	const handleLogOut = async () => {
		await fetch('/api/logout', { method: 'POST' })
		window.location.href = '/uz/admin/auth'
	}

	return (
		<div className='flex h-screen' suppressHydrationWarning>
			<NextTopLoader showSpinner={false} />
			<aside className='w-64 bg-gray-900 text-white flex flex-col'>
				<div className='p-4 text-2xl font-bold border-b border-gray-700'>
					Sifatdev Admin
				</div>
				<nav className='flex-1 p-4 space-y-2'>
					{links.map(link => (
						<Link
							key={link.href}
							href={link.href}
							className={`rounded px-3 py-2 transition flex items-center gap-1 ${
								pathname === link.href
									? 'bg-gray-700 font-semibold'
									: 'hover:bg-gray-800'
							}`}
						>
							<link.icon size={18} />
							{link.label}
						</Link>
					))}
				</nav>
			</aside>

			<main className='flex-1 bg-gray-50 overflow-y-auto'>
				<header className='bg-white shadow p-4 flex justify-between items-center'>
					<h1 className='text-xl font-semibold'>Admin Dashboard</h1>
					<button
						className='px-4 py-2 bg-red-500 !text-white rounded cursor-pointer'
						onClick={handleLogOut}
					>
						Logout
					</button>
				</header>
				<div>{children}</div>
			</main>
		</div>
	)
}
