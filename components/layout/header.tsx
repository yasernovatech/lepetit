"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X, Globe } from "lucide-react"
import { useState, memo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOverHero, setIsOverHero] = useState(true)
  const { t, language, setLanguage, dir } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8
      setIsOverHero(window.scrollY < heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "fa" ? "de" : "fa")
  }

  return (
    <header className="fixed top-0 z-50 w-full px-4">
      <div className="bg-gradient-to-r from-[#C4956C] to-[#B8885A] backdrop-blur-md text-[#F7F3EF] transition-all duration-500 rounded-xl mx-auto max-w-6xl px-6 h-16 flex items-center justify-between shadow-lg border border-[#F7F3EF]/10 mt-4">
        {/* Logo - Mobile Left */}
        <Link href="/" className="md:static">
          <img src="/images/hero.png" alt="Le Petit Isenburg" className="h-12 w-auto" width="120" height="48" loading="eager" />
        </Link>

        {/* Desktop Navigation - Center */}
        <nav className="hidden md:flex items-center gap-8 text-base font-medium tracking-widest uppercase text-[#F7F3EF] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="hover:text-[#F7F3EF]/80 transition-colors">
            {t.nav.home}
          </Link>
          <Link href="/luxury-products" className="hover:text-[#F7F3EF]/80 transition-colors">
            {language === 'fa' ? 'فروشگاه' : 'Shop'}
          </Link>
          <Link href="/about" className="hover:text-[#F7F3EF]/80 transition-colors">
            {t.nav.about}
          </Link>
          <Link href="/contact" className="hover:text-[#F7F3EF]/80 transition-colors">
            {t.nav.contact}
          </Link>
        </nav>

        {/* Actions & Mobile Menu */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* Language Switcher - Mobile Optimized */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="text-[#F7F3EF] hover:bg-[#F7F3EF]/15 rounded-lg w-8 h-8 md:w-auto md:h-auto md:px-4 md:py-2 text-xs md:text-sm font-semibold transition-all duration-300"
          >
            <Globe className="h-4 w-4 md:h-5 md:w-5" />
            <span className="hidden md:inline text-xs font-bold uppercase ml-1">{language === "fa" ? "DE" : "FA"}</span>
          </Button>

          {/* Cart - Mobile Optimized */}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#F7F3EF] hover:bg-[#F7F3EF]/15 rounded-lg relative w-8 h-8 md:w-auto md:h-auto md:px-4 md:py-2.5 md:gap-2 transition-all duration-300"
            >
              <span className="hidden md:inline">{t.nav.cart}</span>
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 stroke-2" />
              <span className="absolute -top-1 -right-1 bg-[#F7F3EF] text-[#C4956C] text-[8px] w-4 h-4 md:w-6 md:h-6 md:text-[10px] flex items-center justify-center rounded-full md:static font-bold">
                0
              </span>
            </Button>
          </Link>
          
          {/* Mobile Menu Button - Enhanced */}
          <button 
            className="md:hidden text-[#F7F3EF] hover:bg-[#F7F3EF]/20 rounded-xl w-10 h-10 flex items-center justify-center transition-all duration-300 bg-[#F7F3EF]/5 backdrop-blur-sm border border-[#F7F3EF]/10" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5 stroke-2" /> : <Menu className="h-5 w-5 stroke-2" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-gradient-to-br from-gray-100/95 via-gray-50/95 to-gray-100/95 backdrop-blur-xl shadow-2xl z-50 animate-in slide-in-from-top-8 duration-500 ease-out">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02),transparent_70%)]" />
          <div className="relative max-h-[calc(100vh-100px)] overflow-y-auto">
            <nav className="px-6 py-6">
              <div className="space-y-1">
                <Link 
                  href="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-blue-400/15 hover:to-blue-500/15 transition-all duration-300 animate-in fade-in slide-in-from-top-2 duration-300" style={{animationDelay: '50ms', animationFillMode: 'backwards'}}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 group-hover:from-blue-100/50 group-hover:to-blue-50/50 flex items-center justify-center transition-all duration-300 shadow-sm">
                    <svg className="w-5 h-5 text-neutral-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="text-neutral-900 group-hover:text-blue-600 text-base font-bold transition-colors">{t.nav.home}</span>
                </Link>

                <Link 
                  href="/luxury-products" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-blue-400/15 hover:to-blue-500/15 transition-all duration-300 animate-in fade-in slide-in-from-top-2 duration-300" style={{animationDelay: '100ms', animationFillMode: 'backwards'}}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 group-hover:from-blue-100/50 group-hover:to-blue-50/50 flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ShoppingCart className="w-5 h-5 text-neutral-700 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <span className="text-neutral-900 group-hover:text-blue-600 text-base font-bold transition-colors">{language === 'fa' ? 'فروشگاه' : 'Shop'}</span>
                </Link>

                <Link 
                  href="/about" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-blue-400/15 hover:to-blue-500/15 transition-all duration-300 animate-in fade-in slide-in-from-top-2 duration-300" style={{animationDelay: '150ms', animationFillMode: 'backwards'}}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 group-hover:from-blue-100/50 group-hover:to-blue-50/50 flex items-center justify-center transition-all duration-300 shadow-sm">
                    <svg className="w-5 h-5 text-neutral-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-neutral-900 group-hover:text-blue-600 text-base font-bold transition-colors">{t.nav.about}</span>
                </Link>

                <Link 
                  href="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-blue-400/15 hover:to-blue-500/15 transition-all duration-300 animate-in fade-in slide-in-from-top-2 duration-300" style={{animationDelay: '200ms', animationFillMode: 'backwards'}}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 group-hover:from-blue-100/50 group-hover:to-blue-50/50 flex items-center justify-center transition-all duration-300 shadow-sm">
                    <svg className="w-5 h-5 text-neutral-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-neutral-900 group-hover:text-blue-600 text-base font-bold transition-colors">{t.nav.contact}</span>
                </Link>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-200 animate-in fade-in slide-in-from-top-2 duration-300" style={{animationDelay: '250ms', animationFillMode: 'backwards'}}>
                <button
                  onClick={() => {
                    toggleLanguage()
                    setIsMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-between px-5 py-3 bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-700 rounded-2xl transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-white" />
                    <span className="text-white text-sm font-bold">{language === 'fa' ? 'تغییر زبان' : 'Sprache'}</span>
                  </div>
                  <span className="text-white/70 text-xs font-semibold">{language === "fa" ? "DE" : "FA"}</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export const Header = memo(HeaderComponent)
