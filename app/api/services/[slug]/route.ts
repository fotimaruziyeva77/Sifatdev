import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Services from '@/models/service.model'
import { verifyJwt } from '@/lib/jwt'

// GET
export async function GET(
	_: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		await dbConnect()
		const service = await Services.findOne({ slug: params.slug })
		if (!service) {
			return NextResponse.json(
				{ success: false, error: 'Service not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json({ success: true, data: service })
	} catch (err) {
		return NextResponse.json(
			{ success: false, error: String(err) },
			{ status: 500 }
		)
	}
}

// UPDATE (PUT / PATCH)
export async function PUT(
	req: Request,
	{ params }: { params: { slug: string } }
) {
	return updateService(req, params.slug)
}

export async function PATCH(
	req: Request,
	{ params }: { params: { slug: string } }
) {
	return updateService(req, params.slug)
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
		})

		if (!updated) {
			return NextResponse.json(
				{ success: false, error: 'Service not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, data: updated })
	} catch (err) {
		return NextResponse.json(
			{ success: false, error: String(err) },
			{ status: 500 }
		)
	}
}

// DELETE
export async function DELETE(
	req: Request,
	{ params }: { params: { slug: string } }
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
		const deleted = await Services.findOneAndDelete({ slug: params.slug })

		if (!deleted) {
			return NextResponse.json(
				{ success: false, error: 'Service not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, data: deleted })
	} catch (err) {
		return NextResponse.json(
			{ success: false, error: String(err) },
			{ status: 500 }
		)
	}
}
