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

		// save file to public/uploads folder
		const fileName = Date.now() + '-' + file.name
		const filePath = path.join('public', 'uploads', fileName)
		await writeFile(filePath, buffer)

		// get full domain from request
		const { origin } = new URL(req.url)

		// create full url for file
		const fileUrl = `${origin}/uploads/${fileName}`

		return NextResponse.json({ success: true, url: fileUrl })
	} catch (err) {
		return NextResponse.json(
			{ success: false, error: String(err) },
			{ status: 500 }
		)
	}
}
