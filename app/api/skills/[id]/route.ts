import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Skills from '@/models/skills.model'
import { NextResponse } from 'next/server'

// GET by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
	await dbConnect()
	try {
		const skills = await Skills.findById(params.id)
		if (!skills)
			return NextResponse.json(
				{ success: false, error: 'Tag not found' },
				{ status: 404 }
			)

		return NextResponse.json({
			success: true,
			data: skills,
		})
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}

//PUT
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
		const skills = await Skills.findByIdAndUpdate(params.id, body, {
			new: true,
		})
		if (!skills)
			return NextResponse.json(
				{ success: false, error: 'Skills not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, data: skills })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}

//PATCH
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
		const skills = await Skills.findByIdAndUpdate(
			params.id,
			{ $set: body },
			{ new: true }
		)
		if (!skills)
			return NextResponse.json(
				{ success: false, error: 'Skills not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, data: skills })
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}

//DELETE
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
		const skills = await Skills.findByIdAndDelete(params.id)
		if (!skills)
			return NextResponse.json(
				{ success: false, error: 'Skills not found' },
				{ status: 404 }
			)

		return NextResponse.json({
			success: true,
			message: 'Skills deleted success',
		})
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 }
		)
	}
}
