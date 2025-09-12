'use client'

import { motion, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import StarShower from '../_components/star-shower'
import Link from 'next/link'
import Image from 'next/image'
import { Rocket, Users, BookOpen, Globe } from 'lucide-react'
import useTranslate from '@/hooks/use-translate'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Career from '../(home)/_components.tsx/career'
import { ServiceTypes } from '@/interfaces'

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
  const { lng } = useParams()

  const [services, setServices] = useState<ServiceTypes[]>([])
  const t = useTranslate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/services/', {
          headers: {
            'Accept-Language': lng,
          },
        })
        setServices(res.data.data || [])
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [lng])

  if (!services || services.length === 0) return null

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
              <h1 className='text-3xl md:text-5xl font-bold tracking-tight leading-tight'>
                <span className='text-blue-400'>{t('about.sifatdev')}</span> —{' '}
                {t('about.feature')}
                <span className='text-primary'> {t('about.code')} </span>{' '}
                {t('about.world')}
              </h1>
              <p className='mt-4 text-muted-foreground md:text-lg max-w-2xl'>
                {t('about.description')}
              </p>

              {/* Statistika */}
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8'>
                {[
                  { value: '50+', label: t('about.stats.projects') },
                  { value: '200+', label: t('about.stats.participants') },
                  { value: '5 +', label: t('about.stats.experience') },
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
      
      {/* Services Section with Images */}
      <div className='container max-w-6xl mx-auto px-4 mb-10'>
        <h1 className='text-2xl md:text-3xl font-bold mb-8'>
          {t('about.title1')} {services.length}{' '}
          {t('about.title2')}
        </h1>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className='group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
            >
              {/* Service Image */}
              <div className='relative h-48 w-full overflow-hidden'>
                <Image
                  src={item.icon || '/assets/service-placeholder.jpg'}
                  alt={item.title}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70'></div>
                <div className='absolute bottom-4 left-4'>
									<Link href={`/${lng}/services#${item.slug}`}>
									
                  <h3 className='text-xl font-bold text-white'>{item.title}</h3>
									</Link>
                </div>
              </div>
              
              {/* Service Content */}
              <div className='p-6'>
                <div 
                  className='text-gray-300 text-sm leading-relaxed line-clamp-4'
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className='mt-4 flex justify-end'>
                  <Link href={`/${lng}/services#${item.slug}`}>
                    <Button variant='outline' size='sm' className='border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'>
                      {t('blog.read_more')}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className='container max-w-6xl mx-auto px-4 mb-10'>
        <h1 className='text-2xl md:text-3xl font-bold mb-8 '>
          {t('about.title3')}
        </h1>
        <Career />
      </div>
    </main>
  )
}