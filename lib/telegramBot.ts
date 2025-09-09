export function escapeHtml(str: string) {
	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function sendTelegramMessage(text: string) {
	const botToken = process.env.TELEGRAM_BOT_TOKEN
	const chatId = process.env.TELEGRAM_CHAT_ID

	if (!botToken || !chatId) {
		throw new Error('Error bot configuration')
	}

	const url = `https://api.telegram.org/bot${botToken}/sendMessage`
	const payload = {
		chat_id: chatId,
		text,
		parse_mode: 'HTML',
		disable_web_page_preview: true,
	}

	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	})

	let data: any = null
	try {
		data = await res.json()
	} catch (e) {
		console.error("Telegramdan JSON parse bo'lmadi:", e)
	}

	if (!res.ok) {
		console.error('Telegram response:', data)
		const desc = data?.description || res.statusText
		throw new Error(`Telegram API xato: ${desc}`)
	}

	console.log('Send message telegram', data)
	return data
}
