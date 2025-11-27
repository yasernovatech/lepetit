import { products } from "@/pro/components/kokonutui/data"
import { notFound } from "next/navigation"
import LuxuryProductDetail from "./product-detail"

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function LuxuryProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) return notFound()

  return <LuxuryProductDetail product={product} />
}
