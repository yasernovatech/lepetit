"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from "lucide-react"
import { memo } from "react"

const ContactPage = memo(() => {
  const { t, language } = useLanguage()

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">


      {/* Contact Cards - Professional Design */}
      <section className="py-24 px-2 sm:px-4 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl text-neutral-900 mb-4 ${language === "fa" ? "font-bold" : "font-serif"}`}>
              {language === "fa" ? "راه‌های ارتباط" : "Kontaktmöglichkeiten"}
            </h2>
            <div className="w-24 h-1 bg-neutral-900 mx-auto rounded-full opacity-20" />
          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-8 sm:mb-12 md:mb-14 lg:mb-16">
            <div className="bg-slate-50 rounded-2xl p-10 text-center border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-slate-900 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                <Phone className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className={`text-sm xs:text-base sm:text-lg md:text-xl mb-2 xs:mb-3 sm:mb-4 text-slate-900 ${language === "fa" ? "font-bold" : "font-semibold"}`}>
                {language === "fa" ? "تلفن" : "Telefon"}
              </h3>
              <p className="text-xs xs:text-sm sm:text-base text-slate-600 mb-3 xs:mb-4 sm:mb-5 md:mb-6">{language === "fa" ? "تماس مستقیم" : "Direkter Kontakt"}</p>
              <a href="tel:+4915209726688" className="inline-block text-slate-900 font-mono text-xs xs:text-sm sm:text-base md:text-lg hover:text-slate-600 transition-colors" dir="ltr">
                +49 152 09726688
              </a>
            </div>

            <div className="bg-slate-50 rounded-2xl p-10 text-center border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-slate-900 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                <Mail className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className={`text-sm xs:text-base sm:text-lg md:text-xl mb-2 xs:mb-3 sm:mb-4 text-slate-900 ${language === "fa" ? "font-bold" : "font-semibold"}`}>
                {language === "fa" ? "ایمیل" : "E-Mail"}
              </h3>
              <p className="text-xs xs:text-sm sm:text-base text-slate-600 mb-3 xs:mb-4 sm:mb-5 md:mb-6">{language === "fa" ? "پیام الکترونیکی" : "Elektronische Post"}</p>
              <a href="mailto:info@lepetitisenburg.de" className="inline-block text-slate-900 font-mono text-[10px] xs:text-xs sm:text-sm hover:text-slate-600 transition-colors break-all max-w-full">
                info@lepetitisenburg.de
              </a>
            </div>

            <div className="bg-slate-50 rounded-2xl p-10 text-center border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-slate-900 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                <MapPin className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className={`text-sm xs:text-base sm:text-lg md:text-xl mb-2 xs:mb-3 sm:mb-4 text-slate-900 ${language === "fa" ? "font-bold" : "font-semibold"}`}>
                {language === "fa" ? "آدرس" : "Adresse"}
              </h3>
              <p className="text-xs xs:text-sm sm:text-base text-slate-600 mb-3 xs:mb-4 sm:mb-5 md:mb-6">{language === "fa" ? "محل حضوری" : "Persönlicher Besuch"}</p>
              <div className="text-slate-900 font-mono text-[10px] xs:text-xs sm:text-sm leading-tight xs:leading-relaxed max-w-full">
                Friedhofstrasse 23<br/>63263 Neu-Isenburg
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-10 text-center border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-slate-900 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                <Instagram className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className={`text-sm xs:text-base sm:text-lg md:text-xl mb-2 xs:mb-3 sm:mb-4 text-slate-900 ${language === "fa" ? "font-bold" : "font-semibold"}`}>
                {language === "fa" ? "شبکه های اجتماعی" : "Social Media"}
              </h3>
              <p className="text-xs xs:text-sm sm:text-base text-slate-600 mb-3 xs:mb-4 sm:mb-5 md:mb-6">{language === "fa" ? "ما را دنبال کنید" : "Folgen Sie uns"}</p>
              <div className="flex justify-center gap-2 xs:gap-3 sm:gap-4">
                <a href="#" className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-slate-900 rounded-md sm:rounded-lg flex items-center justify-center text-white hover:bg-slate-700 transition-colors">
                  <Instagram className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-slate-900 rounded-md sm:rounded-lg flex items-center justify-center text-white hover:bg-slate-700 transition-colors">
                  <Facebook className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-slate-900 rounded-md sm:rounded-lg flex items-center justify-center text-white hover:bg-slate-700 transition-colors">
                  <Twitter className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-12 xl:p-16 border border-slate-200">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-6 xs:mb-7 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16">
                <h2 className={`text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-900 mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-tight ${language === "fa" ? "font-bold" : "font-serif"}`}>
                  {language === "fa" ? "پیام خود را ارسال کنید" : "Nachricht senden"}
                </h2>
                <div className="w-8 xs:w-10 sm:w-12 md:w-14 lg:w-16 h-0.5 bg-slate-900 mx-auto mb-2 xs:mb-3 sm:mb-4" />
                <p className="text-xs xs:text-sm sm:text-base md:text-lg text-slate-600">
                  {language === "fa" ? "ما آماده پاسخگویی به شما هستیم" : "Wir antworten schnellstmöglich"}
                </p>
              </div>

              <form className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-xs sm:text-sm font-bold text-neutral-700 block">{t.contact.name}</label>
                    <Input 
                      className="h-10 xs:h-11 sm:h-12 rounded-lg xs:rounded-xl border border-slate-300 focus:border-slate-900 bg-white text-sm xs:text-base" 
                      placeholder={language === "fa" ? "نام شما" : "Ihr Name"}
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-xs sm:text-sm font-bold text-neutral-700 block">{t.contact.email}</label>
                    <Input 
                      type="email"
                      className="h-10 xs:h-11 sm:h-12 rounded-lg xs:rounded-xl border border-slate-300 focus:border-slate-900 bg-white text-sm xs:text-base" 
                      placeholder={language === "fa" ? "ایمیل شما" : "Ihre E-Mail"}
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="text-xs sm:text-sm font-bold text-neutral-700 block">
                    {language === "fa" ? "موضوع" : "Betreff"}
                  </label>
                  <Input 
                    className="h-10 xs:h-11 sm:h-12 rounded-lg xs:rounded-xl border border-slate-300 focus:border-slate-900 bg-white text-sm xs:text-base" 
                    placeholder={language === "fa" ? "موضوع پیام" : "Betreff Ihrer Nachricht"}
                  />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="text-xs sm:text-sm font-bold text-neutral-700 block">{t.contact.message}</label>
                  <Textarea 
                    className="min-h-[120px] xs:min-h-[140px] sm:min-h-[150px] md:min-h-[160px] rounded-lg xs:rounded-xl border border-slate-300 focus:border-slate-900 resize-none bg-white text-sm xs:text-base" 
                    placeholder={language === "fa" ? "پیام خود را بنویسید..." : "Schreiben Sie Ihre Nachricht..."}
                  />
                </div>

                <Button className="w-full h-10 xs:h-11 sm:h-12 bg-slate-900 text-white hover:bg-slate-800 rounded-lg xs:rounded-xl font-medium text-sm xs:text-base">
                  <Send className="w-3 h-3 xs:w-4 xs:h-4 ml-2" />
                  {t.contact.submit}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 px-2 sm:px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-2 ${language === "fa" ? "font-bold" : "font-semibold"}`}>
              {language === "fa" ? "موقعیت" : "Standort"}
            </h2>
            <div className="w-10 sm:w-12 h-0.5 bg-slate-900 mx-auto" />
          </div>
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden h-64 sm:h-80 lg:h-96 bg-slate-100 border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.123!2d8.6821!3d50.0379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDAyJzE2LjQiTiA4wrA0MCc1NS42IkU!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
        </div>
      </section>
    </main>
  )
})

ContactPage.displayName = "ContactPage"
export default ContactPage
