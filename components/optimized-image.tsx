"use client"

import { useState, useRef, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  priority = false,
  width,
  height 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' } // Load images 100px before they come into view
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // Try WebP first, fallback to original
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  
  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {isInView && (
        <>
          {/* Loading placeholder */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
          )}
          
          <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </picture>
        </>
      )}
    </div>
  )
}