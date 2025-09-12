'use client'
import useTranslate from '@/hooks/use-translate'
import { ServiceTypes } from '@/interfaces'
import axios from 'axios'
import { LucideLoader, LucideRocket, LucideArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

type ServicesErrors = {
  fullName?: string
  phoneNumber?: string
  description?: string
}

export default function ServiceSlug() {
  const params = useParams()
  const router = useRouter()
  const [services, setServices] = useState<ServiceTypes | null>(null)
  const [loading, setLoading] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [fullName, setFullName] = useState('')
  const [description, setDescription] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errors, setErrors] = useState<ServicesErrors>({})
  const { lng } = useParams()
  const t = useTranslate()

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
        const res = await axios.get(`/api/services/${slug}`, {
          headers: {
            'Accept-Language': lng,
          },
        })

        setServices(res.data.data)
      } catch (err) {
        console.error(err)
        setServices(null)
      }
    }
    fetchData()
  }, [slug, lng])

  const resetData = () => {
    setCompanyName('')
    setFullName('')
    setPhoneNumber('')
    setDescription('')
  }

  const contactSchema = z.object({
    fullName: z.string().min(3, t('notification.contactwarning.fullname')),
    phoneNumber: z
      .string()
      .regex(/^\+998[0-9]{9}$/, t('notification.contactwarning.phonenumber')),
    description: z.string().min(5, t('notification.contactwarning.message')),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = contactSchema.safeParse({
      fullName,
      phoneNumber,
      description,
    })

    if (!validation.success) {
      const fieldErrors: ServicesErrors = {}
      validation.error.issues.forEach(err => {
        const field = err.path[0] as keyof ServicesErrors
        fieldErrors[field] = err.message
        toast.warning(err.message, {
          position: 'top-center',
          richColors: true,
        })
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setLoading(true)
    try {
      await axios.post('/api/services-contact', {
        companyName,
        service: services?.title,
        name: fullName,
        description,
        phoneNumber,
      })
      toast.success(t('success.contactmessage'), {
        position: 'top-center',
        richColors: true,
      })
      resetData()
    } catch (err) {
      toast.error(t('error.contacterror'), {
        position: 'top-center',
        richColors: true,
      })
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B192C] via-[#0D1F36] to-[#0A1729] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-white">
        {/* Back button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <LucideArrowLeft className="w-5 h-5 mr-2" />
          {t('common.back')}
        </button>
<br />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Service details */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gradient-to-br from-[#0f172acc] to-[#04194D] p-6 rounded-2xl shadow-lg border border-blue-800/30">
              <h2 className="text-sm text-blue-400 font-semibold mb-2 uppercase tracking-wider">
                {t('servicesdetails.tit')}
              </h2>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {services?.title}
              </h1>

              <p className="text-gray-300 leading-relaxed mb-6">
                {t('servicesdetails.des')}
              </p>

              <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-6"></div>

              {/* Service features */}
              {/* <div className="space-y-4">
                <div className="flex items-start">
                  <LucideCheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">24/7 Expert Support</span>
                </div>
                <div className="flex items-start">
                  <LucideCheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Customized Solutions</span>
                </div>
                <div className="flex items-start">
                  <LucideCheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Fast Implementation</span>
                </div>
              </div> */}
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0f172acc] p-4 rounded-xl text-center border border-blue-800/30">
                <div className="flex justify-center">
                  <LucideUsers className="w-8 h-8 text-blue-400 mb-2" />
                </div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-gray-400">Happy Clients</div>
              </div>
              <div className="bg-[#0f172acc] p-4 rounded-xl text-center border border-blue-800/30">
                <div className="flex justify-center">
                  <LucideStar className="w-8 h-8 text-yellow-400 mb-2" />
                </div>
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-xs text-gray-400">Customer Rating</div>
              </div>
            </div> */}
          </div>

          {/* Right side - Contact form */}
          <div className="lg:col-span-2 text-white">
            <div className="bg-gradient-to-br from-[#0f172acc] to-[#04194D] p-8 rounded-2xl shadow-lg border border-blue-800/30">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {t('contact.form.title') || "Request a Consultation"}
                </h2>
                
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      {t('servicesdetails.res1')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      placeholder={t('servicesdetails.res1')}
                      className="w-full px-4 py-3 rounded-lg bg-[#0f172acc] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-800/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      {t('servicesdetails.res2')} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder={t('servicesdetails.res2')}
                      className="w-full px-4 py-3 rounded-lg bg-[#0f172acc] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-800/30 transition"
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    {t('servicesdetails.res3')} *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={phoneNumber}
                    placeholder="+998 XX XXX XX XX"
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#0f172acc] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-800/30 transition"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    {t('servicesdetails.res4')} *
                  </label>
                  <textarea
                    name="description"
                    value={description}
                    rows={4}
                    onChange={e => setDescription(e.target.value)}
                    placeholder={t('servicesdetails.res4')}
                    className="w-full px-4 py-3 rounded-lg bg-[#0f172acc] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-800/30 transition resize-none"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs mt-1">{errors.description}</p>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-[#0f172acc] hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                  >
                    {loading ? (
                      <>
                        <LucideLoader className="w-5 h-5 animate-spin" />
                        {t('servicesdetails.send')}
                      </>
                    ) : (
                      <>
                        {t('servicesdetails.submit')}
                        <LucideRocket className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Additional info */}
            {/* <div className="mt-8 bg-gradient-to-br from-[#0f172acc] to-[#04194D] p-6 rounded-2xl shadow-lg border border-blue-800/30">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-900/30 p-3 rounded-full">
                  <LucideCalendar className="w-6 h-6 text-blue-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium">
                    {t('servicesdetails.responseTime') || "Quick Response Time"}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t('servicesdetails.responseGuarantee') || "We guarantee to respond to your inquiry within 24 hours"}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}