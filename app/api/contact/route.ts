import { NextResponse } from 'next/server'
import { sendTelegramMessage, escapeHtml } from '@/lib/telegramBot'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { name = '', phone = '', message = '' } = body

		const text = [
			'📩 <b>New contact message!</b>',
			`<b>👤 Name:</b> ${escapeHtml(String(name))}`,
			`<b>📞 Phone:</b> ${escapeHtml(String(phone))}`,
			`<b>💬 Message:</b> ${escapeHtml(String(message))}`,
		].join('\n')

		await sendTelegramMessage(text)
		return NextResponse.json({ success: true })
	} catch (err) {
		console.error('Error send message telegram:', err)
		return NextResponse.json(
			{ success: false, error: String(err) },
			{ status: 500 }
		)
	}
}
