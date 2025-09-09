import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Technology from '@/models/technology.model'
import { NextResponse } from 'next/server'

// GET all technologies
export async function GET() {
	try {
		await dbConnect()
		const technologies = await Technology.find().lean()
		return NextResponse.json({ success: true, data: technologies })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// CREATE technology (admin only)
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
		const { name } = body

		const newTech = await Technology.create({ name })
		return NextResponse.json({ success: true, data: newTech }, { status: 201 })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
