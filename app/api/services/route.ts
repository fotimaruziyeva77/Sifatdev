import { NextResponse } from 'next/server'
import { verifyJwt } from '@/lib/jwt'
import dbConnect from '@/lib/db'
import Services from '@/models/service.model'

// GET all services
export async function GET() {
	try {
		await dbConnect()
		const services = await Services.find().lean()
		return NextResponse.json({ success: true, data: services })
	} catch (err) {
		return NextResponse.json(
			{ success: false, error: String(err) },
			{ status: 500 }
		)
	}
}

// CREATE (only admin token)
export async function POST(req: Request) {
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
		const { title, description, icon, slug } = body

		const newService = await Services.create({ title, description, icon, slug })
		return NextResponse.json({ success: true, data: newService })
	} catch (err) {
		return NextResponse.json(
			{ success: false, error: String(err) },
			{ status: 500 }
		)
	}
}
