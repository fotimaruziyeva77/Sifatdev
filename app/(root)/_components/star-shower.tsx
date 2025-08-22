'use client'

import React, { useEffect, useRef } from 'react'

interface IProps {
	height: number
	count: number
	size: number
	width: number
}

const StarShower: React.FC<IProps> = ({ height, count, size, width }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		canvas.width = width
		canvas.height = height

		interface Star {
			x: number
			y: number
			size: number
			speed: number
		}

		const stars: Star[] = []
		const numStars = count

		// Initialize stars
		for (let i = 0; i < numStars; i++) {
			stars.push({
				x: Math.random() * canvas.width,
				y: canvas.height + Math.random() * 100,
				size: Math.random() * (0.5 + 0.5) * size,
				speed: Math.random() * 0.5 + 0.1,
			})
		}

		// Draw star shape
		const drawStar = (x: number, y: number, size: number) => {
			ctx.beginPath()
			const spikes = 5
			const outerRadius = size
			const innerRadius = size / 2
			let rot = (Math.PI / 2) * 3
			const step = Math.PI / spikes

			ctx.moveTo(x, y - outerRadius)
			for (let i = 0; i < spikes; i++) {
				ctx.lineTo(
					x + Math.cos(rot) * outerRadius,
					y + Math.sin(rot) * outerRadius
				)
				rot += step
				ctx.lineTo(
					x + Math.cos(rot) * innerRadius,
					y + Math.sin(rot) * innerRadius
				)
				rot += step
			}
			ctx.lineTo(x, y - outerRadius)
			ctx.closePath()
			ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
			ctx.fill()
		}

		// Animation loop
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			stars.forEach(star => {
				star.y -= star.speed

				if (star.y < -star.size) {
					star.y = canvas.height + star.size
					star.x = Math.random() * canvas.width
					star.size = Math.random() * (0.5 + 0.5) * size
					star.speed = Math.random() * 0.2 + 0.1
				}

				drawStar(star.x, star.y, star.size)
			})

			requestAnimationFrame(animate)
		}

		animate()

		// Cleanup
		return () => {
			cancelAnimationFrame(0)
		}
	}, [])

	return <canvas ref={canvasRef} style={{ background: 'transparent' }} />
}

export default StarShower
