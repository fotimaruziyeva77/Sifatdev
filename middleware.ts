import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware({
	locales: ['uz', 'en', 'ru'],
	defaultLocale: 'uz',
})

export function middleware(req: NextRequest) {
	const intlResponse = intlMiddleware(req)

	const { pathname } = req.nextUrl

	const publicRoutes = [
		'/',
		'/:lng',
		'/:lng/about',
		'/:lng/service',
		'/:lng/project',
		'/:lng/project/:slug',
		'/:lng/blog/:slug',
		'/:lng/blog',
		'/:lng/team',
		'/:lng/contact',
		'/:lng/career',
		'/:lng/career/:slug',
		'/:lng/not-found',
	]

	const isPublic = publicRoutes.some(route => {
		const regex = new RegExp(`^${route.replace(/:\w+/g, '[^/]+')}$`)
		return regex.test(pathname)
	})

	// Locale va sahifa holatini tekshirish
	const locale = req.nextUrl.locale || 'uz'
	const isNotFoundPage = pathname === `/${locale}/not-found`

	if (!isPublic && !isNotFoundPage) {
		return NextResponse.redirect(new URL(`/${locale}/not-found`, req.url))
	}

	return intlResponse
}

export const config = {
	matcher: ['/((?!.*\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
