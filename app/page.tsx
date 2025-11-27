"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useMemo, memo, useState, useEffect, useCallback } from "react"
import { products as shopProducts } from "@/pro/components/kokonutui/data"
import dynamic from "next/dynamic"

const OptionsSelector = dynamic(() => import("@/components/options-selector"), { ssr: false })

// Remove ArcGalleryHero import as we are replacing it
// const ArcGalleryHero = dynamic(() => import("@/components/arc-gallery-hero"), {
//   loading: () => <div className="h-96 bg-[#FAF9F6] animate-pulse" />,
//   ssr: false
// })

function HomeComponent() {
  const { t, language } = useLanguage()
  const products = useMemo(() => shopProducts.slice(0, 8), [])
  const [currentIndex, setCurrentIndex] = useState(0)

  const heroImages = useMemo(() => [
    "/images/IMG_0410.webp",
    "/images/IMG_0426.webp",
    "/images/IMG_0422.webp"
  ], [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const socialImages = useMemo(() => [
    "/images/baby-clothes.jpg",
    "/images/baby-onesie.jpg", 
    "/images/baby-bonnet.jpg",
    "/images/soft-baby-doll.jpg"
  ], [])

  return (
    <main className="min-h-screen overflow-x-hidden w-full max-w-full">
      {/* Hero Slider Section */}
      <section className="py-48 px-4 md:px-8 bg-[#F7F3EF] -mt-20 pt-48" itemScope itemType="https://schema.org/ImageGallery">
        <div className="container mx-auto max-w-7xl">
          <div className="relative h-[75vh] md:h-[85vh] overflow-hidden rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-[#C4956C] to-[#B8885A]">
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
                  className="object-cover rounded-3xl"
                  unoptimized
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                />
              </div>
            ))}
            
            {/* Navigation Arrows */}
            <button
              onClick={useCallback(() => setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length), [heroImages.length])}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={useCallback(() => setCurrentIndex((prev) => (prev + 1) % heroImages.length), [heroImages.length])}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid - Improved Spacing & Typography */}
      <section className="py-12 px-2 sm:px-4 md:px-6 lg:px-8 bg-[#F7F3EF]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-2 space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C4956C]" />
              <h2 className="text-lg md:text-xl font-bold text-[#C4956C] tracking-wider">
              {language === "fa" ? "دسته‌بندی محصولات" : "Shop Collections"}
              </h2>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C4956C]" />
            </div>
          </div>

          <OptionsSelector />
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="pt-6 pb-6 px-2 sm:px-4 bg-[#F7F3EF]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6 space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C4956C]" />
              <h2 className="text-lg md:text-xl font-bold text-[#C4956C] tracking-wider">
              {language === "fa" ? "محصولات محبوب" : "Beliebte Produkte"}
              </h2>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C4956C]" />
            </div>
            <p className="text-xs md:text-sm text-neutral-500">
              {language === "fa" ? "محصولات با امتیاز بالای 4.5" : "Produkte mit einer Gesamtbewertung über 4.5"}
            </p>
          </div>

          <div className="relative group">
            <button onClick={() => {
              const container = document.querySelector('.products-scroll');
              if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
            }} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/95 hover:bg-black text-white shadow-xl rounded-full p-1.5 md:p-2 transition-all">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => {
              const container = document.querySelector('.products-scroll');
              if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
            }} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/95 hover:bg-black text-white shadow-xl rounded-full p-1.5 md:p-2 transition-all">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="overflow-x-auto scrollbar-hide products-scroll">
              <div className="flex gap-2">
                {[...products, ...products].map((product, index) => (
                  <Link key={`product-${index}`} href={`/luxury-products/${product.id}`} className="group flex-shrink-0 w-32 md:w-40">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="relative aspect-[3/4] bg-neutral-50">
                        <Image
                          src={product.image}
                          alt={language === "fa" ? (product.name_fa || product.name) : (product.name_de || product.name)}
                          fill
                          unoptimized
                          loading="lazy"
                          className="object-cover"
                          sizes="(max-width: 768px) 128px, 160px"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="text-xs font-medium text-neutral-900 mb-1 line-clamp-1">
                          {language === "fa" ? (product.name_fa || product.name) : (product.name_de || product.name)}
                        </h3>
                        <div className="flex items-center justify-center mb-2">
                          <div className="flex items-center gap-1">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-2 h-2 fill-current" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-[8px] text-neutral-500">4.8</span>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const text = encodeURIComponent(`${language === "fa" ? 'سلام\nمیخواهم این محصول را سفارش دهم:\n\n' : 'Hallo\nIch möchte dieses Produkt bestellen:\n\n'}${language === "fa" ? product.name_fa || product.name : product.name_de || product.name}\n\n${language === "fa" ? 'لطفا قیمت و آدرس فروشگاه را برایم بفرستید' : 'Bitte senden Sie mir den Preis und die Geschäftsadresse'}`);
                            window.open(`https://wa.me/4915209726688?text=${text}`, '_blank');
                          }}
                          className="group relative w-3/4 mx-auto bg-gradient-to-r from-[#C4956C] via-[#B8885A] to-[#C4956C] hover:from-[#B8885A] hover:via-[#C4956C] hover:to-[#B8885A] text-[#F7F3EF] text-[9px] font-semibold py-1.5 px-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 border border-[#C4956C]/30 hover:border-[#F7F3EF]/50"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-1">
                            <svg className="w-2.5 h-2.5 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            {language === "fa" ? "سفارش" : "Bestellen"}
                          </span>
                          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Large Feature/Lifestyle Section */}
      <section className="pt-20 pb-12 px-2 sm:px-4 md:px-6 lg:px-8 bg-[#F7F3EF]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6 space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C4956C]" />
              <h2 className="text-lg md:text-xl font-bold text-[#C4956C] tracking-wider">
              {language === "fa" ? "کالکشن ویژه" : "Spezielle Kollektion"}
              </h2>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C4956C]" />
            </div>
          </div>
        </div>
        <div className="relative h-[60vh] md:h-[75vh] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl group bg-gray-100">
          <Image 
            src="/images/IMG_0416.webp" 
            alt="Lifestyle Interior" 
            fill 
            loading="lazy" 
            unoptimized
            sizes="100vw"
            quality={85}
            className="object-contain transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent"></div>
          <div className="absolute inset-0 flex items-end p-4 md:p-12">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 md:p-6 max-w-md space-y-3">
              <h2 className="text-xl md:text-2xl text-white leading-tight font-bold">
                {language === "fa" ? "بهترین انتخاب برای فرشته کوچک شما" : "Die beste Wahl für Ihren kleinen Engel"}
              </h2>
              <p className="text-sm md:text-base text-white/90 leading-snug">
                {language === "fa" ? "محصولات ایمن و باکیفیت" : "Sichere und hochwertige Produkte"}
              </p>
              <Button className="bg-[#C4956C] text-[#F7F3EF] hover:bg-[#B8885A] rounded-full px-6 h-10 text-sm font-bold transition-all hover:scale-105 hover:shadow-xl">
                {language === "fa" ? "مشاهده محصولات" : "Produkte ansehen"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Room Gallery Section */}
      <section className="pt-20 pb-12 px-2 md:px-4 bg-[#F7F3EF] overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          {/* Title */}
          <div className="text-center mb-4 md:mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C4956C]" />
              <h2 className="text-lg md:text-xl font-bold text-[#C4956C] tracking-wider uppercase">
                LE PETIT COLLECTION
              </h2>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C4956C]" />
            </div>
          </div>

          {/* Diagonal Image Gallery */}
          <div className="relative h-[250px] md:h-[320px] lg:h-[400px] overflow-x-auto scrollbar-thin">
            <div className="flex items-center justify-start md:justify-center h-full">
              {/* Image Cards */}
              <div className="flex gap-2 md:gap-4 lg:gap-6 px-4 md:px-20 min-w-max">
                {[
                  "/images/baby-onesie.jpg",
                  "/images/soft-baby-doll.jpg",
                  "/images/baby-accessories.jpg",
                  "/images/baby-bonnet.jpg",
                  "/images/baby-gear.jpg",
                  "/images/baby-socks.jpg",
                  "/images/baby-clothes.jpg"
                ].map((image, index) => (
                  <div
                    key={index}
                    className="relative w-16 sm:w-20 md:w-32 lg:w-36 h-40 sm:h-48 md:h-64 lg:h-80 bg-white shadow-2xl hover:shadow-3xl overflow-hidden group hover:scale-105 transition-all duration-500 flex-shrink-0"
                    style={{
                      transform: `skew(-12deg) translateY(${index % 2 === 0 ? '10px' : '-10px'})`,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Modern Room ${index + 1}`}
                      fill
                      unoptimized
                      loading="lazy"
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 144px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Showcase Section */}
      <section className="relative pt-40 pb-12 px-2 sm:px-4 overflow-hidden bg-[#F7F3EF]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C4956C]" />
              <h2 className="text-lg md:text-xl font-bold text-[#C4956C] tracking-wider">
              {language === "fa" ? "تماس با ما" : "Kontakt"}
              </h2>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C4956C]" />
            </div>
          </div>
        </div>
        
        <div className="container mx-auto max-w-[1400px] relative z-10">
          {/* Vertical Lines - Extended */}
          <div className="absolute left-[36%] -top-20 -bottom-20 w-[1px] bg-[#C4956C]/20" />
          <div className="absolute right-[36%] -top-20 -bottom-20 w-[1px] bg-[#C4956C]/20" />
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Left Card - Property Image */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="border border-[#C4956C] bg-[#F7F3EF] p-0.5 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
                  <div className="border border-[#C4956C]">
                    <div className="relative w-[280px] h-[200px] overflow-hidden">
                    <Image
                      src="/images/cc.webp"
                      alt="Product Showcase"
                      fill
                      unoptimized
                      loading="lazy"
                      sizes="280px"
                      className="object-cover"
                    />
                    </div>
                  </div>
                </div>
              </div>
              {/* Contact Info */}
              <div className="mt-6 space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 text-[#F7F3EF]/90">
                  <svg className="w-4 h-4 text-[#F7F3EF]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm">+49 152 09726688</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#F7F3EF]/90">
                  <svg className="w-4 h-4 text-[#F7F3EF]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm">info@lepetit.de</span>
                </div>
              </div>
            </div>

            {/* Center Card - Profile */}
            <div className="flex flex-col items-center">
              {/* Profile Image */}
              <div className="relative group mb-8">
                <div className="border border-[#8B6F47] bg-[#8B6F47] p-0.5 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
                  <div className="border border-[#8B6F47]">
                    <div className="relative w-[240px] h-[280px] overflow-hidden bg-[#8B6F47]">
                    <Image
                      src="/images/p.png"
                      alt="Featured Product"
                      fill
                      unoptimized
                      loading="lazy"
                      sizes="240px"
                      className="object-cover"
                    />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Name & Title */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-[#F7F3EF] uppercase tracking-wider">
                  LE PETIT
                </h3>
                <p className="text-sm text-[#F7F3EF]/80 uppercase tracking-widest font-semibold">
                  {language === "fa" ? "محصولات نوزاد و کودک" : "Baby & Kids Products"}
                </p>
              </div>
            </div>

            {/* Right Card - Property Image */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="border border-[#C4956C] bg-[#F7F3EF] p-0.5 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
                  <div className="border border-[#C4956C]">
                    <div className="relative w-[280px] h-[200px] overflow-hidden">
                    <Image
                      src="/images/bb.webp"
                      alt="Product Showcase"
                      fill
                      unoptimized
                      loading="lazy"
                      sizes="280px"
                      className="object-cover"
                    />
                    </div>
                  </div>
                </div>
              </div>
              {/* Contact Info */}
              <div className="mt-6 space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 text-[#F7F3EF]/90">
                  <svg className="w-4 h-4 text-[#F7F3EF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Friedhofstrasse 23, 63263 Neu-Isenburg</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#F7F3EF]/90">
                  <svg className="w-4 h-4 text-[#F7F3EF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">www.lepetit.de</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </main>
  )
}

export default memo(HomeComponent)