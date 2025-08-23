'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, GraduationCap, Target, BadgeCheck } from 'lucide-react'
import StarShower from '../_components/star-shower'
import Link from 'next/link'
import Image from 'next/image'
import CountUp from 'react-countup'
import { Services } from '@/constants'
import { API_SERVICE } from '@/services/api-service'
import axios from 'axios'
import { useState, useEffect } from 'react'

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.12 },
	},
}

export default function AboutPage() {
	const [services, setServices] = useState<Services[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(API_SERVICE.services)
				setServices(res.data.results)
			} catch (err) {
				console.error(err)
			}
		}
		fetchData()
	}, [])
	return (
		<main className='min-h-screen bg-gradient-to-b from-background via-background to-muted/20 text-white'>
			{/* Hero Section */}
			<div className='relative flex items-center justify-center h-72 overflow-hidden mt-20'>
				<h1 className='absolute text-[180px] md:text-[240px] font-extrabold text-gray-700/10 select-none'>
					Biz haqimizda
				</h1>

				<motion.h1
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='relative text-4xl md:text-6xl font-extrabold 
						bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 
						bg-clip-text text-transparent animate-gradient z-10'
				>
					Biz haqimizda
				</motion.h1>

				<div className='absolute inset-0 z-[11] pointer-events-none'>
					<StarShower height={300} count={120} size={1.5} width={2000} />
				</div>
			</div>

			{/* Intro */}
			<section className='relative py-16 md:py-24'>
				<div className='container max-w-6xl mx-auto px-4'>
					<motion.div
						initial='hidden'
						animate='show'
						variants={stagger}
						className='grid md:grid-cols-12 gap-8 items-center'
					>
						<motion.div variants={fadeUp} className='md:col-span-7'>
							<Badge className='mb-4'>Sifat O‘quv Markazi loyihasi</Badge>
							<h1 className='text-3xl md:text-5xl font-bold tracking-tight leading-tight'>
								🚀<span className='text-blue-400'>SifatDev</span> — orzularni{' '}
								<span className='text-primary'>kod</span>ga aylantiradigan makon
							</h1>
							<p className='mt-4 text-muted-foreground md:text-lg max-w-2xl'>
								SifatDev — yoshlar va mutaxassislarni haqiqiy loyihalar, kuchli
								mentorlik va xalqaro standartlar bilan raqamli kasblarga
								tayyorlaydigan amaliy IT platforma.
							</p>
							<div className='mt-6 flex flex-wrap gap-3'>
								<Link href={'/contact'}>
									<Button
										size='lg'
										className='bg-gradient-to-r from-blue-500 to-blue-500 text-white hover:scale-105 transition'
									>
										Bog‘lanish
									</Button>
								</Link>
								<Link href={'https://sifatedu.uz/foundation'}>
									<Button
										variant='outline'
										size='lg'
										className='hover:border-blue-400 hover:text-blue-400 transition'
									>
										Kurslarga ro‘yxatdan o‘tish
									</Button>
								</Link>
							</div>
						</motion.div>

						<motion.div variants={fadeUp} className='md:col-span-5'>
							<Card className='border-primary/20 bg-primary/5 hover:shadow-lg transition rounded-2xl'>
								<CardHeader>
									<CardTitle className='flex items-center gap-2'>
										<Image
											src={'/assets/about.png'}
											width={300}
											height={200}
											alt='about'
											className='w-full h-72 rounded-xl object-cover'
										/>
									</CardTitle>
								</CardHeader>
								<CardContent className='text-muted-foreground'>
									O‘quvchi va jamoalar salohiyatini ochish, ularni bozor
									talabiga mos texnologiyalar bilan qurollantirish, natijaga
									yo‘naltirilgan mahsulotlar yaratish va mahalliy IT ekotizimiga
									hissa qo‘shish.
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* What we do */}
			<section className='py-12 md:py-20'>
				<div className='container max-w-6xl mx-auto px-4'>
					<h2 className='text-2xl md:text-3xl font-semibold mb-8'>
						Nimalar qilamiz
					</h2>

					<motion.div
						initial='hidden'
						whileInView='show'
						viewport={{ once: true, amount: 0.2 }}
						variants={stagger}
						className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
					>
						{services.map((item, i) => (
							<motion.div key={i} variants={fadeUp}>
								<Card className='h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300'>
									<CardHeader>
										<CardTitle className='flex items-center gap-2 text-base'>
											
											{item.title}
										</CardTitle>
									</CardHeader>
									<CardContent className='text-muted-foreground'>
										{item.short_description}
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Numbers */}
			<section className='py-12 md:py-20 bg-muted/30'>
				<div className='container max-w-6xl mx-auto px-4'>
					<h2 className='text-2xl md:text-3xl font-semibold mb-8'>Raqamlar</h2>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
						{[
							{ n: 50, s: '+', l: 'mentor sessiyalari/oy' },
							{ n: 1000, s: '+', l: 'o‘quvchi community' },
							{ n: 200, s: '+', l: 'portfolio loyihalar' },
							{ n: 85, s: '%', l: 'ishga joylashish' },
						].map((it, i) => (
							<Card
								key={i}
								className='text-center hover:shadow-lg hover:scale-[1.03] transition-all duration-300'
							>
								<CardHeader className='pb-2'>
									<CardTitle className='text-3xl md:text-4xl font-bold text-blue-400'>
										<CountUp end={it.n} duration={2} /> {it.s}
									</CardTitle>
								</CardHeader>
								<CardContent className='text-muted-foreground'>
									{it.l}
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</main>
	)
}
