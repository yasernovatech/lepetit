"use client"

import { useState, memo, useMemo } from "react"
import { Star, Truck } from "lucide-react"
import { useLanguage } from '@/components/language-provider'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCart } from '@/contexts/CartContext'

type Variant = { id: string; name: string; thumb: string; images: string[] }

// Move static data outside component to prevent re-creation on each render
const getColorVariants = (productId: string): Variant[] => {
  if (productId === "p9") {
    return [
      { id: "black", name: "Schwarz", thumb: "/images/d (1).avif", images: ["/images/d (1).avif"] },
      { id: "white", name: "Weiß", thumb: "/images/d (2).avif", images: ["/images/d (2).avif"] },
      { id: "pink", name: "Pinke Farbe", thumb: "/images/d (3).avif", images: ["/images/d (3).avif"] },
      { id: "darkbrown", name: "Dunkelbraun", thumb: "/images/d (4).avif", images: ["/images/d (4).avif", "/images/d (5).avif"] },
      { id: "gray", name: "Grau", thumb: "/images/d (6).avif", images: ["/images/d (6).avif"] },
    ]
  }
  if (productId === "p25") {
    return [
      { id: "black", name: "Schwarz", thumb: "/images/hh (1).avif", images: ["/images/hh (1).avif", "/images/hh (2).avif"] },
      { id: "white", name: "Weiß", thumb: "/images/hh (3).avif", images: ["/images/hh (3).avif", "/images/hh (4).avif"] },
      { id: "khaki", name: "Khaki", thumb: "/images/hh (5).avif", images: ["/images/hh (5).avif", "/images/hh (6).avif"] },
    ]
  }
  if (productId === "p24") {
    return [
      { id: "white", name: "Weiß", thumb: "/images/fg (1).avif", images: ["/images/fg (1).avif", "/images/fg (2).avif"] },
      { id: "gray", name: "Grau", thumb: "/images/fg (3).avif", images: ["/images/fg (3).avif"] },
      { id: "black", name: "Schwarz", thumb: "/images/fg (4).avif", images: ["/images/fg (4).avif"] },
      { id: "camel", name: "Kamel", thumb: "/images/fg (5).avif", images: ["/images/fg (5).avif"] },
      { id: "pink", name: "Pinke Farbe", thumb: "/images/fg (6).avif", images: ["/images/fg (6).avif"] },
    ]
  }
  if (productId === "p22") {
    return [
      { id: "yellow", name: "Gelb", thumb: "/images/x (1).avif", images: ["/images/x (1).avif", "/images/x (2).avif"] },
      { id: "pink", name: "Pinke Farbe", thumb: "/images/x (3).avif", images: ["/images/x (3).avif", "/images/x (4).avif"] },
      { id: "blue", name: "Blau", thumb: "/images/x (5).avif", images: ["/images/x (5).avif"] },
      { id: "gray", name: "Grau", thumb: "/images/x (6).avif", images: ["/images/x (6).avif", "/images/x (7).avif"] },
    ]
  }
  if (productId === "p13") {
    return [
      { id: "green", name: "Grün", thumb: "/images/b (2).avif", images: ["/images/b (2).avif", "/images/b (3).avif"] },
      { id: "blue", name: "Himmelblau", thumb: "/images/b (1).avif", images: ["/images/b (1).avif", "/images/b (4).avif"] },
      { id: "red", name: "Rot", thumb: "/images/b (5).avif", images: ["/images/b (5).avif", "/images/b (6).avif"] },
      { id: "pink", name: "Pinke Farbe", thumb: "/images/b (7).avif", images: ["/images/b (7).avif"] },
      { id: "purple", name: "Helles Lila", thumb: "/images/b (3).avif", images: ["/images/b (3).avif"] },
    ]
  }
  if (productId === "p14") {
    return [
      { id: "black", name: "Schwarz", thumb: "/images/c (1).avif", images: ["/images/c (1).avif", "/images/c (2).avif"] },
      { id: "blackgold", name: "schwarz mit golden", thumb: "/images/c (3).avif", images: ["/images/c (3).avif", "/images/c (4).avif"] },
      { id: "graygold", name: "grau mit golden", thumb: "/images/c (5).avif", images: ["/images/c (5).avif", "/images/c (6).avif"] },
      { id: "bluegold", name: "blau mit golden", thumb: "/images/c (7).avif", images: ["/images/c (7).avif"] },
    ]
  }
  if (productId === "p15") {
    return [
      { id: "white", name: "Weiß", thumb: "/images/d (1).avif", images: ["/images/d (1).avif", "/images/d (2).avif"] },
      { id: "black", name: "Schwarz", thumb: "/images/d (3).avif", images: ["/images/d (3).avif"] },
      { id: "khaki", name: "Khaki", thumb: "/images/d (4).avif", images: ["/images/d (4).avif"] },
      { id: "pink", name: "Pinke Farbe", thumb: "/images/d (5).avif", images: ["/images/d (5).avif"] },
      { id: "lightgreen", name: "Hellgrün", thumb: "/images/d (6).avif", images: ["/images/d (6).avif"] },
    ]
  }
  if (productId === "p16") {
    return [
      { id: "model1", name: "ZQ-18", thumb: "/images/e (1).avif", images: ["/images/e (1).avif", "/images/e (2).avif"] },
      { id: "model2", name: "Standard", thumb: "/images/e (3).avif", images: ["/images/e (3).avif"] },
      { id: "model3", name: "Premium", thumb: "/images/e (4).avif", images: ["/images/e (4).avif"] },
      { id: "model4", name: "Deluxe", thumb: "/images/e (5).avif", images: ["/images/e (5).avif"] },
      { id: "model5", name: "Pro", thumb: "/images/e (6).avif", images: ["/images/e (6).avif", "/images/e (7).avif"] },
    ]
  }
  if (productId === "p17") {
    return [
      { id: "transparent", name: "Transparent", thumb: "/images/q (1).avif", images: ["/images/q (1).avif", "/images/q (2).avif", "/images/q (3).avif", "/images/q (4).avif", "/images/q (5).avif"] },
    ]
  }
  if (productId === "p21") {
    return [
      { id: "green", name: "Gr\u00fcn", thumb: "/images/tt (1).avif", images: ["/images/tt (1).avif", "/images/tt (2).avif"] },
      { id: "skyblue", name: "Himmelblau", thumb: "/images/tt (3).avif", images: ["/images/tt (3).avif"] },
      { id: "red", name: "Rot", thumb: "/images/tt (4).avif", images: ["/images/tt (4).avif"] },
      { id: "pink", name: "Pinke Farbe", thumb: "/images/tt (5).avif", images: ["/images/tt (5).avif"] },
      { id: "purple", name: "Helles Lila", thumb: "/images/tt (6).avif", images: ["/images/tt (6).avif"] },
    ]
  }
  if (productId === "p18" || productId === "p33") {
    return [
      { id: "set2", name: "Kosmetik Aufbewahrungsbox Set 2", thumb: "/images/w (1).avif", images: ["/images/w (1).avif", "/images/w (2).avif", "/images/w (3).avif"] },
      { id: "set5", name: "Kosmetik-Aufbewahrungsbox Set 5", thumb: "/images/w (4).avif", images: ["/images/w (4).avif", "/images/w (5).avif", "/images/w (6).avif"] },
    ]
  }
  if (productId === "p19" || productId === "p23") {
    return [
      { id: "black", name: "Schwarzes 13+20+24+28 Zoll Koffer vierteiliges Set", thumb: "/images/r (1).avif", images: ["/images/r (1).avif"] },
      { id: "khaki", name: "Khaki 13+20+24+28 Zoll Koffer 4-teiliges Set", thumb: "/images/r (2).avif", images: ["/images/r (2).avif"] },
      { id: "rosegold", name: "Roségold 13+20+24+28 Zoll Koffer-Set", thumb: "/images/r (3).avif", images: ["/images/r (3).avif"] },
      { id: "lightgray", name: "Hellgraues 13+20+24+28 Zoll Koffer 4-tlg. Set", thumb: "/images/r (4).avif", images: ["/images/r (4).avif"] },
      { id: "lightblue", name: "Hellblau 13+20+24+28 Zoll Koffer 4-tlg. Set", thumb: "/images/r (5).avif", images: ["/images/r (5).avif"] },
      { id: "darkgray", name: "Dunkelgraues 13+20+24+28 Zoll Koffer 4-teiliges Set", thumb: "/images/r (6).avif", images: ["/images/r (6).avif"] },
    ]
  }
  if (productId === "p20") {
    return [
      { id: "royalblue", name: "Königsblau", thumb: "/images/u (1).avif", images: ["/images/u (1).avif", "/images/u (2).avif", "/images/u (3).avif", "/images/u (4).avif"] },
      { id: "darkgray", name: "Dunkelgrau", thumb: "/images/u (5).avif", images: ["/images/u (5).avif", "/images/u (6).avif", "/images/u (7).avif", "/images/u (8).avif"] },
    ]
  }
  if (productId === "p27") {
    return [
      { id: "black", name: "Schwarz", thumb: "/images/kl (1).avif", images: ["/images/kl (1).avif", "/images/kl (2).avif"] },
      { id: "white", name: "Weiß", thumb: "/images/kl (3).avif", images: ["/images/kl (3).avif", "/images/kl (4).avif"] },
      { id: "lightpinkgray", name: "Hellrosa Grau", thumb: "/images/kl (5).avif", images: ["/images/kl (5).avif", "/images/kl (6).avif"] },
      { id: "gray", name: "Grau", thumb: "/images/kl (7).avif", images: ["/images/kl (7).avif"] },
    ]
  }
  if (productId === "p34") {
    return [
      { id: "black", name: "Schwarz", thumb: "/images/va (1).avif", images: ["/images/va (1).avif", "/images/va (2).avif", "/images/va (3).avif"] },
      { id: "white", name: "Weiß", thumb: "/images/va (4).avif", images: ["/images/va (4).avif", "/images/va (5).avif"] },
      { id: "khaki", name: "Khaki", thumb: "/images/va (6).avif", images: ["/images/va (6).avif", "/images/va (7).avif"] },
    ]
  }
  if (productId === "p21") {
    return [
      { id: "purple", name: "Lila", thumb: "/images/g (1).avif", images: ["/images/g (1).avif", "/images/g (2).avif"] },
      { id: "bluegreen", name: "Königsblaugrün", thumb: "/images/g (3).avif", images: ["/images/g (3).avif"] },
      { id: "bluepink", name: "Königsblaues Pulver", thumb: "/images/g (4).avif", images: ["/images/g (4).avif"] },
      { id: "bluered", name: "Königsblau Rot", thumb: "/images/g (5).avif", images: ["/images/g (5).avif"] },
      { id: "skyblue", name: "Himmelblau", thumb: "/images/g (6).avif", images: ["/images/g (6).avif"] },
    ]
  }
  if (productId === "p22") {
    return [
      { id: "yellow", name: "Gelb", thumb: "/images/x (1).avif", images: ["/images/x (1).avif", "/images/x (2).avif"] },
      { id: "pink", name: "Pinke Farbe", thumb: "/images/x (3).avif", images: ["/images/x (3).avif", "/images/x (4).avif"] },
      { id: "blue", name: "Blau", thumb: "/images/x (5).avif", images: ["/images/x (5).avif"] },
      { id: "gray", name: "Grau", thumb: "/images/x (6).avif", images: ["/images/x (6).avif", "/images/x (7).avif"] },
    ]
  }
  if (productId === "p23") {
    return [
      { id: "beige", name: "Beige", thumb: "/images/f (1).avif", images: ["/images/f (1).avif", "/images/f (2).avif"] },
      { id: "khaki", name: "Khaki", thumb: "/images/f (3).avif", images: ["/images/f (3).avif"] },
      { id: "coffee", name: "Kaffee", thumb: "/images/f (4).avif", images: ["/images/f (4).avif", "/images/f (5).avif"] },
      { id: "brown", name: "Braun", thumb: "/images/f (6).avif", images: ["/images/f (6).avif"] },
      { id: "4pairs", name: "4 Paare", thumb: "/images/f (7).avif", images: ["/images/f (7).avif"] },
    ]
  }
  if (productId === "p24") {
    return [
      { id: "white", name: "Weiß", thumb: "/images/fg (1).avif", images: ["/images/fg (1).avif", "/images/fg (2).avif"] },
      { id: "gray", name: "Grau", thumb: "/images/fg (3).avif", images: ["/images/fg (3).avif"] },
      { id: "black", name: "Schwarz", thumb: "/images/fg (4).avif", images: ["/images/fg (4).avif"] },
      { id: "camel", name: "Kamel", thumb: "/images/fg (5).avif", images: ["/images/fg (5).avif"] },
      { id: "pink", name: "Pinke Farbe", thumb: "/images/fg (6).avif", images: ["/images/fg (6).avif"] },
    ]
  }
  if (productId === "p25") {
    return [
      { id: "black", name: "Schwarz", thumb: "/images/hh (1).avif", images: ["/images/hh (1).avif", "/images/hh (2).avif"] },
      { id: "white", name: "Weiß", thumb: "/images/hh (3).avif", images: ["/images/hh (3).avif", "/images/hh (4).avif"] },
      { id: "khaki", name: "Khaki", thumb: "/images/hh (5).avif", images: ["/images/hh (5).avif", "/images/hh (6).avif"] },
    ]
  }
  if (productId === "p26") {
    return [
      { id: "black", name: "Schwarz", thumb: "/images/tt (1).avif", images: ["/images/tt (1).avif", "/images/tt (2).avif"] },
      { id: "white", name: "Weiß", thumb: "/images/tt (3).avif", images: ["/images/tt (3).avif"] },
      { id: "pink", name: "Pinke Farbe", thumb: "/images/tt (4).avif", images: ["/images/tt (4).avif"] },
      { id: "darkbrown", name: "Dunkelbraun", thumb: "/images/tt (5).avif", images: ["/images/tt (5).avif"] },
      { id: "gray", name: "Grau", thumb: "/images/tt (6).avif", images: ["/images/tt (6).avif"] },
    ]
  }
  if (productId === "p27") {
    return [
      { id: "black", name: "Schwarz", thumb: "/images/kl (1).avif", images: ["/images/kl (1).avif", "/images/kl (2).avif"] },
      { id: "white", name: "Weiß", thumb: "/images/kl (3).avif", images: ["/images/kl (3).avif", "/images/kl (4).avif"] },
      { id: "lightpinkgray", name: "Hellrosa Grau", thumb: "/images/kl (5).avif", images: ["/images/kl (5).avif", "/images/kl (6).avif"] },
      { id: "gray", name: "Grau", thumb: "/images/kl (7).avif", images: ["/images/kl (7).avif"] },
    ]
  }
  if (productId === "p28") {
    return [
      { id: "transparent", name: "Transparent AD-222", thumb: "/images/rt (1).avif", images: ["/images/rt (1).avif", "/images/rt (2).avif", "/images/rt (3).avif", "/images/rt (4).avif", "/images/rt (5).avif"] },
    ]
  }
  if (productId === "p29") {
    return [
      { id: "flowers", name: "Flowers and ruffles", thumb: "/images/xxx (1).jpg", images: ["/images/xxx (1).jpg", "/images/xxx (2).jpg"] },
      { id: "festive", name: "Festive Socks Black/White", thumb: "/images/xxx (3).jpg", images: ["/images/xxx (3).jpg", "/images/xxx (4).jpg"] },
      { id: "stripes", name: "Stripes and triangles", thumb: "/images/xxx (5).jpg", images: ["/images/xxx (5).jpg", "/images/xxx (6).jpg"] },
    ]
  }
  if (productId === "p30") {
    return [
      { id: "khaki", name: "Khaki", thumb: "/images/qw (1).jpg", images: ["/images/qw (1).jpg", "/images/qw (2).jpg"] },
      { id: "black", name: "Schwarz", thumb: "/images/qw (3).jpg", images: ["/images/qw (3).jpg", "/images/qw (4).jpg"] },
      { id: "white", name: "Weiß", thumb: "/images/qw (5).jpg", images: ["/images/qw (5).jpg", "/images/qw (6).jpg"] },
    ]
  }
  if (productId === "p31") {
    return [
      { id: "colour10", name: "Colour 10", thumb: "/images/bbb (1).jpg", images: ["/images/bbb (1).jpg", "/images/bbb (2).jpg", "/images/bbb (3).jpg", "/images/bbb (4).jpg", "/images/bbb (5).jpg"] },
    ]
  }
  if (productId === "p32") {
    return [
      { id: "purple", name: "Lila", thumb: "/images/tt (1).jpg", images: ["/images/tt (1).jpg", "/images/tt (2).jpg"] },
      { id: "blue", name: "Blau", thumb: "/images/tt (3).jpg", images: ["/images/tt (3).jpg"] },
      { id: "green", name: "Grün", thumb: "/images/tt (4).jpg", images: ["/images/tt (4).jpg"] },
      { id: "orange", name: "Orange", thumb: "/images/tt (5).jpg", images: ["/images/tt (5).jpg"] },
      { id: "rose", name: "Rose", thumb: "/images/tt (6).jpg", images: ["/images/tt (6).jpg"] },
    ]
  }
  if (productId === "p33") {
    return [
      { id: "stainlesssteel", name: "Edelstahl", thumb: "/images/bo (1).jpg", images: ["/images/bo (1).jpg", "/images/bo (2).jpg", "/images/bo (3).jpg", "/images/bo (4).jpg"] },
    ]
  }
  if (productId === "p34") {
    return [
      { id: "black", name: "Schwarz", thumb: "/images/va (1).avif", images: ["/images/va (1).avif", "/images/va (2).avif", "/images/va (3).avif"] },
      { id: "white", name: "Weiß", thumb: "/images/va (4).avif", images: ["/images/va (4).avif", "/images/va (5).avif"] },
      { id: "khaki", name: "Khaki", thumb: "/images/va (6).avif", images: ["/images/va (6).avif", "/images/va (7).avif"] },
    ]
  }
  return [
    { id: "green", name: "🔥 Green", thumb: "/images/baby-onesie.jpg", images: ["/images/baby-onesie.jpg", "/images/baby-clothes.jpg", "/images/baby-accessories.jpg"] },
    { id: "blue", name: "Sky Blue", thumb: "/images/baby-bonnet.jpg", images: ["/images/baby-bonnet.jpg", "/images/baby-socks.jpg"] },
    { id: "red", name: "🔥 Red", thumb: "/images/baby-gear.jpg", images: ["/images/baby-gear.jpg"] },
    { id: "pink", name: "Pink Color", thumb: "/images/soft-baby-doll.jpg", images: ["/images/soft-baby-doll.jpg"] },
    { id: "purple", name: "Light Purple", thumb: "/images/baby-clothes.jpg", images: ["/images/baby-clothes.jpg"] },
  ]
}

const translations = {
  fa: {
    home: "خانه",
    bags: "کیف و چمدان",
    backpacks: "کوله پشتی دانشجویی",
    sold: "فروخته شده",
    soldBy: "فروشنده",
    topRated: "برترین امتیاز",
    in: "در",
    reviews: "نظرات",
    verifiedPurchases: "تمام نظرات از خریدهای تایید شده",
    color: "رنگ",
    qty: "تعداد",
    addToCart: "افزودن به سبد",
    lightweight: "سبک وزن",
    breathable: "بندهای شانه قابل تنفس و بالشتک پشتی لانه زنبوری برای راحتی و کاهش وزن",
    thickened: "بندهای شانه ضخیم شده",
    buckle: "طراحی سگک سینه",
    honeycomb: "طراحی لانه زنبوری"
  },
  de: {
    home: "Startseite",
    bags: "Taschen & Koffer",
    backpacks: "Studentenrucksäcke",
    sold: "verkauft",
    soldBy: "Verkauft von",
    topRated: "Top bewertet",
    in: "in",
    reviews: "Bewertungen",
    verifiedPurchases: "Alle Bewertungen stammen von verifizierten Käufen",
    color: "Farbe",
    qty: "Menge",
    addToCart: "In den Warenkorb",
    lightweight: "Leichtgewicht",
    breathable: "Atmungsaktive breite Schultergurte und Wabenkissen-Design für Komfort und effektive Gewichtsreduzierung",
    thickened: "Verstärkte Schultergurte",
    buckle: "Brustschnallen-Design",
    honeycomb: "Waben-Design"
  },
  en: {
    home: "Home",
    bags: "Bags & Luggage",
    backpacks: "Student Backpacks",
    sold: "sold",
    soldBy: "Sold by",
    topRated: "Top Rated",
    in: "in",
    reviews: "reviews",
    verifiedPurchases: "All reviews are from verified purchases",
    color: "Color",
    qty: "Qty",
    addToCart: "Add to cart",
    lightweight: "Lightweight",
    breathable: "Breathable wide shoulder straps and honeycomb back cushion design for comfort and effective weight reduction",
    thickened: "Thickened shoulder straps",
    buckle: "Chest buckle design",
    honeycomb: "Honeycomb design"
  }
}

const LuxuryProductDetail = memo(function LuxuryProductDetail({ product }: { product: any }) {
  const colorVariants = useMemo(() => {
    const variants = getColorVariants(product.id)
    if (variants.length === 0 || variants[0].thumb.includes('baby-')) {
      return product.images?.length > 0 ? [{
        id: 'default',
        name: product.colors?.[0] || 'Default',
        thumb: product.image,
        images: product.images
      }] : [{
        id: 'default',
        name: 'Default',
        thumb: product.image,
        images: [product.image]
      }]
    }
    return variants
  }, [product.id, product.image, product.images, product.colors])
  const [activeVariant, setActiveVariant] = useState<Variant>(colorVariants[0])
  const [activeIndex, setActiveIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const { language } = useLanguage()
  const router = useRouter()
  const { addToCart } = useCart()
  const t = useMemo(() => translations[language as keyof typeof translations] || translations.en, [language])

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      name_fa: product.name_fa,
      name_de: product.name_de,
      price: product.price,
      image: product.image,
      variant: activeVariant.name
    }, qty)
    
    const message = language === 'fa' ? `${qty} عدد ${product.name_fa || product.name} به سبد خرید اضافه شد` : 
                    language === 'de' ? `${qty}x ${product.name_de || product.name} wurde zum Warenkorb hinzugefügt` : 
                    `${qty}x ${product.name} added to cart`
    alert(message)
    router.push('/cart')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-32 bg-white rounded-3xl">
      <nav className="text-sm text-gray-600 mb-4">
        {t.home} / {t.bags} / {t.backpacks} / <span className="text-gray-900">{language === 'fa' ? product.name_fa || product.name : language === 'de' ? product.name_de || product.name : product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] scrollbar-hide">
              {colorVariants.map((v, vIndex) => (
                v.images.map((src: string, i: number) => {
                  const globalIndex = colorVariants.slice(0, vIndex).reduce((acc, variant) => acc + variant.images.length, 0) + i
                  const isActive = v.id === activeVariant.id && i === activeIndex
                  return (
                    <button
                      key={`${v.id}-${i}`}
                      onClick={() => {
                        setActiveVariant(v)
                        setActiveIndex(i)
                      }}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 overflow-hidden flex-shrink-0 ${
                        isActive ? "border-orange-500" : "border-gray-200"
                      }`}
                    >
                      <Image src={src} alt="" width={80} height={80} unoptimized loading={globalIndex === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
                    </button>
                  )
                })
              ))}
            </div>

            <div className="flex-1">
              <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100">
                <Image 
                  src={activeVariant.images[activeIndex]} 
                  alt={product.name} 
                  width={600}
                  height={500}
                  priority
                  unoptimized
                  className="w-full h-[300px] md:h-[500px] object-contain gpu-accelerated" 
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg">4.9</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600">255 {t.reviews}</span>
            <span className="ml-auto bg-green-100 text-green-700 px-2 py-1 rounded text-xs">✓ {t.verifiedPurchases}</span>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <h1 className="text-xl font-normal text-gray-900 leading-relaxed">{language === 'fa' ? product.name_fa || product.name : language === 'de' ? product.name_de || product.name : product.name}</h1>
          
          <div className="flex items-center gap-3 mt-3">
            <span className="text-sm text-gray-600">1.9K+ {t.sold}</span>
            <span className="text-sm">| {t.soldBy} trader 🛡️ ›</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="font-bold text-lg">4.9</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-black text-black" />
              ))}
            </div>
          </div>

          <div className="mt-2">
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">#22 {t.topRated}</span>
            <span className="text-xs text-gray-600 ml-2">{t.in} {t.backpacks} 🎯 ›</span>
          </div>

          <div className="mt-6 space-y-3">
            <button 
              onClick={() => {
                const text = encodeURIComponent(`${language === 'fa' ? 'سلام\nمیخواهم این محصول را سفارش دهم:\n\n' : 'Hallo\nIch möchte dieses Produkt bestellen:\n\n'}${language === 'fa' ? product.name_fa || product.name : product.name_de || product.name}`);
                window.open(`https://wa.me/4915209726688?text=${text}`, '_blank');
              }} 
              className="w-full bg-gradient-to-r from-[#C4956C] to-[#B8885A] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-lg">{language === 'fa' ? 'سفارش محصول' : language === 'de' ? 'Produkt bestellen' : 'Order Product'}</span>
            </button>
            
            <button 
              onClick={() => router.push('/luxury-products')} 
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {language === 'fa' ? 'بازگشت' : language === 'de' ? 'Zurück' : 'Back'}
            </button>
          </div>
        </aside>
      </div>

      {/* Product Description Section */}
      <div className="mt-8 md:mt-16 bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900">
              {language === 'fa' ? 'توضیحات محصول' : language === 'de' ? 'Produktbeschreibung' : 'Product Description'}
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {language === 'fa' ? product.description_fa || product.description : 
                 language === 'de' ? product.description_de || product.description : 
                 product.description}
            </p>
          </div>
          
          <div>
            <h3 className="text-base md:text-lg font-medium mb-3 text-gray-900">
                {language === 'fa' ? 'ویژگی‌های کلیدی:' : language === 'de' ? 'Hauptmerkmale:' : 'Key Features:'}
              </h3>
            <ul className="space-y-2">
              <li className="flex items-start text-sm md:text-base text-gray-700">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>{language === 'fa' ? 'مواد ایمن و غیرسمی' : language === 'de' ? 'Sichere und ungiftige Materialien' : 'Safe and non-toxic materials'}</span>
              </li>
              <li className="flex items-start text-sm md:text-base text-gray-700">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>{language === 'fa' ? 'گواهی CE اروپا' : language === 'de' ? 'CE-Zertifizierung' : 'European CE certification'}</span>
              </li>
              <li className="flex items-start text-sm md:text-base text-gray-700">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>{language === 'fa' ? 'قابل شستشو و ضد حساسیت' : language === 'de' ? 'Waschbar und hypoallergen' : 'Washable and hypoallergenic'}</span>
              </li>
              <li className="flex items-start text-sm md:text-base text-gray-700">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>{language === 'fa' ? 'طراحی ارگونومیک' : language === 'de' ? 'Ergonomisches Design' : 'Ergonomic design'}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base md:text-lg font-medium mb-3 text-gray-900">
              {language === 'fa' ? 'مشخصات فنی' : language === 'de' ? 'Technische Daten' : 'Specifications'}
            </h3>
            <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 space-y-2">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                <span className="text-gray-600 text-xs md:text-sm">{language === 'fa' ? 'برند:' : language === 'de' ? 'Marke:' : 'Brand:'}</span>
                <span className="font-medium text-gray-900 text-xs md:text-sm">Le Petit Isenburg</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 text-sm">{language === 'fa' ? 'کشور سازنده:' : language === 'de' ? 'Herkunftsland:' : 'Origin:'}</span>
                <span className="font-medium text-gray-900 text-sm">{language === 'fa' ? 'آلمان' : language === 'de' ? 'Deutschland' : 'Germany'}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 text-sm">{language === 'fa' ? 'رده سنی:' : language === 'de' ? 'Altersgruppe:' : 'Age Range:'}</span>
                <span className="font-medium text-gray-900 text-sm">{language === 'fa' ? '0-12 ماه' : language === 'de' ? '0-12 Monate' : '0-12 months'}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 text-sm">{language === 'fa' ? 'وزن:' : language === 'de' ? 'Gewicht:' : 'Weight:'}</span>
                <span className="font-medium text-gray-900 text-sm">150g</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default LuxuryProductDetail
