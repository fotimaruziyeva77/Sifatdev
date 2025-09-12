'use client'

import { useEffect, useState } from 'react'
import StarShower from '../_components/star-shower'
import axios from 'axios'
import { motion } from 'motion/react'
import useTranslate from '@/hooks/use-translate'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ServiceTypes } from '@/interfaces'
import Image from 'next/image'

export default function Service() {
  const [services, setServices] = useState<ServiceTypes[]>([])
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const t = useTranslate()
  const { lng } = useParams()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/services')
        setServices(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  // Service icons for different service types
  // const serviceIcons = {
  //   development: <Rocket className="w-6 h-6" />,
  //   design: <Zap className="w-6 h-6" />,
  //   marketing: <Users className="w-6 h-6" />,
  //   support: <Shield className="w-6 h-6" />,
  //   default: <CheckCircle className="w-6 h-6" />
  // }

  // const getServiceIcon = (title: string) => {
  //   if (title.toLowerCase().includes('development')) return serviceIcons.development
  //   if (title.toLowerCase().includes('design')) return serviceIcons.design
  //   if (title.toLowerCase().includes('marketing')) return serviceIcons.marketing
  //   if (title.toLowerCase().includes('support')) return serviceIcons.support
  //   return serviceIcons.default
  // }

  return (
    <div className="min-h-screen px-4 md:px-6 mb-10 bg-gradient-to-b from-[#0A1428] to-[#0B192C]">
      {/* Hero Section */}
      <div className="relative flex items-center justify-center h-48 sm:h-60 md:h-72 overflow-hidden ">
        <h1 className="absolute text-[60px] sm:text-[100px] md:text-[160px] lg:text-[200px] font-extrabold text-gray-700/10 select-none tracking-tight">
          {t('navitem.service')}
        </h1>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-2xl sm:text-4xl md:text-6xl font-extrabold 
          bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 
          bg-clip-text text-transparent animate-gradient z-10 text-center px-2"
        >
          {t('navitem.service')}
        </motion.h1>

        {/* Yulduzcha animatsiya */}
        <div className="absolute inset-0 z-[11] pointer-events-none">
          <StarShower height={300} count={120} size={1.5} width={2000} />
        </div>
      </div>

      {/* Introduction Text */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="max-w-3xl mx-auto text-center px-4 mb-16 mt-8"
      >
        
      </motion.div>

      {/* Services Grid Section */}
      <section className="text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('services.section_t')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onMouseEnter={() => setHoveredCard(item._id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-gradient-to-br from-[#0f172acc] to-[#04194D] rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-800/30"
              >
                {/* Hover effect background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${hoveredCard === item._id ? 'opacity-100' : ''}`}></div>
                
                {/* Icon */}
                
                
                {/* Content */}
                <div className="relative z-10 cursor-pointer">
									<Image src={item.icon} alt={item.title} width={350} height={450} /> <br />
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div 
                    className="text-gray-300 text-sm leading-relaxed line-clamp-4 mb-5 group-hover:text-gray-200 transition-colors duration-300"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  
                  <div className="flex items-center justify-between mt-6">
                    <Link href={`/${lng}/service/${item.slug}`}>
                      <button className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300 group-hover:translate-x-1 transform ">
                        {t('services.read_more')} <ArrowRight size={16} />
                      </button>
                    </Link>
                    
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock size={14} className="mr-1" />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
                
                {/* Shine effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ${hoveredCard === item._id ? 'translate-x-[100%] cursor-pointer' : ''}`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      
    </div>
  )
}