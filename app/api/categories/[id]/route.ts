import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Category from '@/models/category.model'
import { NextResponse } from 'next/server'

// GET
export async function GET(
	_: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params
		await dbConnect()

		const category = await Category.findById(id).lean()
		if (!category) {
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, data: category })
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
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params
		await dbConnect()

		const user = await verifyJwt(req)
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)
		}

		const body = await req.json()
		const updated = await Category.findByIdAndUpdate(id, body, { new: true })
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
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params
		await dbConnect()

		const user = await verifyJwt(req)
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)
		}

		const body = await req.json()
		const updated = await Category.findByIdAndUpdate(
			id,
			{ $set: body },
			{ new: true }
		)
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
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params
		await dbConnect()

		const user = await verifyJwt(req)
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)
		}

		const deleted = await Category.findByIdAndDelete(id)
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
