"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export default function EnhancedHeroSection() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const heroImages = [
    "/almani/images/baby-clothes.jpg",
    "/almani/images/baby-onesie.jpg", 
    "/almani/images/baby-bonnet.jpg",
    "/almani/images/soft-baby-doll.jpg"
  ]

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className={`space-y-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-slate-600">
                  {language === "fa" ? "برند آلمانی" : "Deutsche Marke"}
                </span>
              </div>
              
              <h1 className={`text-5xl lg:text-7xl font-bold leading-tight ${language === "fa" ? "font-bold" : "font-serif"}`}>
                <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Le Petit
                </span>
                <br />
                <span className="text-slate-600 text-3xl lg:text-4xl font-light">
                  {language === "fa" ? "ایزنبورگ" : "Isenburg"}
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                {language === "fa" 
                  ? "جایی که عشق، کیفیت و زیبایی در کنار هم قرار می‌گیرند تا بهترین لحظات کودکی را خلق کنند"
                  : "Wo Liebe, Qualität und Schönheit zusammenkommen, um die schönsten Momente der Kindheit zu schaffen"
                }
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <span className="flex items-center gap-2">
                  {language === "fa" ? "کاوش محصولات" : "Produkte entdecken"}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-2xl font-semibold border border-white/20 hover:bg-white/90 transition-all duration-300">
                {language === "fa" ? "درباره ما" : "Über uns"}
              </button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className={`relative ${isLoaded ? 'animate-fade-in-right' : 'opacity-0'}`} style={{animationDelay: '200ms'}}>
            <div className="relative w-full h-[600px]">
              
              {/* Main Image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Hero ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 animate-float">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100%</div>
                  <div className="text-xs text-slate-600">
                    {language === "fa" ? "ایمن" : "Sicher"}
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 w-40 h-24 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">4.9/5</div>
                    <div className="text-xs text-slate-600">
                      {language === "fa" ? "رضایت" : "Zufrieden"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? "bg-white w-8" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}