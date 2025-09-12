import { NextResponse } from 'next/server'
import { verifyJwt } from '@/lib/jwt'
import dbConnect from '@/lib/db'
import Tag from '@/models/tag.model'

// GET by ID
export async function GET(
	_: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect()
		const { id } = await context.params

		const tag = await Tag.findById(id).lean()
		if (!tag)
			return NextResponse.json(
				{ success: false, error: 'Tag not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, data: tag })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// PUT (replace)
export async function PUT(
	req: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect()
		const { id } = await context.params

		const user = await verifyJwt(req)
		if (!user)
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)

		const body = await req.json()
		const tag = await Tag.findByIdAndUpdate(id, body, { new: true })
		if (!tag)
			return NextResponse.json(
				{ success: false, error: 'Tag not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, data: tag })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// PATCH (update)
export async function PATCH(
	req: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect()
		const { id } = await context.params

		const user = await verifyJwt(req)
		if (!user)
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)

		const body = await req.json()
		const tag = await Tag.findByIdAndUpdate(id, { $set: body }, { new: true })
		if (!tag)
			return NextResponse.json(
				{ success: false, error: 'Tag not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, data: tag })
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
	context: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect()
		const { id } = await context.params

		const user = await verifyJwt(_)
		if (!user)
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)

		const tag = await Tag.findByIdAndDelete(id)
		if (!tag)
			return NextResponse.json(
				{ success: false, error: 'Tag not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, message: 'Tag deleted' })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
