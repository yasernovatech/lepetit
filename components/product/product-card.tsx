"use client"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/types"
import { useLanguage } from "@/components/language-provider"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, dir } = useLanguage()
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#F0F0F0] mb-4">
        <Image
          src={product.images[0] || "/almani/images/hero-products.jpg"}
          alt={product.title}
          fill
          loading="lazy"
          unoptimized
          className="object-cover"
        />

        {product.salePrice && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-red-500">
            {dir === "rtl" ? "تخفیف ویژه" : "Sonderangebot"}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-lg text-neutral-900 line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 text-sm">
          {product.salePrice ? (
            <>
              <span className="text-red-600 font-medium">{product.salePrice.toLocaleString()} {(t.product && t.product.currency) || (dir === "rtl" ? "تومان" : "€")}</span>
              <span className="text-neutral-400 line-through text-xs">{product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-neutral-700">{product.price.toLocaleString()} {(t.product && t.product.currency) || (dir === "rtl" ? "تومان" : "€")}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
