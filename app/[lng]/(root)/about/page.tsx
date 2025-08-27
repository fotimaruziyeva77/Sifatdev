'use client'

import { motion, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StarShower from '../_components/star-shower'
import Link from 'next/link'
import Image from 'next/image'
import { Services } from '@/constants'
import { API_SERVICE } from '@/services/api-service'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Rocket, Users, BookOpen, Globe } from 'lucide-react'
import useTranslate from '@/hooks/use-translate'
import { useParams } from 'next/navigation'

// Animatsiya variantlari
const fadeUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0, 0, 0.58, 1] },
	},
}

const stagger: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.12 } },
}

export default function AboutPage() {
const t=useTranslate()
const {lng}=useParams()

	return (
		<main className='min-h-screen bg-gradient-to-b from-background via-background to-muted/20 text-white'>
			<div className='relative flex items-center justify-center h-48 sm:h-60 md:h-72 overflow-hidden mt-20'>
				
				<h1 className='absolute text-[60px] sm:text-[100px] md:text-[160px] lg:text-[200px] font-extrabold text-gray-700/10 select-none'>
				{t('about.section_title')}
				</h1>

				
				<motion.h1
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='relative text-2xl sm:text-4xl md:text-6xl font-extrabold 
			bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 
			bg-clip-text text-transparent animate-gradient z-10 text-center px-2'
				>
					{t('about.section_title')}
				</motion.h1>

				{/* Yulduzcha animatsiya */}
				<div className='absolute inset-0 z-[11] pointer-events-none'>
					<StarShower height={300} count={120} size={1.5} width={2000} />
				</div>
			</div>

			{/* Intro Section */}
			<section className='relative py-16 md:py-24'>
				<div className='container max-w-6xl mx-auto px-4'>
					<motion.div
						initial='hidden'
						animate='show'
						variants={stagger}
						className='grid md:grid-cols-12 gap-8 items-center'
					>
						{/* Matn qismi */}
						<motion.div variants={fadeUp} className='md:col-span-7'>
							<Badge className='mb-4'>{t('about.intro')}</Badge>
							<h1 className='text-3xl md:text-5xl font-bold tracking-tight leading-tight'>
								<span className='text-blue-400'>{t('about.sifatdev')}</span> — {t('about.feature')}
								<span className='text-primary'> {t('about.code')} </span> {t('about.world')}
							</h1>
							<p className='mt-4 text-muted-foreground md:text-lg max-w-2xl'>
							{t('about.description')}
							</p>

							{/* Statistika */}
							<div className='grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8'>
								{[
									{ value: '50+', label: t('about.stats.projects') },
									{ value: '200+', label:t('about.stats.participants')  },
									{ value: '10+', label: t('about.stats.mentors')  },
									{ value: '5 yil', label: t('about.stats.experience')  },
								].map((item, i) => (
									<div key={i}>
										<h3 className='text-3xl font-bold text-blue-500'>
											{item.value}
										</h3>
										<p className='text-gray-400'>{item.label}</p>
									</div>
								))}
							</div>

							{/* Tugmalar */}
							<div className='mt-6'>
								<Link href={`/${lng}/contact`}>
									<Button
										size='lg'
										className='bg-gradient-to-r from-blue-500 to-blue-500 text-white hover:scale-105 transition'
									>
										{t('contact.info.title')}
									</Button>
								</Link>
							
							</div>
						</motion.div>

						{/* Kartochka qismi */}
						<motion.div variants={fadeUp} className='md:col-span-5'>
							<Card className='border-primary/20 bg-primary/5 hover:shadow-lg transition rounded-2xl'>
								<CardHeader>
									<CardTitle>
										<Image
											src='/assets/about.png'
											width={300}
											height={200}
											alt='about'
											className='w-full h-72 rounded-xl object-cover'
										/>
									</CardTitle>
								</CardHeader>

								{/* Afzalliklar */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300 p-6'>
									{[
										{ icon: Rocket, text: t('about.features.innovation') },
										{ icon: Users, text: t('about.features.teamwork') },
										{ icon: BookOpen, text: t('about.features.education') },
										{ icon: Globe, text: t('about.features.social') },
									].map((item, i) => (
										<div key={i} className='flex items-center gap-3'>
											<span className='p-2 bg-blue-600 rounded-full'>
												<item.icon className='w-5 h-5' />
											</span>
											<span>{item.text}</span>
										</div>
									))}
								</div>
							</Card>
						</motion.div>
					</motion.div>
				</div>
			</section>
		</main>
	)
}
