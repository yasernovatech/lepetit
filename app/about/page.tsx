"use client"

import { useLanguage } from "@/components/language-provider"
import { useMemo, memo } from "react"
import dynamic from "next/dynamic"

const Timeline = dynamic(() => import("@/components/about/timeline").then(m => ({ default: m.Timeline })), { ssr: false })
const HeroSlider = dynamic(() => import("@/components/about/hero-slider").then(m => ({ default: m.HeroSlider })), { ssr: false })
const ValuesSection = dynamic(() => import("@/components/about/values-section").then(m => ({ default: m.ValuesSection })), { ssr: false })
const OptionsSelector = dynamic(() => import("@/components/options-selector"), { ssr: false })

function AboutPage() {
  const { t, language } = useLanguage()

  const timelineData = useMemo(() => [
    {
      year: language === "fa" ? "دی 1403" : "Januar 2025",
      title: language === "fa" ? "افتتاح فروشگاه" : "Eröffnung des Geschäfts",
      desc: language === "fa" ? "شروع رسمی فعالیت و ارائه محصولات به مشتریان" : "Offizieller Beginn und Bereitstellung von Produkten"
    },
    {
      year: language === "fa" ? "بهمن 1403" : "Februar 2025",
      title: language === "fa" ? "تکمیل محصولات" : "Produktvervollständigung",
      desc: language === "fa" ? "افزودن مجموعه کامل لوازم نوزاد و کودک" : "Vollständige Baby- und Kinderkollektion"
    },
    {
      year: language === "fa" ? "اسفند 1403" : "März 2025",
      title: language === "fa" ? "رشد مشتریان" : "Kundenwachstum",
      desc: language === "fa" ? "افزایش تعداد مشتریان و بازخورد مثبت" : "Kundenzunahme und positives Feedback"
    },
    {
      year: language === "fa" ? "فروردین 1404" : "April 2025",
      title: language === "fa" ? "گسترش خدمات" : "Serviceerweiterung",
      desc: language === "fa" ? "ارائه ارسال سریع و پشتیبانی 24 ساعته" : "Schnellversand und 24-Stunden-Support"
    },
    {
      year: language === "fa" ? "اردیبهشت 1404" : "Mai 2025",
      title: language === "fa" ? "برندهای معتبر" : "Vertrauenswürdige Marken",
      desc: language === "fa" ? "همکاری با برندهای بینالمللی معتبر" : "Zusammenarbeit mit internationalen Marken"
    },
    {
      year: language === "fa" ? "خرداد 1404" : "Juni 2025",
      title: language === "fa" ? "تخفیفات ویژه" : "Sonderangebote",
      desc: language === "fa" ? "راهاندازی تخفیفات و جشنواره‌های فصلی" : "Rabattprogramme und saisonale Festivals"
    },
    {
      year: language === "fa" ? "تیر 1404" : "Juli 2025",
      title: language === "fa" ? "بهبود کیفیت" : "Qualitätsverbesserung",
      desc: language === "fa" ? "ارتقای استانداردهای کیفی محصولات" : "Verbesserung der Produktqualitätsstandards"
    },
    {
      year: language === "fa" ? "مرداد 1404" : "August 2025",
      title: language === "fa" ? "رضایت مشتریان" : "Kundenzufriedenheit",
      desc: language === "fa" ? "دریافت امتیاز عالی از مشتریان" : "Hervorragende Kundenbewertungen"
    },
    {
      year: language === "fa" ? "شهریور 1404" : "September 2025",
      title: language === "fa" ? "محصولات جدید" : "Neue Produkte",
      desc: language === "fa" ? "معرفی محصولات جدید و منحصر به فرد" : "Einführung neuer einzigartiger Produkte"
    },
    {
      year: language === "fa" ? "مهر 1404" : "Oktober 2025",
      title: language === "fa" ? "توسعه تیم" : "Teamentwicklung",
      desc: language === "fa" ? "گسترش تیم و بهبود خدمات" : "Teamerweiterung und Serviceverbesserung"
    },
    {
      year: language === "fa" ? "آبان 1404" : "November 2025",
      title: language === "fa" ? "برنامه وفاداری" : "Treueprogramm",
      desc: language === "fa" ? "راهاندازی برنامه امتیازدهی مشتریان" : "Start des Kundenpunkteprogramms"
    },
    {
      year: language === "fa" ? "آذر 1404" : "Dezember 2025",
      title: language === "fa" ? "جشن سالگرد" : "Jubiläumsfeier",
      desc: language === "fa" ? "جشن یک سالگی با تخفیفات ویژه" : "Jahrestag mit Sonderrabatten"
    }
  ], [language])

  return (
    <main className="min-h-screen overflow-x-hidden w-full max-w-full">
      {/* Hero Slider */}
      <HeroSlider />



      {/* Timeline Section */}
      <section className="py-24 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className={`text-3xl md:text-5xl text-neutral-900 ${language === "fa" ? "font-bold" : "font-serif"}`}>
              {language === "fa" ? "سفر ما" : "Unsere Reise"}
            </h2>
            <div className="w-24 h-1 bg-neutral-900 mx-auto rounded-full opacity-20" />
          </div>

          <Timeline items={timelineData} />
        </div>
      </section>



      {/* Values Section */}
      <ValuesSection />

      {/* Interactive Product Gallery Section */}
      <section className="py-16 px-2 sm:px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "fa" ? "گالری تعاملی محصولات" : "Interaktive Produktgalerie"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "fa" ? "با کلیک بر هر گزینه، جزئیات بیشتر محصولات را کشف کنید" : "Klicken Sie auf jede Option, um mehr über unsere Produkte zu erfahren"}
            </p>
          </div>
          <OptionsSelector />
        </div>
      </section>
    </main>
  )
}

export default memo(AboutPage)
