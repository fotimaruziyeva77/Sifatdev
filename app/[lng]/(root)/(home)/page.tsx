'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Globe, Rocket, Users } from 'lucide-react'
import BlogSection from './_components.tsx/blogs'
import ServiceCarousel from './_components.tsx/services'
// import ContactSection from './_components.tsx/contact'
// import TeamSection from './_components.tsx/team'
import { motion, AnimatePresence } from 'motion/react'
import { useParams } from 'next/navigation'
import TextType from '@/constants/textype'
import useTranslate from '@/hooks/use-translate'
import Image from 'next/image'
import Portfolio from './_components.tsx/portfolio'
import ContactSection from './_components.tsx/contact'

function Page() {
	const { lng } = useParams()
	const t = useTranslate()
	const images = [
		'/assets/1.jpg',
		'/assets/3.jpg',
		'/assets/slider-2-3.jpg',
		'/assets/image.png',
		'/assets/2.png',
	]
	const slides = [
		{
			subtitle: t('slide.subtitle'),
			image: '/assets/1.jpg',
			title: t('slide.title'),
			description: t('slide.description'),
		},
		{
			subtitle: t('slide.subtitle'),
			image: '/assets/3.jpg',
			title: t('slide.title1'),
			description: t('slide.description1'),
		},
		{
			subtitle: t('slide.subtitle'),
			image: '/assets/slider-2-3.jpg',
			title: t('slide.title2'),
			description: t('slide.description2'),
		},
		{
			subtitle: t('slide.subtitle'),
			image: '/assets/image.png',
			title: t('slide.title3'),
			description: t('slide.description3'),
		},
		{
			subtitle: t('slide.subtitle'),
			image: '/assets/2.png',
			title: t('slide.title4'),
			description: t('slide.description4'),
		},
	]

	const [current, setCurrent] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent(prev => (prev + 1) % slides.length)
		}, 6000)
		return () => clearInterval(interval)
	}, [slides.length])

	return (
		<div>
			<div className=''>
				<div className='relative shadow-md z-10'>
					<div className='relative'>
						<div className='relative h-[500px] sm:h-[600px] lg:h-[750px]'>
							<div
								className='absolute inset-0 bg-center bg-cover transition-all duration-1000'
								style={{ backgroundImage: `url(${images[current]})` }}
							>
								<div className='absolute inset-0 bg-gradient-to-l from-transparent to-[#08111fe6]' />
								<div className='absolute inset-0 opacity-80 bg-gradient-to-tl from-transparent to-black' />
							</div>
							<div className='relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-32 py-18 sm:py-36 md:py-48 z-30 text-center md:text-left'>
								<AnimatePresence mode='wait'>
									<motion.div
										key={current}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -30 }}
										transition={{ duration: 1.5 }}
									>
										<h2 className='mt-6 text-3xl sm:text-2xl md:text-5xl lg:text-[52px] font-medium leading-snug text-white max-w-3xl'>
											<span className='text-blue-400'>
												{[slides[current].subtitle]}
											</span>
											<TextType
												text={[slides[current].title]}
												typingSpeed={50}
												deletingSpeed={30}
												pauseDuration={5000}
												variableSpeed={{ min: 30, max: 60 }}
											/>
										</h2>

										<p className='mt-4 mb-8 text-sm sm:text-base md:text-lg text-gray-300 leading-7 max-w-3xl mx-auto md:mx-0'>
											{slides[current].description}
										</p>
									</motion.div>
								</AnimatePresence>

								<div className='flex flex-row gap-4 justify-center md:justify-start'>
									<Link
										href={`/${lng}/contact`}
										className='bg-blue-600 hover:bg-blue-700 text-white 
               px-4 py-2 text-sm 
               md:px-6 md:py-3 md:text-base 
               rounded-lg flex items-center gap-2'
									>
										{t('hero.contact')} <ArrowRight />
									</Link>

									<Link
										href={`/${lng}/about`}
										className='border border-gradient-to-r from-[#6065d4] to-[#fa5674] text-white 
               px-4 py-2 text-sm 
               md:px-6 md:py-3 md:text-base 
               rounded-lg flex items-center gap-2'
									>
										{t('navitem.about')} <ArrowRight />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className='bg-[#0B192C] text-white py-16'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12'>
					{/* LEFT SIDE - IMAGE */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className='flex justify-center  py-10 '
					>
						<div className='flex flex-col gap-4'>
							<div className='flex items-center gap-2 mb-3'>
								<span className='h-[2px] w-6 bg-blue-400'></span>
								<span
									className='from-blue-400 via-cyan-200 to-blue-400 
						bg-clip-text  text-white animate-gradient z-10 uppercase tracking-wide text-sm'
								>
									{t('about.section_title')}
								</span>
								<span className='h-[2px] w-6 bg-blue-400'></span>
							</div>
							<Image
								src='/assets/about.png'
								alt='SifatDev jamoasi'
								width={550}
								height={200}
								className='rounded-2xl shadow-lg object-cover'
							/>
						</div>
					</motion.div>

					{/* RIGHT SIDE - TEXT */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className='text-center lg:text-left space-y-6 max-w-3xl mx-auto'
					>
						{/* Title */}
						<h2 className='text-3xl md:text-4xl font-bold'>
							{' '}
							{t('about.title')}
						</h2>

						{/* Description */}
						<p className='text-lg text-gray-300 leading-relaxed'>
							{t('about.description')}
						</p>
						<div className='grid grid-cols-2 sm:grid-cols-3 gap-6  pt-8'>
							<div>
								<h3 className='text-3xl font-bold text-blue-500'>50+</h3>
								<p className='text-gray-400'> {t('about.stats.projects')}</p>
							</div>
							<div>
								<h3 className='text-3xl font-bold text-blue-500'>200+</h3>
								<p className='text-gray-400'>{t('about.stats.participants')}</p>
							</div>

							<div>
								<h3 className='text-3xl font-bold text-blue-500'>5+</h3>
								<p className='text-gray-400'>{t('about.stats.experience')}</p>
							</div>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300 pt-6'>
							<div className='flex items-center gap-3'>
								<span className='p-2 bg-blue-600 rounded-full'>
									<Rocket />
								</span>
								<span>{t('about.features.innovation')}</span>
							</div>
							<div className='flex items-center gap-3'>
								<span className='p-2 bg-blue-600 rounded-full'>
									<Users />
								</span>
								<span>{t('about.features.teamwork')}</span>
							</div>
							<div className='flex items-center gap-3'>
								<span className='p-2 bg-blue-600 rounded-full'>
									<BookOpen />
								</span>
								<span>{t('about.features.education')}</span>
							</div>
							<div className='flex items-center gap-3'>
								<span className='p-2 bg-blue-600 rounded-full'>
									<Globe />
								</span>
								<span>{t('about.features.social')}</span>
							</div>
						</div>
						{/* CTA buttons */}
						<div className='flex justify-center lg:justify-start gap-4'>
							<Link href={`${lng}/about`}>
								<button className='px-6 py-3 bg-blue-600 rounded-xl shadow hover:bg-blue-700 transition duration-300'>
									{t('about.cta.more_info')}
								</button>
							</Link>
							<Link href={`${lng}/contact`}>
								<button className='px-6 py-3 bg-gray-700 rounded-xl shadow hover:bg-gray-600 transition duration-300'>
									{t('about.cta.join_team')}
								</button>
							</Link>
						</div>
					</motion.div>
				</div>
			</section>
			<div>
				<Portfolio />
			</div>
			<ServiceCarousel />
			<BlogSection />
			<ContactSection />
		</div>
	)
}

export default Page
