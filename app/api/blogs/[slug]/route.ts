import { NextResponse } from 'next/server'
import { verifyJwt } from '@/lib/jwt'
import dbConnect from '@/lib/db'
import Blog from '@/models/blog.model'

export async function GET(_: Request, context: { params: { slug: string } }) {
	const { slug } = context.params
	await dbConnect()
	const blog = await Blog.findOne({ slug: slug }).populate('tags', 'name')
	if (!blog) {
		return NextResponse.json(
			{ success: false, error: 'Blog not found' },
			{ status: 404 }
		)
	}
	return NextResponse.json({ success: true, data: blog })
}

// Update (PUT)
export async function PUT(req: Request, context: { params: { slug: string } }) {
	const { slug } = context.params
	await dbConnect()
	const user = await verifyJwt(req)
	if (!user)
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)

	try {
		const body = await req.json()
		const blog = await Blog.findOneAndUpdate({ slug: slug }, body, {
			new: true,
		})
		if (!blog)
			return NextResponse.json(
				{ success: false, error: 'Blog not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, data: blog })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}

// (PATCH)
export async function PATCH(
	req: Request,
	context: { params: { slug: string } }
) {
	const { slug } = context.params
	await dbConnect()
	const user = await verifyJwt(req)
	if (!user)
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)

	try {
		const body = await req.json()
		const blog = await Blog.findOneAndUpdate(
			{ slug: slug },
			{ $set: body },
			{ new: true }
		)
		if (!blog)
			return NextResponse.json(
				{ success: false, error: 'Blog not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, data: blog })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}

//  Delete blog
export async function DELETE(
	_: Request,
	context: { params: { slug: string } }
) {
	const { slug } = context.params
	await dbConnect()
	const user = await verifyJwt(_)
	if (!user)
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)

	try {
		const blog = await Blog.findOneAndDelete({ slug: slug })
		if (!blog)
			return NextResponse.json(
				{ success: false, error: 'Blog not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, message: 'Blog deleted' })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}
