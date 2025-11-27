"use client"

import { memo } from "react"
import { useLanguage } from "@/components/language-provider"

const valuesData = [
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    titleFa: "کیفیت",
    titleDe: "Qualität",
    descFa: "استاندارد اروپایی",
    descDe: "Europäischer Standard"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    ),
    titleFa: "عشق",
    titleDe: "Liebe",
    descFa: "ساخته با عشق",
    descDe: "Mit Liebe gemacht"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    titleFa: "ایمنی",
    titleDe: "Sicherheit",
    descFa: "ایمنی کامل",
    descDe: "Vollständige Sicherheit"
  }
]

export const ValuesSection = memo(() => {
  const { language } = useLanguage()

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className={`text-2xl md:text-3xl text-neutral-900 font-bold mb-2 ${language === "fa" ? "font-bold" : "font-serif"}`}>
            {language === "fa" ? "ارزشهای ما" : "Unsere Werte"}
          </h2>
          <div className="w-16 h-0.5 bg-neutral-900 mx-auto rounded-full opacity-30" />
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {valuesData.map((value, index) => (
            <div key={`value-${index}`} className="group">
              <div className="bg-white/80 backdrop-blur-sm p-3 md:p-6 rounded-xl border border-white/50 hover:bg-white hover:shadow-lg transition-all duration-300 text-center">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <div className="scale-75 md:scale-100">{value.icon}</div>
                </div>
                <h3 className="text-xs md:text-lg font-semibold text-neutral-900 mb-1">
                  {language === "fa" ? value.titleFa : value.titleDe}
                </h3>
                <p className="text-xs md:text-sm text-neutral-600">
                  {language === "fa" ? value.descFa : value.descDe}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

ValuesSection.displayName = "ValuesSection"