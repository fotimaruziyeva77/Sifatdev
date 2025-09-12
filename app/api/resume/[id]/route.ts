import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Resume from '@/models/resume.model'
import { NextResponse } from 'next/server'

// GET by ID
export async function GET(
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
		const resume = await Resume.findById(id).lean()

		if (!resume) {
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, data: resume })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// DELETE by ID
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
		const deleted = await Resume.findByIdAndDelete(id)

		if (!deleted) {
			return NextResponse.json(
				{ success: false, error: 'Not found' },
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
