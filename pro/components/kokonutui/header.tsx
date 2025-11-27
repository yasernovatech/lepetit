"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#C4956C]">
          Le Petit
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="hover:text-[#C4956C] transition-colors">
            Home
          </Link>
          <Link href="/luxury-products" className="hover:text-[#C4956C] transition-colors">
            Produkte
          </Link>
          <Link href="/about" className="hover:text-[#C4956C] transition-colors">
            Über uns
          </Link>
          <Link href="/contact" className="hover:text-[#C4956C] transition-colors">
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  )
}
