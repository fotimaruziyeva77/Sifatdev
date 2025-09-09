import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Vacancy from '@/models/vacancy.model'

// GET /api/vacancies/:id
export async function GET(_: Request, { params }: { params: { id: string } }) {
	try {
		await dbConnect()
		const vacancy = await Vacancy.findById(params.id)
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
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect()
		const body = await req.json()

		const vacancy = await Vacancy.findByIdAndUpdate(params.id, body, {
			new: true,
		})
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
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect()
		const vacancy = await Vacancy.findByIdAndDelete(params.id)
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
