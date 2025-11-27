"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { dictionary, type Locale } from "@/lib/dictionary"

type LanguageContextType = {
  language: Locale
  setLanguage: (lang: Locale) => void
  t: typeof dictionary.fa
  dir: "rtl" | "ltr"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Locale>("de")

  const t = dictionary[language]
  const dir = language === "fa" ? "rtl" : "ltr"

  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = language
  }, [dir, language])

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
