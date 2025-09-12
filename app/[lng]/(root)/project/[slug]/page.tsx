'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Home, Blocks, ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { ProjectTypes } from '@/interfaces'
import { Skeleton } from '@/components/ui/skeleton'
import { t } from 'i18next'

function Page() {
  const [portfolio, setPortfolio] = useState<ProjectTypes[]>([])
  const [loading, setLoading] = useState(true)
  const { lng } = useParams()
  const params = useParams()
  const router = useRouter()

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[‘’ʻ`]/g, "'")
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9'-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const slug = slugify(decodeURIComponent(params.slug as string))

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/projects/${slug}`)
        if (Array.isArray(res.data.data)) {
          setPortfolio(res.data.data)
        } else if (res.data) {
          setPortfolio([res.data.data])
        } else {
          setPortfolio([])
        }
      } catch (err) {
        console.error(err)
        setPortfolio([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb and Back Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/70"
          >
            <ArrowLeft className="w-5 h-5" />
           {t('common.back')}
          </button>
          
          <Breadcrumb>
            <BreadcrumbList className="flex items-center gap-2 bg-gray-800/70 px-4 py-2 rounded-lg">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href='/'
                  className='flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors'
                >
                  <Home className='w-4 h-4' />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className='text-gray-400' />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/${lng}/project`}
                  className='flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors'
                >
                  <Blocks className='w-4 h-4' />
                  Projects
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='text-gray-400' />
              <BreadcrumbItem>
                <BreadcrumbPage className='text-white font-medium truncate max-w-[120px] sm:max-w-xs'>
                  {loading ? 'Loading...' : (portfolio[0]?.title || 'Project')}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {loading ? (
          <div className="bg-gray-800/50 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
            <Skeleton className="w-full h-72 bg-gray-700/50" />
            <div className="p-6 space-y-6">
              <div className="flex flex-col gap-4">
                <Skeleton className="h-8 w-3/4 bg-gray-700/50" />
                <Skeleton className="h-6 w-1/2 bg-gray-700/50" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-gray-700/50" />
                <Skeleton className="h-4 w-full bg-gray-700/50" />
                <Skeleton className="h-4 w-2/3 bg-gray-700/50" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-20 rounded-full bg-gray-700/50" />
                ))}
              </div>
            </div>
          </div>
        ) : portfolio.length === 0 ? (
          <div className="text-center py-20">
            <Blocks className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-200 mb-2">Project Not Found</h2>
            <p className="text-gray-400 mb-6">The project youre looking for doesnt exist or may have been removed.</p>
            <button
              onClick={() => router.push(`/${lng}/project`)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors font-medium"
            >
              Back to Projects
            </button>
          </div>
        ) : (
          portfolio.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800/50 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-gray-700/30"
            >
              <div className="relative">
                <div className="aspect-video w-full relative overflow-hidden">
                  <Image
                    src={item.image || '/fallback.jpg'}
                    alt={item.title || 'Project Image'}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-blue-500/90 text-white text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-medium">
                      {item.category?.title || 'Uncategorized'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex flex-col gap-4">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {item.title}
                  </h1>
                  
                 
                </div>

                <div
                  className="prose prose-invert prose-lg max-w-none text-gray-300"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />

                {item.technologies && item.technologies.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech._id}
                          className="px-3 py-1.5 text-sm rounded-full bg-gray-700/60 text-gray-200 border border-gray-600/50"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Page