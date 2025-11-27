export type Category = {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}

export type ProductVariant = {
  id: string
  size?: string
  color?: string
  stockQuantity: number
  priceAdjustment: number
}

export type Product = {
  id: string
  title: string
  slug: string
  description: string
  price: number
  salePrice?: number
  categoryId: string
  category?: Category
  images: string[]
  featured: boolean
  isNew?: boolean
  variants?: ProductVariant[]
  rating?: number
  reviewCount?: number
}

export type CartItem = {
  id: string
  productId: string
  variantId?: string
  quantity: number
  product: Product
  selectedVariant?: ProductVariant
}

export type User = {
  id: string
  email: string
  fullName?: string
  role: "customer" | "admin"
}
