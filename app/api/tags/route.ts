import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Tag from '@/models/tag.model'
import { NextResponse } from 'next/server'

export async function GET() {
	await dbConnect()
	const tags = await Tag.find()
	return NextResponse.json({ success: true, data: tags })
}

export async function POST(req: Request) {
	await dbConnect()
	const user = await verifyJwt(req)
	if (!user) {
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)
	}
	const body = await req.json()
	if (!body.name) {
		return NextResponse.json(
			{ success: false, error: 'Name required' },
			{ status: 400 }
		)
	}
	const tag = await Tag.create({ name: body.name })
	return NextResponse.json({ success: true, data: tag })
}
