import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Resume from '@/models/resume.model'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	try {
		await dbConnect()

		const user = await verifyJwt(req)
		if (!user)
			return NextResponse.json(
				{ success: false, error: 'Unauthorized' },
				{ status: 401 }
			)

		const resume = await Resume.find().lean()

		return NextResponse.json({
			success: true,
			data: resume,
		})
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
