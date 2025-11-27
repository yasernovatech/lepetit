"use client"

import { useEffect } from 'react'

export function ImageOptimizer() {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      '/images/product-flat-lay.jpg',
      '/images/luxury-collection.jpg',
      '/images/pink-collection.jpg'
    ]

    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })

    // Cleanup
    return () => {
      criticalImages.forEach(src => {
        const link = document.querySelector(`link[href="${src}"]`)
        if (link) document.head.removeChild(link)
      })
    }
  }, [])

  return null
}
