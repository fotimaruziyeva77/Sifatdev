import dbConnect from '@/lib/db'
import { verifyJwt } from '@/lib/jwt'
import Project from '@/models/project.model'
import { NextResponse } from 'next/server'


// GET all projects
export async function GET() {
	try {
		await dbConnect()
		const projects = await Project.find()
			.populate('category', 'title')
			.populate('technologies', 'name')
			.lean()

		return NextResponse.json({ success: true, data: projects })
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}

// CREATE project (admin only)
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
		const { title, slug, description, image, category, technologies } = body

		const newProject = await Project.create({
			title,
			slug,
			description,
			image,
			category,
			technologies,
		})

		const populated = await Project.findById(newProject._id)
			.populate('category', 'title')
			.populate('technologies', 'name')

		return NextResponse.json(
			{ success: true, data: populated },
			{ status: 201 }
		)
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		)
	}
}
