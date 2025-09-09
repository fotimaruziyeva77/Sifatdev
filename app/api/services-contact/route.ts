import { NextResponse } from 'next/server'
import { sendTelegramMessage, escapeHtml } from '@/lib/telegramBot'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const {
			companyName = '',
			phoneNumber = '',
			service = '',
			name = '',
			description = '',
		} = body

		const text = [
			'📩 <b>New service message!</b>',
			`<b>👤 Company:</b> ${escapeHtml(String(companyName))}`,
			`<b>💬 Service:</b> ${escapeHtml(String(service))}`,
			`<b>👤 Name:</b> ${escapeHtml(String(name))}`,
			`<b>📝 Description:</b> ${escapeHtml(String(description))}`,
			`<b>📞 Phone:</b> ${escapeHtml(String(phoneNumber))}`,
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
