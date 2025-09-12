import { NextRequest, NextResponse } from 'next/server'
import { verifyJwt } from '@/lib/jwt'
import dbConnect from '@/lib/db'
import Blog from '@/models/blog.model'

// GET blog by slug
export async function GET(
	_: NextRequest,
	context: { params: Promise<{ slug: string }> }
) {
	const { slug } = await context.params
	await dbConnect()

	const blog = await Blog.findOne({ slug }).populate('tags', 'name')
	if (!blog) {
		return NextResponse.json(
			{ success: false, error: 'Blog not found' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ success: true, data: blog })
}

// Update (PUT)
export async function PUT(
	req: NextRequest,
	context: { params: Promise<{ slug: string }> }
) {
	const { slug } = await context.params
	await dbConnect()

	const user = await verifyJwt(req)
	if (!user) {
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)
	}

	try {
		const body = await req.json()
		const blog = await Blog.findOneAndUpdate({ slug }, body, { new: true })
		if (!blog) {
			return NextResponse.json(
				{ success: false, error: 'Blog not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json({ success: true, data: blog })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}

// Partial update (PATCH)
export async function PATCH(
	req: NextRequest,
	context: { params: Promise<{ slug: string }> }
) {
	const { slug } = await context.params
	await dbConnect()

	const user = await verifyJwt(req)
	if (!user) {
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)
	}

	try {
		const body = await req.json()
		const blog = await Blog.findOneAndUpdate(
			{ slug },
			{ $set: body },
			{ new: true }
		)
		if (!blog) {
			return NextResponse.json(
				{ success: false, error: 'Blog not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json({ success: true, data: blog })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}

// Delete blog
export async function DELETE(
	req: NextRequest,
	context: { params: Promise<{ slug: string }> }
) {
	const { slug } = await context.params
	await dbConnect()

	const user = await verifyJwt(req)
	if (!user) {
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)
	}

	try {
		const blog = await Blog.findOneAndDelete({ slug })
		if (!blog) {
			return NextResponse.json(
				{ success: false, error: 'Blog not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json({ success: true, message: 'Blog deleted' })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}
