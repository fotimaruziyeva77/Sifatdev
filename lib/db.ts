// lib/db.ts
import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL as string
console.log('MONGO_URL', MONGO_URL)
if (!MONGO_URL) {
	throw new Error('MONGO_URL not found in .env.local')
}

// Prevent multiple connections in dev (Next.js hot reload)
declare global {
	var _mongoose:
		| { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
		| undefined
}

if (!global._mongoose) {
	global._mongoose = { conn: null, promise: null }
}

export default async function dbConnect() {
	if (global._mongoose!.conn) return global._mongoose!.conn

	if (!global._mongoose!.promise) {
		global._mongoose!.promise = mongoose
			.connect(MONGO_URL, { bufferCommands: false })
			.then(m => {
				console.log('✅ MongoDB connected')
				return m
			})
	}

	global._mongoose!.conn = await global._mongoose!.promise
	return global._mongoose!.conn
}

// optional named export
export const connectDB = dbConnect
