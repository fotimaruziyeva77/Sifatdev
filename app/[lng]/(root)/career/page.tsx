'use client'
import React from 'react'
import { motion } from 'motion/react'
import StarShower from '../_components/star-shower'
import { ArrowRight, CalendarDays, Clock, CreditCard } from 'lucide-react'
import Link from 'next/link'
function Page() {
	  const jobs = [
    {
      slug: "ui-ux-designer",
      title: "🎇 Middle UI/UX designer",
      days: "MONDAY - FRIDAY",
      time: "09:00 - 18:00",
      salary: "10 000 000 - 15 000 000",
    },
    {
      slug: "backend-software-engineer",
      title: "Middle Backend Software Engineer",
      days: "MONDAY - FRIDAY",
      time: "09:00 - 18:00",
      salary: "15 000 000 - 20 000 000",
    },
    {
      slug: "flutter-software-engineer",
      title: "Middle Flutter Software Engineer",
      days: "MONDAY - FRIDAY",
      time: "09:00 - 18:00",
      salary: "15 000 000 - 20 000 000",
    },
  ];
	return (
		<div className='mt-20 min-h-screen px-6 mb-10 text-white'>
			<div className='relative flex items-center justify-center h-40 sm:h-52 md:h-64 lg:h-72 overflow-hidden mt-16'>
				{/* Fon yozuvi */}
				<h1 className='absolute text-[40px] sm:text-[80px] md:text-[140px] lg:text-[180px] font-extrabold text-gray-700/10 select-none'>
					Career
				</h1>

				{/* Asosiy title */}
				<motion.h1
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='relative text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold 
					bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 
					bg-clip-text text-transparent animate-gradient z-10 text-center px-2'
				>
					Career
				</motion.h1>

				{/* Yulduzcha animatsiya */}
				<div className='absolute inset-0 z-[11] pointer-events-none'>
					<StarShower height={300} count={120} size={1.5} width={2000} />
				</div>
			</div>
      <div className='container max-w-6xl mx-auto px-4 mt-10'>

			<div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition"
          >
            {/* Title */}
            <h2 className="text-lg font-semibold text-white mb-4">{job.title}</h2>

            {/* Info */}
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>{job.days}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{job.time}</span>
              </div>
            </div>

            {/* Salary */}
            <div className="mt-6 flex items-center justify-between bg-gray-900 rounded-lg p-3">
              <div className="flex items-center gap-2 text-green-400 font-semibold">
                <CreditCard className="w-5 h-5" />
                <span>{job.salary}</span>
              </div>
              <Link
                href={`/career/${job.slug}`}
                className="bg-teal-500 hover:bg-teal-600 p-2 rounded-full"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
            </div>
            </div>
        ))}
      </div>
      </div>
		</div>
	)
}

export default Page