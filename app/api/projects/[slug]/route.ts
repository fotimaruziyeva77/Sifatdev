import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Project from '@/models/project.model'
import { NextResponse } from 'next/server'
import Category from '@/models/category.model'
import Technology from '@/models/technology.model'

// GET single project by slug
export async function GET(
	_: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		await dbConnect()
		const project = await Project.findOne({ slug: params.slug })
			.populate('category', 'title')
			.populate('technologies', 'name')
			.lean()

		if (!project)
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)
		return NextResponse.json({ success: true, data: project })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// UPDATE (PUT)
export async function PUT(
	req: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		await dbConnect()
		const user = await verifyJwt(req)
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)
		}

		const body = await req.json()
		const updated = await Project.findOneAndUpdate(
			{ slug: params.slug },
			body,
			{ new: true }
		)
			.populate('category', 'title')
			.populate('technologies', 'name')

		if (!updated)
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)
		return NextResponse.json({ success: true, data: updated })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// PATCH
export async function PATCH(
	req: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		await dbConnect()
		const user = await verifyJwt(req)
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)
		}

		const body = await req.json()
		const updated = await Project.findOneAndUpdate(
			{ slug: params.slug },
			{ $set: body },
			{ new: true }
		)
			.populate('category', 'title')
			.populate('technologies', 'name')

		if (!updated)
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)
		return NextResponse.json({ success: true, data: updated })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// DELETE
export async function DELETE(
	_: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		await dbConnect()
		const user = await verifyJwt(_)
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)
		}

		const deleted = await Project.findOneAndDelete({ slug: params.slug })
		if (!deleted)
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)
		return NextResponse.json({ success: true, message: 'Deleted successfully' })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
