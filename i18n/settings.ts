export const fallbackLng = 'uz'
export const languages = [fallbackLng, 'en', 'ru']
export const cookieName = 'i18next'

export function getOptions(lng = fallbackLng) {
	return {
		supportedLngs: languages,
		fallbackLng,
		lng,
	}
}
