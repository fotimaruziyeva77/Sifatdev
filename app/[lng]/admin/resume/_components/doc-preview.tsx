import { useEffect, useRef } from 'react'
import { renderAsync } from 'docx-preview'

export function DocxPreview({ url }: { url: string }) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		fetch(url)
			.then(res => res.arrayBuffer())
			.then(buffer => {
				if (containerRef.current) {
					containerRef.current.innerHTML = ''
					renderAsync(buffer, containerRef.current)
				}
			})
	}, [url])

	return <div ref={containerRef} className='w-full h-[50vh] overflow-auto' />
}
