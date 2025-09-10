import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Skills from '@/models/skills.model'
import { NextResponse } from 'next/server'

export async function GET() {
	await dbConnect()
	const skills = await Skills.find()
	return NextResponse.json({
		success: true,
		data: skills,
	})
}

export async function POST(req: Request) {
	await dbConnect()
	const user = await verifyJwt(req)
	if (!user) {
		return NextResponse.json(
			{
				success: false,
				error: 'Unauthorized',
			},
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
	const skills = await Skills.create({ name: body.name })
	return NextResponse.json({ success: true, data: skills })
}
