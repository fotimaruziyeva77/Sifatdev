import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Services from '@/models/service.model'
import { verifyJwt } from '@/lib/jwt'

// GET by slug
export async function GET(
	req: Request,
	context: { params: Promise<{ slug: string }> }
) {
	try {
		await dbConnect()
		const { slug } = await context.params

		const service = await Services.findOne({ slug }).lean()
		if (!service) {
			return NextResponse.json(
				{ success: false, error: 'Service not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json({ success: true, data: service })
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
	context: { params: Promise<{ slug: string }> }
) {
	const { slug } = await context.params
	return updateService(req, slug)
}

// PATCH (update partial)
export async function PATCH(
	req: Request,
	context: { params: Promise<{ slug: string }> }
) {
	const { slug } = await context.params
	return updateService(req, slug)
}

async function updateService(req: Request, slug: string) {
	try {
		const user = await verifyJwt(req)
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)
		}

		await dbConnect()
		const body = await req.json()
		const updated = await Services.findOneAndUpdate({ slug }, body, {
			new: true,
		}).lean()

		if (!updated) {
			return NextResponse.json(
				{ success: false, error: 'Service not found' },
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

// DELETE by slug
export async function DELETE(
	req: Request,
	context: { params: Promise<{ slug: string }> }
) {
	try {
		const user = await verifyJwt(req)
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)
		}

		await dbConnect()
		const { slug } = await context.params
		const deleted = await Services.findOneAndDelete({ slug }).lean()

		if (!deleted) {
			return NextResponse.json(
				{ success: false, error: 'Service not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, message: 'Deleted successfully' })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
