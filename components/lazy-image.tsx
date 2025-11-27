"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface LazyImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function LazyImage({ src, alt, fill, width, height, className, priority = false, sizes }: LazyImageProps) {
  const [isInView, setIsInView] = useState(priority)
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
      { rootMargin: '50px' }
    )

    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [priority])

  return (
    <div ref={imgRef} className={className}>
      {isInView && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          unoptimized
          loading={priority ? 'eager' : 'lazy'}
          className={className}
          sizes={sizes}
        />
      )}
    </div>
  )
}
