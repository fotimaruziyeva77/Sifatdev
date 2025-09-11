import dbConnect from '@/lib/db'
import Resume from '@/models/resume.model'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		await dbConnect()

		const body = await req.json()

		const { senderName, phoneNumber, vacancy, cv } = body

		const newResume = await Resume.create({
			senderName,
			phoneNumber,
			vacancy,
			cv,
		})

		return NextResponse.json(
			{ success: true, data: newResume },
			{ status: 201 }
		)
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
