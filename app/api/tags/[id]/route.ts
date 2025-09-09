import { NextResponse } from 'next/server'
import { verifyJwt } from '@/lib/jwt'
import dbConnect from '@/lib/db'
import Tag from '@/models/tag.model'

export async function GET(_: Request, { params }: { params: { id: string } }) {
	await dbConnect()
	try {
		const tag = await Tag.findById(params.id)
		if (!tag)
			return NextResponse.json(
				{ success: false, error: 'Tag not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, data: tag })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}

// PUT
export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect()
	const user = await verifyJwt(req)
	if (!user)
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)

	try {
		const body = await req.json()
		const tag = await Tag.findByIdAndUpdate(params.id, body, { new: true })
		if (!tag)
			return NextResponse.json(
				{ success: false, error: 'Tag not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, data: tag })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}

// Patch
export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect()
	const user = await verifyJwt(req)
	if (!user)
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)

	try {
		const body = await req.json()
		const tag = await Tag.findByIdAndUpdate(
			params.id,
			{ $set: body },
			{ new: true }
		)
		if (!tag)
			return NextResponse.json(
				{ success: false, error: 'Tag not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, data: tag })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}

// Delete
export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect()
	const user = await verifyJwt(_)
	if (!user)
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)

	try {
		const tag = await Tag.findByIdAndDelete(params.id)
		if (!tag)
			return NextResponse.json(
				{ success: false, error: 'Tag not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, message: 'Tag deleted' })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}
