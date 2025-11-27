"use client"

import { useEffect } from 'react'

export function PreloadResources() {
  useEffect(() => {
    const criticalImages = [
      '/almani/images/IMG_0410.webp',
      '/almani/images/hero.png'
    ]

    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  return null
}
