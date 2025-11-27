"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-[#C4956C]">{product.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-gray-600 mb-4">{product.category}</p>
              <p className="text-4xl font-bold text-[#C4956C] mb-6">{product.price} €</p>
              
              <button className="w-full bg-[#C4956C] text-white py-4 rounded-lg font-semibold hover:bg-[#B8885A] transition-colors">
                In den Warenkorb
              </button>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-2">Produktbeschreibung</h3>
                <p className="text-gray-600">
                  Hochwertige Qualität, Made in Germany. Perfekt für Ihr Baby.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
