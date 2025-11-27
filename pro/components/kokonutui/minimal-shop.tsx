"use client"

import ProductGrid from './product-grid'
import { useLanguage } from '@/components/language-provider'

export default function MinimalShop() {
  const { language } = useLanguage()
  
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C4956C] mb-4">
            {language === 'fa' ? 'محصولات ما' : 'Unsere Produkte'}
          </h1>
          <p className="text-gray-600 text-lg">
            {language === 'fa' ? 'لباس و اسباب بازی باکیفیت نوزاد و کودک' : 'Hochwertige Babykleidung und Kindermode'}
          </p>
        </div>
        <ProductGrid />
      </div>
    </div>
  )
}
