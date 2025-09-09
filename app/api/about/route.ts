import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const body = await req.json()
	return NextResponse.json({ ok: true, body })
}

export async function GET() {
	return NextResponse.json({ ok: true })
}
