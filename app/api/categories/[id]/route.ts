import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Category from '@/models/category.model'
import { NextResponse } from 'next/server'

// GET
export async function GET(_: Request, { params }: { params: { id: string } }) {
	try {
		await dbConnect()
		const category = await Category.findById(params.id).lean()
		if (!category)
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)
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
	{ params }: { params: { id: string } }
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
		const updated = await Category.findByIdAndUpdate(params.id, body, {
			new: true,
		})
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
	{ params }: { params: { id: string } }
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
		const updated = await Category.findByIdAndUpdate(
			params.id,
			{ $set: body },
			{ new: true }
		)
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
	{ params }: { params: { id: string } }
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

		const deleted = await Category.findByIdAndDelete(params.id)
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
