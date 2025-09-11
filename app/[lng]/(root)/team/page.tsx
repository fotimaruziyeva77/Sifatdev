'use client'

import { Teams } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaTelegram, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import axios from 'axios'
import { API_SERVICE } from '@/services/api-service'
import StarShower from '../_components/star-shower'
import { motion } from 'motion/react'
import useTranslate from '@/hooks/use-translate'
import { Badge } from '@/components/ui/badge'

export default function Team() {
	const [team, setTeams] = useState<Teams[]>([])
	const t=useTranslate()

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(API_SERVICE.team)
				.then(res => setTeams(res.data.results))
				.catch(err => console.log(err))
		}

		fetchData()
	}, [])

	return (
		<div className=' min-h-screen px-6 mb-10'>
				<div className='relative flex items-center justify-center h-48 sm:h-60 md:h-72 overflow-hidden'>
	{/* Fon yozuvi */}
	<h1 className='absolute text-[60px] sm:text-[100px] md:text-[160px] lg:text-[200px] font-extrabold text-gray-700/10 select-none'>
	{t('navitem.team')}
	</h1>

	{/* Asosiy title */}
	<motion.h1
		initial={{ opacity: 0, y: 40 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8 }}
		className='relative text-2xl sm:text-4xl md:text-6xl font-extrabold 
			bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 
			bg-clip-text text-transparent animate-gradient z-10 text-center px-2'
	>
		{t('navitem.team')}
	</motion.h1>

	{/* Yulduzcha animatsiya */}
	<div className='absolute inset-0 z-[11] pointer-events-none'>
		<StarShower height={300} count={120} size={1.5} width={2000} />
	</div>
</div>

			<section
				id='team'
				className='py-24 bg-gradient-to-b from-[#0B192C] to-[#0B192C]/90 text-white'
			>
			<div className='container mx-auto px-6 lg:px-12'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold'>
						{t('teams.teamtitle')}{' '}
						<span className='text-blue-400'>{t('teams.teamsub')}</span>
					</h2>
					<p className='text-gray-300 mt-3'>{t('teams.desc')}</p>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
					{team.map(member => {
						const socials = [
							{
								name: 'Telegram',
								url: member.telegram,
								icon: <FaTelegram className='w-4 h-4 text-blue-100' />,
							},
							{
								name: 'Instagram',
								url: member.instagram,
								icon: <FaInstagram className='w-4 h-4 text-pink-400' />,
							},
							{
								name: 'GitHub',
								url: member.github,
								icon: <FaGithub className='w-4 h-4 text-gray-100' />,
							},
							{
								name: 'LinkedIn',
								url: member.linkedin,
								icon: <FaLinkedin className='w-4 h-4 text-blue-200' />,
							},
						]

						return (
							<div
								key={member.id}
								className='bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition'
							>
								<Image
									src={member.photo}
									alt={member.full_name}
									width={170}
									height={180}
									className='rounded-full w-[170px] h-[180px] mx-auto object-cover shadow-xl ring-2 ring-white hover:scale-105 transition duration-300'
								/>
								<br />
								<div className='flex items-center justify-between border-b border-gray-700 pb-2'>
									<h3 className='text-lg md:text-xl font-bold text-white'>
										{member.full_name}
									</h3>
									<p className='text-sm md:text-base text-gray-400 italic'>
										{member.job}
									</p>
								</div>

								<div className='flex justify-center gap-3 mt-4 flex-wrap'>
									{socials
										.filter(s => s.url)
										.map(s => (
											<Link key={s.name} href={s.url!} target='_blank'>
												<Badge
													variant='secondary'
													className='flex items-center gap-2 px-6 py-2 rounded-full cursor-pointer 
						bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md
						hover:shadow-lg hover:scale-105 hover:from-blue-600 hover:to-indigo-700 
						transition-all duration-300'
												>
													<span className='text-lg'>{s.icon}</span>
													<span className='font-medium'>{s.name}</span>
												</Badge>
											</Link>
										))}
								</div>
							</div>
						)
					})}
				</div>
			</div>
			</section>
		</div>
	)
}
