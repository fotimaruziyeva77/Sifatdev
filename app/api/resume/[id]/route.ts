import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Resume from '@/models/resume.model'
import { NextResponse } from 'next/server'

//GET by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
	try {
		await dbConnect()

		const user = await verifyJwt(_)
		if (!user)
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)

		const resume = await Resume.findById(params.id).lean()

		if (!resume)
			return NextResponse.json(
				{ succcess: false, error: 'Not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, data: resume })
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
		if (!user)
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)

		const deleted = await Resume.findByIdAndDelete(params.id)
		if (!deleted)
			return NextResponse.json(
				{ success: false, error: 'Not found' },
				{ status: 404 }
			)

		return NextResponse.json({ success: true, message: 'Deleted success' })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
