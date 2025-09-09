import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Vacancy from '@/models/vacancy.model'

// GET /api/vacancies
export async function GET() {
	try {
		await dbConnect()
		const vacancies = await Vacancy.find().lean()
		return NextResponse.json({ success: true, data: vacancies })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// POST /api/vacancies
export async function POST(req: Request) {
	try {
		await dbConnect()
		const body = await req.json()

		const { title, description, pricing, workingDays, workingTimes } = body

		const vacancy = await Vacancy.create({
			title,
			description,
			pricing,
			workingDays,
			workingTimes,
		})

		return NextResponse.json({ success: true, data: vacancy }, { status: 201 })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
