'use client'
// import useTranslate from '@/hooks/use-translate'
import { VacancyTypes } from '@/interfaces'
import axios from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
function Career() {
		const [vacancy, setVacancy] = useState<VacancyTypes[]>([])
		const { lng } = useParams()
		// const t = useTranslate()
		useEffect(() => {
			const fetchData = async () => {
				try {
					const res = await axios.get('/api/vacancies', {
						headers: {
							'Accept-Language': lng,
						},
					})
					setVacancy(res.data.data)
				} catch (err) {
					console.error(err)
				}
			}
			fetchData()
		}, [lng])
	// const roles = [
	// 	'#FRONT-END (VUE3)',
	// 	'#BACK-END (PYTHON)',
	// 	'#UX/UI',
	// 	"#MA'LUMOTLAR TAHLILI",
	// 	'#DEVOPS MUHANDISI',
	// 	'#MOBIL DEVS (FLUTTER)',
	// 	"#O'YIN ISHLAB CHIQARUVCHILARI",
	// 	'#LOYIHA MENEJERLARI',
	// 	'#MARKETING MENEJERLARI',
	// 	'#QA MUHANDISLARI',
	// 	'#KONTENT MENEJERI',
	// 	'#3D DIZAYNLAR',
	// 	'#KOLORISTLAR',
	// 	'#VIDEO MUHARRIRLARI',
	// ]
	return (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl'>
					{vacancy.map((role) => (
						<div
							key={role._id}
							className='bg-gray-900 border border-gray-700 text-center py-4 px-4 rounded-lg shadow-md hover:bg-gray-800 transition cursor-pointer'
						>
					<Link href={`/${lng}/career`}>
							#{role.title}
					</Link>
						</div>
					))}
				</div>

	)
}

export default Career
