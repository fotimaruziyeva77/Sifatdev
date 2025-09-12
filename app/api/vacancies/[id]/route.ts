import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Vacancy from '@/models/vacancy.model'

// GET /api/vacancies/:id
export async function GET(
	_: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect()
		const { id } = await context.params

		const vacancy = await Vacancy.findById(id)
		if (!vacancy) {
			return NextResponse.json(
				{ success: false, error: 'Vacancy not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json({ success: true, data: vacancy })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// PUT /api/vacancies/:id
export async function PUT(
	req: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect()
		const { id } = await context.params
		const body = await req.json()

		const vacancy = await Vacancy.findByIdAndUpdate(id, body, { new: true })
		if (!vacancy) {
			return NextResponse.json(
				{ success: false, error: 'Vacancy not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json({ success: true, data: vacancy })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// DELETE /api/vacancies/:id
export async function DELETE(
	_: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect()
		const { id } = await context.params

		const vacancy = await Vacancy.findByIdAndDelete(id)
		if (!vacancy) {
			return NextResponse.json(
				{ success: false, error: 'Vacancy not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json({ success: true, message: 'Vacancy deleted' })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
