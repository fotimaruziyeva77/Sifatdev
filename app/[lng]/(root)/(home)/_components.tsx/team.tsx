'use client'

import { Teams } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaTelegram, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import axios from 'axios'
import { API_SERVICE } from '@/services/api-service'

export default function TeamSection() {
	const [team, setTeams] = useState<Teams[]>([])

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
		<section
			id='team'
			className='py-24 bg-gradient-to-b from-[#0B192C] to-[#0B192C]/90 text-white'
		>
			<div className='container mx-auto px-6 lg:px-12'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold'>
						Bizning <span className='text-blue-400'>Jamoa</span>
					</h2>
					<p className='text-gray-300 mt-3'>SifatDev jamoasi bilan tanishing</p>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
					{team.map(member => (
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

							<h3 className='text-xl font-semibold mt-5'>{member.full_name}</h3>
							<div className='flex gap-4'>
								{/* <p className='text-blue-400 text-sm'>{member.job}</p> */}
								{/* <p>{member.phoneNumber}</p> */}
							</div>
							<div className='flex justify-center gap-4 mt-4 text-gray-300'>
								<Link href={member.telegram} target='_blank'>
									<FaTelegram className='w-5 h-5 hover:text-blue-400 transition' />
								</Link>
								<Link href={member.instagram} target='_blank'>
									<FaInstagram className='w-5 h-5 hover:text-pink-400 transition' />
								</Link>
								<Link href={member.github} target='_blank'>
									<FaGithub className='w-5 h-5 hover:text-gray-100 transition' />
								</Link>
								<Link href={member.linkedin} target='_blank'>
									<FaLinkedin className='w-5 h-5 hover:text-blue-500 transition' />
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
