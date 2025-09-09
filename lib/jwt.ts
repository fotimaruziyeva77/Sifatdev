import { jwtVerify } from 'jose'

export async function verifyJwt(req: Request) {
	try {
		const token =
			req.headers.get('authorization')?.replace('Bearer ', '') ||
			req.headers.get('cookie')?.split('token=')[1]

		if (!token) return null

		const secret = new TextEncoder().encode(process.env.JWT_SECRET)
		const { payload } = await jwtVerify(token, secret)
		return payload
	} catch {
		return null
	}
}
