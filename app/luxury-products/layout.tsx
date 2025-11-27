import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Luxury Products',
  description: 'Premium luxury products collection',
}

export default function LuxuryProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full overflow-x-hidden">
      {children}
    </div>
  )
}
