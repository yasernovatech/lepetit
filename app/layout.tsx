import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartProvider } from "@/contexts/CartContext"
import { PreloadResources } from "@/components/preload-resources"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  weight: ["400", "700"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
  display: "swap",
  preload: false,
  fallback: ['Georgia', 'serif'],
})

export const metadata: Metadata = {
  title: "Le Petit Isenburg | Baby & Kids Products",
  description: "لباس و اسباب بازی باکیفیت نوزاد و کودک - Hochwertige Babykleidung und Kindermode",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" dir="ltr" suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} ${playfair.variable} font-sans antialiased bg-[#F7F3EF] text-gray-900`}
      >
        <LanguageProvider>
          <CartProvider>
            <PreloadResources />
            <Header />
            {children}
            <Footer />
            <Analytics />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
