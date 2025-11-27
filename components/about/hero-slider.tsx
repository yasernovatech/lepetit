"use client"

import { useState, useEffect, memo, useCallback, useMemo } from "react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

const heroImages = [
  "/images/bb.webp",
  "/images/jj.webp"
] as const

export const HeroSlider = memo(() => {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-8 px-4 md:px-8 bg-gray-50 mt-16 sm:mt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="relative h-[30vh] sm:h-[40vh] md:h-[45vh] overflow-hidden rounded-2xl shadow-lg bg-white">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-contain rounded-2xl gpu-accelerated bg-white"
                unoptimized
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          ))}
          
          
          {/* Navigation Arrows */}
          <button
            onClick={useCallback(() => setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length), [])}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-900 text-white rounded-full p-1 sm:p-2 shadow-lg transition-all z-10"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={useCallback(() => setCurrentIndex((prev) => (prev + 1) % heroImages.length), [])}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-900 text-white rounded-full p-1 sm:p-2 shadow-lg transition-all z-10"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

HeroSlider.displayName = "HeroSlider"