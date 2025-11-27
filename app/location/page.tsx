"use client"

import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function LocationPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/luxury-products" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#C4956C] mb-8 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          {language === 'fa' ? 'بازگشت' : 'Zurück'}
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#C4956C] to-[#B8885A] p-10 text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Le Petit</h1>
            <p className="text-lg opacity-90">{language === 'fa' ? 'فروشگاه لوکس کودک' : 'Luxus Kinderladen'}</p>
          </div>

          <div className="p-8 space-y-8">
            <div className="text-center border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{language === 'fa' ? 'خرید حضوری' : 'Persönlicher Einkauf'}</h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {language === 'fa' 
                  ? 'برای تجربه خرید باکیفیت و مشاهده محصولات، لطفاً حضوری به فروشگاه تشریف بیاورید' 
                  : 'Für ein hochwertiges Einkaufserlebnis besuchen Sie uns bitte persönlich im Geschäft'}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{language === 'fa' ? 'آدرس' : 'Adresse'}</h3>
                <p className="text-gray-700 leading-relaxed">
                  Friedhofstrasse 23<br/>
                  63263 Neu-Isenburg<br/>
                  Deutschland
                </p>
                <a 
                  href="https://maps.google.com/?q=Friedhofstrasse+23,+63263+Neu-Isenburg,+Germany" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-[#C4956C] hover:text-[#B8885A] font-medium transition-colors"
                >
                  {language === 'fa' ? 'مشاهده در نقشه →' : 'Auf Karte anzeigen →'}
                </a>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{language === 'fa' ? 'مشاوره و خدمات' : 'Beratung & Service'}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'fa' 
                    ? 'تیم ما آماده ارائه مشاوره تخصصی و انتخاب بهترین محصولات برای شماست' 
                    : 'Unser Team bietet Ihnen persönliche Beratung und hilft bei der Auswahl der besten Produkte'}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <p className="text-amber-900 font-medium text-center">
                  {language === 'fa' 
                    ? 'خرید فقط با مراجعه حضوری به فروشگاه امکانپذیر است' 
                    : 'Einkauf nur bei persönlichem Besuch im Geschäft möglich'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a 
                href="tel:+4915209726688" 
                className="flex-1 bg-[#C4956C] hover:bg-[#B8885A] text-white py-4 rounded-xl font-semibold text-center transition-colors"
              >
                +49 152 09726688
              </a>
              <a 
                href={`https://wa.me/4915209726688?text=${encodeURIComponent(language === 'fa' ? 'سلام، میخواهم اطلاعات بیشتری دریافت کنم' : 'Hallo, ich möchte mehr Informationen erhalten')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-center transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
