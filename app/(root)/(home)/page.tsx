'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
	ArrowRight,
	CheckCircle2,
	Facebook,
	Instagram,
	Linkedin,
	Send,
} from 'lucide-react'
import { link, stats } from '@/constants'
import { Card } from '@/components/ui/card'
import CircularText from '../_components/circulartext'
// import { Button } from '@/components/ui/button'
// import { url } from 'inspector'
// import CircularText from '../_components/circulartext'

function Page() {
	const slides = [
		'/assets/slider-2-1.jpg',
		'/assets/slider-2-2.jpg',
		'/assets/slider-2-3.jpg',
	]
	const services = [
		{
			title: 'Front-end ',
			link: '/frontend-development',
			items: [
				['UI/UX Dizayn', 'Responsive veb dizayn'],
				['React.js / Next.js', 'Tailwind CSS'],
				['JavaScript/TypeScript', 'Performance optimizatsiyasi'],
			],
		},
		{
			title: 'Back-end ',
			link: '/backend-development',
			items: [
				['Node.js / Express.js', 'Django / FastAPI'],
				['Ma’lumotlar bazasi integratsiyasi', 'API ishlab chiqish'],
				['Autentifikatsiya', 'Server optimizatsiyasi'],
			],
		},
		{
			title: 'Kiberxavfsizlik va xavflarni boshqarish',
			link: '/cyber-security',
			items: [
				['Xavfsizlik auditi', 'Ma’lumotlarni himoyalash'],
				['DDOS hujumlardan himoya', 'Shifrlash texnologiyalari'],
				['Xavflarni monitoring qilish', 'Tizim zaifliklarini tekshirish'],
			],
		},
		{
			title: 'Mobilografiya va kontent ishlab chiqish',
			link: '/mobileography',
			items: [
				['Mobil video suratga olish', 'Foto tahrirlash'],
				['Drone suratga olish', 'Video montaj'],
				['Kreativ kontent yaratish', 'Reklama roliklari'],
			],
		},
	]

	const [current, setCurrent] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent(prev => (prev + 1) % slides.length)
		}, 5000)
		return () => clearInterval(interval)
	}, [slides.length])
	return (
		<div>
			<div className='mt-20'>
				<div
					id='home'
					className='relative from-[#0B192C] to-[#0B192C]  shadow-md z-10'
				>
					<div
						className='swiper-container'
						data-swiper-options={`{
      "slidesPerView": 1,
      "loop": true,
      "effect": "fade",
      "pagination": {
          "el": "#main-slider-pagination",
          "type": "bullets",
          "clickable": true
      },
      "navigation": {
          "nextEl": "#main-slider__swiper-button-next",
          "prevEl": "#main-slider__swiper-button-prev"
      },
      "autoplay": {
          "delay": 4000
      }
    }`}
					>
						<div className=''>
							<div className='swiper-slide relative'>
								<div
									className='absolute inset-0 bg-center bg-cover scale-100 transition-all duration-[1000ms] '
									style={{
										backgroundImage: `url(${slides[current]})`,
									}}
								>
									<div className='absolute inset-0 bg-gradient-to-l from-[#08111f00] to-[#08111fe6]' />
									<div className='absolute inset-0 opacity-80 bg-gradient-to-tl from-transparent to-black' />
								</div>
								<ul className='absolute flex gap-7 rotate-[-90deg] top-[220px] left-[-41px] z-10'>
									{link.map((item, index) => (
										<li key={index}>
											<Link
												href={item.href}
												className='text-white hover:text-blue-400'
											>
												{item.navlink}
											</Link>
										</li>
									))}
								</ul>

								<div className='absolute flex items-center gap-4 rotate-[-90deg] left-[-80px] bottom-[200px]  '>
									<h4 className='text-lg font-medium text-white'>Follow Us:</h4>
									<div className='flex gap-4'>
										<Link
											href='#'
											className='text-white hover:text-sky-500 text-[22px]'
										>
											<Send />
										</Link>

										<Link
											href='#'
											className='text-white hover:text-pink-500 text-[22px]'
										>
											<Instagram />
										</Link>
										<Link
											href='#'
											className='text-white hover:text-blue-400 text-[22px]'
										>
											<Facebook />
										</Link>
										<Link
											href='#'
											className='text-white hover:text-blue-500 text-[22px]'
										>
											<Linkedin />
										</Link>
									</div>
								</div>

								<div className='absolute top-[173px] bottom-0 left-[99px] w-[1px] bg-white/20 z-[-1]' />
								<div className='absolute bottom-0 left-0 opacity-5 animate-float-x'>
									<Image
										src='/assets/main-slider-two-shape-2.png'
										alt=''
										width={300}
										height={300}
									/>
								</div>
								<div className='absolute top-0 right-0 opacity-10 animate-float-y'>
									<Image
										src='/assets/main-slider-two-shape-3.png'
										alt=''
										width={300}
										height={300}
									/>
								</div>

								<div className='relative max-w-7xl mx-auto py-[200px] pb-[260px] px-4 z-30'>
									<div className='inline-flex items-center gap-2 bg-white/5 rounded-[17px] px-5 py-2 border border-gradient-to-r from-[#6065d4] to-[#fa5674]'>
										<p className='text-sm font-bold text-white'>
											Sizning muvaffaqiyatingiz uchun yaratilgan IT yechimlar
										</p>
									</div>

									<h2 className='mt-4 text-5xl md:text-[52px] font-medium leading-snug md:leading-tight text-white max-w-3xl'>
										Sifatli IT{' '}
										<span className='text-blue-400'>strategiyalar</span>{' '}
										biznesingizni
										<span className='text-blue-400'> </span> va yangi marralarga
										<span className='text-blue-400'> olib chiqish</span>
									</h2>

									<p className='mt-4 mb-10 text-lg text-gray-300 leading-7 max-w-2xl'>
										Strategik IT maslahatlaridan tortib mukammal loyiha joriy
										etishgacha — biz sizga samaradorlikni oshiradigan yechimlar
										taklif etamiz
									</p>

									<div className='flex gap-6'>
										<Link
											href='/contact'
											className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2'
										>
											Bog‘lanish <ArrowRight />
										</Link>
										<Link
											href='/about'
											className='border border-gradient-to-r from-[#6065d4] to-[#fa5674] text-white px-6 py-3 rounded-lg flex items-center gap-2'
										>
											Batafsil <ArrowRight />
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* about */}
			<div className='w-full'>
				<div className='from-[#0B192C] to-[#0B192C]  shadow-md text-white py-16'>
					<div className='max-w-9xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-20'>
						<div className='grid grid-cols-2 gap-4 lg:w-[700px] h-[600px] ml-30'>
							<Card className='relative overflow-hidden cursor-pointer col-span-2 h-[350px]'>
								<Link href={'/about'}>
									<Image
										src='/assets/about.png'
										alt='SifatDev jamoasi'
										fill
										className='object-cover hover:scale-105 transition-transform duration-500'
									/>
								</Link>
							</Card>
							<Card className='relative overflow-hidden cursor-pointer h-[230px]'>
								<Link href={'/about'}>
									<Image
										src='/assets/about-one-img-1.jpg'
										alt='SifatDev ish jarayoni'
										fill
										className='object-cover hover:scale-105 transition-transform duration-500'
									/>
								</Link>
							</Card>
							<Card className='relative overflow-hidden cursor-pointer h-[230px]'>
								<Link href={'/about'}>
									<Image
										src='/assets/about-two-img-2.jpg'
										alt='Jamoa uchrashuvi'
										fill
										className='object-cover hover:scale-105 transition-transform duration-500'
									/>
								</Link>
							</Card>
						</div>
						<div className='flex-1 h-[600px]  flex items-start justify-center flex-col gap-3'>
							<h1 className='text-blue-400 mb-2 tracking-wider uppercase flex items-start justify-center '>
								Biz haqimizda
							</h1>
							<h2 className='text-4xl font-bold leading-snug'>
								🚀 <span className='text-blue-400'>SifatDev</span> — Kelajakni{' '}
								<span className='text-blue-400'>Kodlaymiz</span>
							</h2>
							<p className='text-gray-300 mt-4 max-w-xl'>
								SifatDev — bu turli yo‘nalishdagi iqtidorli dasturchilar,
								dizaynerlar va IT mutaxassislar jamlangan professional jamoa.
								Biz mijozlarimiz uchun zamonaviy, tezkor va sifatli raqamli
								yechimlar yaratib, ularning biznesini yangi bosqichga olib
								chiqamiz.
							</p>

							<div className='grid sm:grid-cols-2 gap-4 mt-6 text-gray-300'>
								{[
									'Zamonaviy texnologiyalar va frameworklar',
									'Sifat va tezlikka asoslangan ishlab chiqish',
									'Innovatsion va foydalanuvchiga qulay dizayn',
									'Doimiy qo‘llab-quvvatlash va hamkorlik',
								].map((item, idx) => (
									<div key={idx} className='flex items-start gap-2'>
										<CheckCircle2 className='text-blue-400 w-5 h-5 mt-1' />
										<span>{item}</span>
									</div>
								))}
							</div>

							{/* Statistik ma'lumotlar */}
							<div className='flex flex-wrap items-center gap-8 mt-8'>
								<div>
									<p className='text-yellow-400 text-3xl font-bold'>5+</p>
									<p className='text-gray-400 text-sm'>Yillik Tajriba</p>
								</div>
								<div>
									<p className='text-yellow-400 text-3xl font-bold'>50+</p>
									<p className='text-gray-400 text-sm'>
										Muvaffaqiyatli Loyihalar
									</p>
								</div>
								<div>
									<p className='text-yellow-400 text-3xl font-bold'>30+</p>
									<p className='text-gray-400 text-sm'>Hamkor Mijozlar</p>
								</div>
							</div>
							<div className='flex flex-col sm:flex-row items-center gap-6 mt-8 justify-between'>
								<div className='flex flex-col gap-1 text-center sm:text-left'>
									<p className='text-blue-400 text-sm'>Bog‘lanish uchun</p>
									<p className='font-semibold text-lg'>+998 (88) 378 08 08</p>
								</div>
								<div className='flex justify-center w-full sm:w-auto'>
									<Link
										href='/service'
										className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition'
									>
										Xizmatlarimiz <ArrowRight />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/*  */}
			<section className='bg-gradient-to-r from-[#0a1d4d] to-[#042b70] py-12 relative overflow-hidden'>
				<div
					className='absolute inset-0 opacity-40 animate-bgMove'
					style={{
						backgroundImage: `url('/icons/shapes.png')`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				></div>

				{/* Stats */}
				<div className='relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center'>
					{stats.map((item, idx) => {
						const Icon = item.icon
						return (
							<div key={idx} className='flex flex-col items-center'>
								<div className='bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full shadow-lg mb-3 text-white'>
									<Icon size={32} strokeWidth={2} />
								</div>
								<h3 className='text-white text-3xl font-bold'>{item.number}</h3>
								<p className='text-gray-300'>{item.label}</p>
							</div>
						)
					})}
				</div>
			</section>
			{/* services */}
			<div>
				<section className='relative py-32 overflow-hidden from-[#0B192C] to-[#0B192C]   text-white'>
					<div className='absolute left-[-26%] top-[12%] w-[400px] h-[400px] rounded-full opacity-50 blur-[120px] bg-[radial-gradient(ellipse_at_center,_#D866D4,_transparent)] -z-10'></div>

					<div className='container mx-auto px-6'>
						<div className='flex flex-col md:flex-row justify-between items-center mb-14'>
							<div>
								<div className='flex items-center gap-2 mb-2'>
									<span className='h-[2px] w-6 bg-blue-400'></span>
									<span className='text-blue-400'>Bizning xizmatlar</span>
									<span className='h-[2px] w-6 bg-blue-400'></span>
								</div>
								<h2 className='text-3xl md:text-4xl font-bold leading-snug'>
									Zamonaviy IT yechimlari bilan biznesingizni rivojlantiring{' '}
									<br />
									<span className='block text-blue-400'>
										Innovatsion IT xizmatlari
									</span>
									<span className='block'>
										Sizning muvaffaqiyatingiz uchun moslashtirilgan
									</span>
								</h2>
							</div>

							{/* Dumaloq animatsion */}
							<div className='flex flex-col items-center text-blue-400'>
								<div>
									<CircularText
										text='Sizning muvaffaqiyatingiz uchun moslashtirilgan '
										onHover='speedUp'
										spinDuration={20}
										className='custom-class'
									/>
								</div>
							</div>
						</div>

						{/* Xizmatlar ro‘yxati */}
						<div className='space-y-10'>
							{services.map((service, index) => (
								<div
									key={service.title}
									className='relative flex flex-col md:flex-row cursor-pointer justify-between items-center gap-10 border-b border-white/20 pb-8 group'
								>
									<div className='flex items-center gap-6'>
										<div className='relative w-10 h-10 flex items-center justify-center border border-gradient-to-r from-[#6065D4] to-[#FA5674] rounded-full'>
											<span className='text-sm font-bold'>
												{String(index + 1).padStart(2, '0')}
											</span>
										</div>
										<h3 className='text-2xl font-medium'>
											<a
												href={service.link}
												className='group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent'
											>
												{service.title}
											</a>
										</h3>
									</div>

									{/* Xizmatlar elementlari */}
									<div className='max-w-2xl w-full'>
										<ul className='flex flex-wrap gap-x-3 gap-y-2'>
											{service.items.map((col, i) => (
												<li key={i} className='flex flex-col gap-2'>
													{col.map(item => (
														<p
															key={item}
															className='flex items-center gap-2 group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent'
														>
															<span className='text-[8px]'>+</span>
															{item}
														</p>
													))}
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default Page
