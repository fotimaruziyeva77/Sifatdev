import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Skills from '@/models/skills.model'
import { NextResponse } from 'next/server'

// GET by ID
export async function GET(
	req: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect()
		const { id } = await context.params

		const skills = await Skills.findById(id).lean()
		if (!skills) {
			return NextResponse.json(
				{ success: false, error: 'Skills not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, data: skills })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// PUT (update full)
export async function PUT(
	req: Request,
	context: { params: Promise<{ id: string }> }
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

		const { id } = await context.params
		const body = await req.json()
		const skills = await Skills.findByIdAndUpdate(id, body, {
			new: true,
		}).lean()

		if (!skills) {
			return NextResponse.json(
				{ success: false, error: 'Skills not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, data: skills })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// PATCH (update partial)
export async function PATCH(
	req: Request,
	context: { params: Promise<{ id: string }> }
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

		const { id } = await context.params
		const body = await req.json()
		const skills = await Skills.findByIdAndUpdate(
			id,
			{ $set: body },
			{ new: true }
		).lean()

		if (!skills) {
			return NextResponse.json(
				{ success: false, error: 'Skills not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, data: skills })
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
	context: { params: Promise<{ id: string }> }
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

		const { id } = await context.params
		const skills = await Skills.findByIdAndDelete(id).lean()

		if (!skills) {
			return NextResponse.json(
				{ success: false, error: 'Skills not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({
			success: true,
			message: 'Skills deleted successfully',
		})
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
