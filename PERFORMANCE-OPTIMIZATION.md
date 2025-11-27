# راهنمای بهینه‌سازی سرعت وبسایت

## اقدامات فوری (اولویت بالا)

### 1. تبدیل تصاویر به WebP
```bash
# تبدیل تمام تصاویر JPG به WebP
for file in public/images/*.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

### 2. بهینه‌سازی فونت‌ها
- فقط وزن‌های 400، 500، 700 Vazirmatn را بارگذاری کنید
- از font-display: swap استفاده کنید

### 3. Lazy Loading پیشرفته
- پیاده‌سازی Intersection Observer
- Preload تصاویر بر اساس viewport

### 4. Code Splitting
- تبدیل بخش‌هایی از Client Components به Server Components
- Dynamic import برای کامپوننت‌های motion

## اقدامات میان‌مدت

### 1. Image Optimization
```typescript
// components/optimized-image.tsx
import { useState, useRef, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function OptimizedImage({ src, alt, className, priority = false }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')

  return (
    <div ref={imgRef} className={className}>
      {isInView && (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </picture>
      )}
    </div>
  )
}
```

### 2. بهینه‌سازی Product Grid
```typescript
// components/product/optimized-product-grid.tsx
import { memo, useMemo, useCallback } from 'react'
import { OptimizedImage } from '../optimized-image'

const ProductCard = memo(({ product, onSelect }: { product: Product, onSelect: (p: Product) => void }) => {
  const handleClick = useCallback(() => onSelect(product), [product, onSelect])
  
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <OptimizedImage
        src={product.image}
        alt={product.name}
        className="aspect-[4/5] rounded-lg"
      />
      <h3>{product.name}</h3>
      <p>€{product.price}</p>
    </div>
  )
})

export const OptimizedProductGrid = memo(({ products, onProductSelect }: ProductGridProps) => {
  const memoizedProducts = useMemo(() => products, [products])
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {memoizedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onProductSelect}
        />
      ))}
    </div>
  )
})
```

## نتایج مورد انتظار

### قبل از بهینه‌سازی:
- سرعت لود صفحه فروشگاه: 3-5 ثانیه
- سرعت لود جزئیات محصول: 2-3 ثانیه
- حجم تصاویر: 200-500KB هر تصویر

### بعد از بهینه‌سازی:
- سرعت لود صفحه فروشگاه: 1-2 ثانیه
- سرعت لود جزئیات محصول: 0.5-1 ثانیه  
- حجم تصاویر: 50-150KB هر تصویر (کاهش 70%)

## ابزارهای اندازه‌گیری
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Chrome DevTools Performance tab

## اولویت‌بندی اقدامات
1. تبدیل تصاویر به WebP (تأثیر بالا، تلاش کم)
2. بهینه‌سازی فونت‌ها (تأثیر متوسط، تلاش کم)
3. پیاده‌سازی Lazy Loading پیشرفته (تأثیر بالا، تلاش متوسط)
4. Code Splitting (تأثیر متوسط، تلاش بالا)