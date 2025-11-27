"use client"

import { useEffect } from 'react'
import MinimalShop from '../../pro/components/kokonutui/minimal-shop'
import { useLanguage } from '@/components/language-provider'

export default function ProPreviewPage() {
  const { t, language } = useLanguage()

  useEffect(() => {
    const title = t.pages?.proPreview?.metaTitle || (language === 'fa' ? 'پیش‌نمایش Pro' : 'Pro Preview')
    const desc = t.pages?.proPreview?.metaDescription || ''
    document.title = title
    const metaDesc = document.querySelector("meta[name='description']")
    if (metaDesc) metaDesc.setAttribute('content', desc)
  }, [t, language])

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">{t.pages?.proPreview?.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.pages?.proPreview?.description}</p>
        </header>

        <MinimalShop />
      </div>
    </main>
  )
}
