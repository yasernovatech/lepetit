"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Crown } from "lucide-react"

interface CTASectionProps {
  language?: "fa" | "en"
}

export default function CTASection({ language = "fa" }: CTASectionProps) {
  const content = {
    fa: {
      text: "آماده برای شروع؟",
      cta: "مشاهده محصولات"
    },
    en: {
      text: "Ready to get started?",
      cta: "View Products"
    }
  }

  const t = content[language]

  return (
    <section className="py-8 px-4 flex justify-center">
      <Card className="inline-flex h-24 items-center justify-center gap-10 px-10 py-0 bg-amber-100/90 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(139,69,19,0.15)] border border-amber-200 min-w-[1200px]">
        <CardContent className="flex items-center p-0">
          <div className="inline-flex items-center justify-center gap-5 pl-3 pr-5 py-0">
            <div className="w-[28px] h-[28px] bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-xl flex items-center justify-center shadow-lg">
              <Crown className="w-[16px] h-[16px] text-amber-100" />
            </div>
            <span className="text-amber-900 text-[20px] leading-7 font-bold whitespace-nowrap">
              {t.text}
            </span>
          </div>
          
          <div className="inline-flex items-center gap-4 pl-0 pr-2 py-0">
            <Button
              variant="ghost"
              className="h-16 px-7 text-[18px] text-amber-700 hover:bg-amber-50 hover:text-amber-900 rounded-2xl transition-all duration-300 font-semibold"
            >
              Reset
            </Button>
            <Button className="h-16 px-7 text-[18px] bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:via-amber-800 hover:to-amber-900 text-amber-50 rounded-2xl transition-all duration-300 group flex items-center gap-4 shadow-lg hover:shadow-xl font-bold">
              <Zap className="w-6 h-6" />
              {t.cta}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
