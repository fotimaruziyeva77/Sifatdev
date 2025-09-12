import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
	try {
		const formData = await req.formData()
		const file = formData.get('file') as File

		if (!file) {
			return NextResponse.json(
				{ success: false, error: 'File not found' },
				{ status: 400 }
			)
		}

		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		const fileName = Date.now() + '-' + file.name
		const filePath = path.join('public', 'uploads', fileName)
		await writeFile(filePath, buffer)

		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin

		const fileUrl = `${baseUrl}/uploads/${fileName}`

		return NextResponse.json({ success: true, url: fileUrl })
	} catch (err) {
		return NextResponse.json(
			{ success: false, error: String(err) },
			{ status: 500 }
		)
	}
}
