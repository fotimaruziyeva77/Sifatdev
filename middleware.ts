import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'

const intlMiddleware = createMiddleware({
	locales: ['uz', 'en', 'ru'],
	defaultLocale: 'uz',
})

export async function middleware(req: NextRequest) {
	const intlResponse = intlMiddleware(req)
	const locale = req.nextUrl.locale || 'uz'
	const { pathname } = req.nextUrl

	const isAdminRoute = pathname.startsWith(`/${locale}/admin`)
	const isAuthPage = pathname === `/${locale}/admin/auth`

	// ADMIN ROUTES (protected)
	if (isAdminRoute && !isAuthPage) {
		const cookie = req.cookies.get('token')?.value

		if (!cookie) {
			return NextResponse.redirect(new URL(`/${locale}/admin/auth`, req.url))
		}

		try {
			const secret = new TextEncoder().encode(process.env.JWT_SECRET)
			await jose.jwtVerify(cookie, secret) // ✅ edge runtime-friendly
		} catch (err) {
			console.error('❌ JWT verify error:', (err as Error).message)
			return NextResponse.redirect(new URL(`/${locale}/admin/auth`, req.url))
		}

		return intlResponse // token to‘g‘ri → ruxsat
	}

	// PUBLIC ROUTES
	const publicRoutes = [
		'/',
		'/:lng',
		'/:lng/about',
		'/:lng/service',
		'/:lng/service/:id',
		'/:lng/project',
		'/:lng/project/:slug',
		'/:lng/blog',
		'/:lng/blog/:slug',
		'/:lng/team',
		'/:lng/contact',
		'/:lng/career',
		'/:lng/career/:slug',
		'/:lng/not-found',
		'/:lng/admin/auth', // faqat login sahifa ochiq
	]

	const isPublic = publicRoutes.some(route => {
		const regex = new RegExp(`^${route.replace(/:\w+/g, '[^/]+')}$`)
		return regex.test(pathname)
	})

	const isNotFoundPage = pathname === `/${locale}/not-found`

	if (!isPublic && !isNotFoundPage) {
		return NextResponse.redirect(new URL(`/${locale}/not-found`, req.url))
	}

	return intlResponse
}

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)', '/'],
}
