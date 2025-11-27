"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { useCart } from "@/contexts/CartContext"

export default function CartPage() {
  const { t, dir, language } = useLanguage()
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()


  return (
    <main className="min-h-screen container mx-auto px-4 py-8 md:py-12 pt-24 md:pt-28">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">{t.nav.cart}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">{language === 'fa' ? 'سبد خرید شما خالی است' : language === 'de' ? 'Ihr Warenkorb ist leer' : 'Your cart is empty'}</p>
                <Link href="/luxury-products">
                  <Button>{language === 'fa' ? 'بازگشت به فروشگاه' : language === 'de' ? 'Zurück zum Shop' : 'Back to Shop'}</Button>
                </Link>
              </div>
            ) : cart.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 md:gap-6 p-4 bg-white border rounded-2xl hover:shadow-sm transition-shadow"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-neutral-50 rounded-xl overflow-hidden border shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    unoptimized
                    loading="lazy"
                    sizes="(max-width: 768px) 96px, 128px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-neutral-900 md:text-lg mb-1">{language === 'fa' ? item.name_fa || item.name : language === 'de' ? item.name_de || item.name : item.name}</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {item.variant && <p>{t.product?.color || (dir === "rtl" ? "رنگ" : "Farbe")}: {item.variant}</p>}
                      </div>
                    </div>
                    <Button onClick={() => removeFromCart(item.id)} variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center border rounded-lg">
                      <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} variant="ghost" size="icon" className="h-8 w-8">
                        <Plus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} variant="ghost" size="icon" className="h-8 w-8">
                        <Minus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-left">
                      <span className="text-sm text-gray-500">
                        {language === 'fa' ? 'قیمت در واتساپ' : language === 'de' ? 'Preis auf WhatsApp' : 'Price on WhatsApp'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-2xl p-6 sticky top-24 space-y-6">
              <h3 className="font-bold text-lg">{t.cart?.orderSummary || (dir === "rtl" ? "خلاصه سفارش" : "Bestellzusammenfassung")}</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>{t.cart?.itemsPrice || (dir === "rtl" ? "تعداد کالاها" : "Artikel")}</span>
                  <span>{cart.reduce((acc, i) => acc + i.quantity, 0)}</span>
                </div>
              </div>

              <Separator />

              <div className="pt-4">
                <Button onClick={() => {
                  const message = cart.map(item => `${language === 'fa' ? item.name_fa || item.name : language === 'de' ? item.name_de || item.name : item.name} x${item.quantity}`).join('\n')
                  const text = encodeURIComponent(`${language === 'fa' ? 'سلام\nمیخواهم این محصولات را سفارش دهم:\n\n' : language === 'de' ? 'Hallo\nIch m\u00f6chte diese Produkte bestellen:\n\n' : 'Hello\nI want to order these products:\n\n'}${message}\n\n${language === 'fa' ? 'لطفا قیمت و آدرس فروشگاه را برایم بفرستید' : language === 'de' ? 'Bitte senden Sie mir den Preis und die Gesch\u00e4ftsadresse' : 'Please send me the price and store address'}`)
                  window.open(`https://wa.me/4915209726688?text=${text}`, '_blank')
                }} size="lg" className="w-full text-lg bg-green-600 hover:bg-green-700">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  {language === 'fa' ? 'سفارش از طریق واتساپ' : language === 'de' ? 'Bestellen via WhatsApp' : 'Order via WhatsApp'}
                </Button>
              </div>

              <Link
                href="/luxury-products"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.cart?.continueShopping || (dir === "rtl" ? "بازگشت به خرید" : "Weiter einkaufen")}
              </Link>
            </div>
          </div>
        </div>


    </main>
  )
}
