import dbConnect from '@/lib/db'
import { NextResponse } from 'next/server'
import Blog from '@/models/blog.model'
import Tag from '@/models/tag.model'
import { verifyJwt } from '@/lib/jwt'

export async function GET(req: Request) {
	await dbConnect()
	const { searchParams } = new URL(req.url)

	const tagsParam = searchParams.get('tags')
	const tagNamesParam = searchParams.get('tagNames')
	const match = (searchParams.get('match') || 'any').toLowerCase() as
		| 'any'
		| 'all'
	const q = searchParams.get('q') || ''
	const limit = Number(searchParams.get('limit') || 20)
	const page = Number(searchParams.get('page') || 1)

	const filter: any = {}
	let tagIds: string[] = []

	if (tagNamesParam) {
		const names = tagNamesParam
			.split(',')
			.map(s => s.trim())
			.filter(Boolean)
		if (names.length) {
			const found = await Tag.find({ name: { $in: names } }, { _id: 1 })
			tagIds = found.map(t => String(t._id))
		}
	}

	if (tagsParam) {
		tagIds = tagIds.concat(
			tagsParam
				.split(',')
				.map(s => s.trim())
				.filter(Boolean)
		)
	}

	if (tagIds.length) {
		filter.tags = match === 'all' ? { $all: tagIds } : { $in: tagIds }
	}

	if (q) {
		filter.$or = [
			{ title: { $regex: q, $options: 'i' } },
			{ description: { $regex: q, $options: 'i' } },
		]
	}

	const cursor = Blog.find(filter)
		.sort({ createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit)
		.populate('tags', 'name')

	const [items, total] = await Promise.all([
		cursor.exec(),
		Blog.countDocuments(filter),
	])

	return NextResponse.json({
		success: true,
		data: items,
		pagination: { page, limit, total, pages: Math.ceil(total / limit) },
	})
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
	const { title, description, image, viewCount, tags } = body

	if (!title || !description || !image) {
		return NextResponse.json(
			{ success: false, error: 'Required fields missing' },
			{ status: 400 }
		)
	}

	const created = await Blog.create({
		title,
		description,
		image,
		viewCount: viewCount ?? 0,
		tags: Array.isArray(tags) ? tags : [],
	})

	const populated = await Blog.findById(created._id).populate('tags', 'name')
	return NextResponse.json({ success: true, data: populated }, { status: 201 })
}
