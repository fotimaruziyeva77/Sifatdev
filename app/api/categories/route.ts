import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Category from '@/models/category.model'
import { NextResponse } from 'next/server'

// GET all categories
export async function GET() {
	try {
		await dbConnect()
		const categories = await Category.find().lean()
		return NextResponse.json({ success: true, data: categories })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// CREATE category (admin only)
export async function POST(req: Request) {
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
		const { title } = body

		const newCategory = await Category.create({ title })
		return NextResponse.json(
			{ success: true, data: newCategory },
			{ status: 201 }
		)
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
