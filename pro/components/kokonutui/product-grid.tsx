"use client"

import { useState } from "react"
import { products } from "./data"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { useRouter } from "next/navigation"

export default function ProductGrid() {
  const [filter, setFilter] = useState("all")
  const { language } = useLanguage()
  const router = useRouter()

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(p => p.category === filter)

  const filters = [
    { id: 'all', fa: 'همه', de: 'Alle' },
    { id: 'Clothing', fa: 'لباس', de: 'Kleidung' },
    { id: 'Toys', fa: 'اسباب بازی', de: 'Spielzeug' },
    { id: 'Accessories', fa: 'لوازم جانبی', de: 'Zubehör' }
  ]

  return (
    <div>
      <div className="flex gap-4 mb-8 justify-center flex-wrap">
        {filters.map(f => (
          <button 
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-lg transition-all font-medium ${filter === f.id ? "bg-[#C4956C] text-white shadow-lg" : "bg-white hover:bg-gray-50 text-gray-700"}`}
          >
            {language === 'fa' ? f.fa : f.de}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/luxury-products/${product.id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={product.image}
                  alt={language === 'fa' ? (product.name_fa || product.name) : (product.name_de || product.name)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                  {language === 'fa' ? (product.name_fa || product.name) : (product.name_de || product.name)}
                </h3>
                <p className="text-gray-500 text-xs mb-2">
                  {language === 'fa' ? (product.category === 'Clothing' ? 'لباس' : product.category === 'Toys' ? 'اسباب بازی' : 'لوازم جانبی') : product.category}
                </p>
                <div className="flex gap-1">
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const text = encodeURIComponent(`${language === 'fa' ? 'سلام\nمیخواهم این محصول را سفارش دهم:\n\n' : 'Hallo\nIch möchte dieses Produkt bestellen:\n\n'}${language === 'fa' ? product.name_fa || product.name : product.name_de || product.name}\n\n${language === 'fa' ? 'لطفا قیمت و آدرس فروشگاه را برایم بفرستید' : 'Bitte senden Sie mir den Preis und die Geschäftsadresse'}`)
                      window.open(`https://wa.me/4915209726688?text=${text}`, '_blank')
                    }}
                    className="flex-1 bg-[#C4956C] text-white py-1.5 rounded-lg text-xs hover:bg-[#B8885A] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {language === 'fa' ? 'سفارش' : 'Bestellen'}
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      router.push('/location')
                    }}
                    className="flex-1 bg-[#C4956C] text-white py-1.5 rounded-lg text-xs hover:bg-[#B8885A] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {language === 'fa' ? 'موقعیت' : 'Standort'}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>


    </div>
  )
}
