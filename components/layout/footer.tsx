"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t, dir } = useLanguage()

  return (
    <footer className="bg-gradient-to-br from-[#C4956C] to-[#B8885A] pt-10 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-[#F7F3EF]">Le Petit Isenburg</h2>
            <p className="text-[#F7F3EF]/90 text-base max-w-xs">
              {t.footer.aboutText}
            </p>
            <div className="flex gap-2">
              <Link href="#" className="w-10 h-10 bg-[#F7F3EF]/20 hover:bg-[#F7F3EF]/30 rounded-xl flex items-center justify-center transition-all shadow-lg" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-[#F7F3EF]" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-[#F7F3EF]/20 hover:bg-[#F7F3EF]/30 rounded-xl flex items-center justify-center transition-all shadow-lg" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-[#F7F3EF]" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-[#F7F3EF]/20 hover:bg-[#F7F3EF]/30 rounded-xl flex items-center justify-center transition-all shadow-lg" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-[#F7F3EF]" />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-[#F7F3EF] font-bold text-base uppercase tracking-wider">{t.nav.shop}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/baby-clothes" className="text-[#F7F3EF]/80 hover:text-[#F7F3EF] transition-colors text-base block">
                  {t.categories.women}
                </Link>
              </li>
              <li>
                <Link href="/products/toys" className="text-[#F7F3EF]/80 hover:text-[#F7F3EF] transition-colors text-base block">
                  {t.categories.kids}
                </Link>
              </li>
              <li>
                <Link href="/products/accessories" className="text-[#F7F3EF]/80 hover:text-[#F7F3EF] transition-colors text-base block">
                  {t.categories.toys}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-[#F7F3EF] font-bold text-base uppercase tracking-wider">{t.footer.company}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-[#F7F3EF]/80 hover:text-[#F7F3EF] transition-colors text-base block">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#F7F3EF]/80 hover:text-[#F7F3EF] transition-colors text-base block">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#F7F3EF]/80 hover:text-[#F7F3EF] transition-colors text-base block">
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-[#F7F3EF] font-bold text-base uppercase tracking-wider">{dir === "rtl" ? "تماس" : "Kontakt"}</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-[#F7F3EF]/90">
                <Mail className="h-4 w-4" />
                <span>info@lepetitisenburg.de</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#F7F3EF]/90">
                <Phone className="h-4 w-4" />
                <span>+49 152 09726688</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder={t.footer.emailPlaceholder}
                className="flex-1 h-10 bg-[#F7F3EF]/15 border-[#F7F3EF]/25 text-[#F7F3EF] text-sm placeholder:text-[#F7F3EF]/70 rounded-xl focus-visible:ring-[#F7F3EF] shadow-sm"
              />
              <Button className="bg-[#F7F3EF]/20 text-[#F7F3EF] hover:bg-[#F7F3EF]/30 rounded-xl px-4 h-10 shadow-lg">
                {dir === "rtl" ? <ArrowLeft className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-[#F7F3EF]/20 pt-5 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[#F7F3EF]/70 text-[10px] uppercase tracking-wider">{dir === "rtl" ? "روشهای پرداخت" : "Zahlung"}</span>
            <div className="flex gap-2">
              <div className="w-12 h-8 bg-[#F7F3EF]/15 border border-[#F7F3EF]/25 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-[#F7F3EF] text-xs font-bold">VISA</span>
              </div>
              <div className="w-12 h-8 bg-[#F7F3EF]/15 border border-[#F7F3EF]/25 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-[#F7F3EF] text-xs font-bold">MC</span>
              </div>
              <div className="w-12 h-8 bg-[#F7F3EF]/15 border border-[#F7F3EF]/25 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-[#F7F3EF] text-xs font-bold">PP</span>
              </div>
              <div className="w-14 h-8 bg-[#F7F3EF]/15 border border-[#F7F3EF]/25 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-[#F7F3EF] text-xs font-bold">SOFORT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#F7F3EF]/20 pt-4">
          <div className="flex justify-center">
            <p className="text-sm text-[#F7F3EF]/70">
              {dir === "rtl" ? "طراحی شده توسط" : "Designed by"} <a href="https://novatechsoft.com" target="_blank" rel="noopener noreferrer" className="text-[#F7F3EF] hover:text-white transition-colors font-bold underline decoration-[#F7F3EF]/50 hover:decoration-white">NovaTech</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
