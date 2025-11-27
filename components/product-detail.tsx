"use client"

import React, { useState } from "react"
import { Star, Truck } from "lucide-react"

type Variant = { id: string; name: string; color: string; thumb: string; images: string[] }

const colorVariants: Variant[] = [
  { id: "green", name: "🔥 Green", color: "bg-teal-700", thumb: "/almani/images/baby-onesie.jpg", images: ["/almani/images/baby-onesie.jpg", "/almani/images/baby-clothes.jpg", "/almani/images/baby-accessories.jpg"] },
  { id: "blue", name: "Sky Blue", color: "bg-blue-400", thumb: "/almani/images/baby-bonnet.jpg", images: ["/almani/images/baby-bonnet.jpg", "/almani/images/baby-socks.jpg"] },
  { id: "red", name: "🔥 Red", color: "bg-red-500", thumb: "/almani/images/baby-gear.jpg", images: ["/almani/images/baby-gear.jpg"] },
  { id: "pink", name: "Pink Color", color: "bg-pink-300", thumb: "/almani/images/soft-baby-doll.jpg", images: ["/almani/images/soft-baby-doll.jpg"] },
  { id: "purple", name: "Light Purple", color: "bg-purple-300", thumb: "/almani/images/baby-clothes.jpg", images: ["/almani/images/baby-clothes.jpg"] },
]

export default function ProductDetail({ product }: { product: any }) {
  const [activeVariant, setActiveVariant] = useState<Variant>(colorVariants[0])
  const [activeIndex, setActiveIndex] = useState(0)
  const [qty, setQty] = useState(1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="text-sm text-gray-600 mb-4">
        Home / Bags & Luggage / Student Backpacks / <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-20">
              {activeVariant.images.map((src: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-20 h-20 rounded border-2 overflow-hidden ${
                    i === activeIndex ? "border-orange-500" : "border-gray-200"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex-1">
              <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg overflow-hidden">
                <img src={activeVariant.images[activeIndex]} alt={product.title} className="w-full h-[500px] object-contain" />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="relative rounded-lg overflow-hidden">
                  <img src={activeVariant.images[0]} alt="" className="w-full h-48 object-cover" />
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded italic">Lightweight</div>
                </div>
                <div className="grid grid-rows-2 gap-3">
                  <div className="relative rounded-lg overflow-hidden bg-blue-50">
                    <img src={activeVariant.images[0]} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center text-white text-sm bg-black/40">Breathable wide shoulder straps and honeycomb back cushion design for comfort and effective weight reduction</div>
                  </div>
                  <div className="relative rounded-lg overflow-hidden bg-blue-50">
                    <img src={activeVariant.images[0]} alt="" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-yellow-400 text-xs mb-1">70MM - 20MM</div>
                      <div className="text-white text-xs italic">Thickened shoulder straps<br/>Chest buckle design</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-lg">{product.rating}</span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">{product.reviews} reviews</span>
                <span className="ml-auto bg-green-100 text-green-700 px-2 py-1 rounded text-xs">✓ All reviews are from verified purchases</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <h1 className="text-xl font-normal text-gray-900 leading-relaxed">{product.title}</h1>
          
          <div className="flex items-center gap-3 mt-3">
            <span className="text-sm text-gray-600">{product.sold} sold</span>
            <span className="text-sm">| Sold by trader 🛡️ ›</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="font-bold text-lg">{product.rating}</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-black text-black" />
              ))}
            </div>
          </div>

          <div className="mt-2">
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">#22 Top Rated</span>
            <span className="text-xs text-gray-600 ml-2">in Student Backpacks 🎯 ›</span>
          </div>

          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">€{product.price}</span>
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium text-gray-900 mb-3">Color</div>
            <div className="flex gap-2 flex-wrap">
              {colorVariants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setActiveVariant(v)
                    setActiveIndex(0)
                  }}
                  className={`border-2 rounded-lg p-2 hover:border-orange-500 transition ${
                    v.id === activeVariant.id ? "border-orange-500" : "border-gray-200"
                  }`}
                >
                  <img src={v.thumb} alt={v.name} className="w-16 h-16 object-cover rounded mb-1" />
                  <div className="text-xs text-center whitespace-nowrap">{v.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm font-medium">Qty</span>
            <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="border rounded px-3 py-2 text-sm">
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full text-lg transition">
            Add to cart
          </button>

          <div className="mt-6 border-t pt-4">
            <div className="flex items-start gap-2 text-green-600 font-semibold">
              <Truck className="w-5 h-5 mt-0.5" />
              <div>
                <div>Free shipping ›</div>
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm font-normal text-gray-700">
                  <div>
                    <div className="font-medium">Standard: FREE</div>
                    <div className="text-xs">Delivery: Dec 1-5</div>
                    <div className="text-xs">Courier company: 📦 PostNL 🇩🇪 DHL Parcel...</div>
                  </div>
                  <div>
                    <div className="font-medium">Click & Collect: FREE</div>
                    <div className="text-xs">Delivery: Dec 1-5</div>
                    <div className="text-xs">Courier company: 🇩🇪 DHL P... ›</div>
                  </div>
                </div>
                <div className="mt-2 bg-orange-500 text-white text-xs px-2 py-1 rounded inline-block">TEMU 🤝 PostNL Together for better delivery</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-600">
            ℹ️ Min. order value: €10.00 for 1st order, €20.00 after ›
          </div>

          <div className="mt-4 text-green-600 font-semibold text-sm">
            ✓ Why choose Temu? ›
          </div>
        </aside>
      </div>
    </div>
  )
}
