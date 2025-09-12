import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Project from '@/models/project.model'
import { NextResponse } from 'next/server'

// GET single project by slug
export async function GET(
	_: Request,
	context: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await context.params
		await dbConnect()

		const project = await Project.findOne({ slug })
			.populate('category', 'title')
			.populate('technologies', 'name')
			.lean()

		if (!project) {
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)
		}
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
	context: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await context.params
		await dbConnect()

		const user = await verifyJwt(req)
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)
		}

		const body = await req.json()
		const updated = await Project.findOneAndUpdate({ slug }, body, {
			new: true,
		})
			.populate('category', 'title')
			.populate('technologies', 'name')

		if (!updated) {
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)
		}
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
	context: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await context.params
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
			{ slug },
			{ $set: body },
			{ new: true }
		)
			.populate('category', 'title')
			.populate('technologies', 'name')

		if (!updated) {
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)
		}
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
	req: Request,
	context: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await context.params
		await dbConnect()

		const user = await verifyJwt(req)
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)
		}

		const deleted = await Project.findOneAndDelete({ slug })
		if (!deleted) {
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json({
			success: true,
			message: 'Deleted successfully',
		})
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
