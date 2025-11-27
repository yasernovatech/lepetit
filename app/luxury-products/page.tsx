"use client"

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useLanguage } from '@/components/language-provider'

const MinimalShop = dynamic(() => import('../../pro/components/kokonutui/minimal-shop'), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div></div>
})

export default function LuxuryProductsPage() {
  const { t, language } = useLanguage()

  useEffect(() => {
    const title = t.pages?.luxuryProducts?.metaTitle || (language === 'fa' ? 'محصولات لاگچری' : 'Luxury Products')
    const desc = t.pages?.luxuryProducts?.metaDescription || ''
    document.title = title
    const metaDesc = document.querySelector("meta[name='description']")
    if (metaDesc) metaDesc.setAttribute('content', desc)
  }, [t, language])

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden pt-12">
      <div className="w-full max-w-none px-0">
        <MinimalShop />
      </div>
    </main>
  )
}
