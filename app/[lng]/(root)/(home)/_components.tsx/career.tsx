'use client'
import React from 'react'
function Career() {
	const roles = [
		'#FRONT-END (VUE3)',
		'#BACK-END (PYTHON)',
		'#UX/UI',
		"#MA'LUMOTLAR TAHLILI",
		'#DEVOPS MUHANDISI',
		'#MOBIL DEVS (FLUTTER)',
		"#O'YIN ISHLAB CHIQARUVCHILARI",
		'#LOYIHA MENEJERLARI',
		'#MARKETING MENEJERLARI',
		'#QA MUHANDISLARI',
		'#KONTENT MENEJERI',
		'#3D DIZAYNLAR',
		'#KOLORISTLAR',
		'#VIDEO MUHARRIRLARI',
	]
	return (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl'>
					{roles.map((role, index) => (
						<div
							key={index}
							className='bg-gray-900 border border-gray-700 text-center py-4 px-4 rounded-lg shadow-md hover:bg-gray-800 transition cursor-pointer'
						>
							{role}
						</div>
					))}
				</div>

	)
}

export default Career
