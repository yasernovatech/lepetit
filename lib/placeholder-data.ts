import type { Product, Category } from "@/types"

function getCategoriesByLanguage(language: string): Category[] {
  const categoriesData = {
    fa: [
      { id: "1", name: "لباس نوزاد", slug: "baby-clothes", image: "/images/baby-clothes.jpg", description: "لباسهای نرم و راحت برای نوزادان" },
      { id: "2", name: "اسباب بازی", slug: "toys", image: "/images/soft-baby-doll.jpg", description: "اسباب بازیهای ایمن و آموزشی" },
      { id: "3", name: "لوازم جانبی", slug: "accessories", image: "/images/baby-accessories.jpg", description: "لوازم ضروری نوزاد" },
    ],
    de: [
      { id: "1", name: "Babykleidung", slug: "baby-clothes", image: "/images/baby-clothes.jpg", description: "Weiche und bequeme Kleidung für Babys" },
      { id: "2", name: "Spielzeug", slug: "toys", image: "/images/soft-baby-doll.jpg", description: "Sicheres und lehrreiches Spielzeug" },
      { id: "3", name: "Zubehör", slug: "accessories", image: "/images/baby-accessories.jpg", description: "Wichtiges Babyzubehör" },
    ]
  }
  return categoriesData[language as keyof typeof categoriesData] || categoriesData.de
}

function getProductsByLanguage(language: string): Product[] {
  const productsData = {
    fa: [
      { id: "1", title: "سرهمی نوزاد نخی", slug: "baby-cotton-onesie", description: "سرهمی نخی نرم و راحت برای نوزادان 0-12 ماه. ساخت آلمان.", price: 25, salePrice: 19, categoryId: "1", images: ["/images/baby-onesie.jpg"], featured: true, isNew: true, rating: 4.8, reviewCount: 45 },
      { id: "2", title: "عروسک نرم نوزاد", slug: "soft-baby-doll", description: "عروسک نرم و ایمن برای نوزادان. دارای گواهی CE اروپا.", price: 18, categoryId: "2", images: ["/images/soft-baby-doll.jpg"], featured: true, rating: 4.9, reviewCount: 67 },
      { id: "3", title: "کلاه نوزاد", slug: "baby-bonnet", description: "کلاه نرم و گرم برای نوزادان. پنبه 100٪ ارگانیک.", price: 12, categoryId: "3", images: ["/images/baby-bonnet.jpg"], featured: false, isNew: true, rating: 4.7, reviewCount: 34 },
      { id: "4", title: "ست لباس نوزاد", slug: "baby-clothes-set", description: "ست کامل لباس نوزاد شامل بادی، شلوار و کلاه.", price: 35, categoryId: "1", images: ["/images/baby-clothes.jpg"], featured: true, rating: 4.6, reviewCount: 52 },
      { id: "5", title: "پستانک و زنجیر", slug: "pacifier-chain", description: "پستانک ارتودنسی با زنجیر ایمن. ساخت آلمان.", price: 15, salePrice: 12, categoryId: "3", images: ["/images/baby-accessories.jpg"], featured: true, rating: 4.9, reviewCount: 89 },
    ],
    de: [
      { id: "1", title: "Baby Baumwoll-Strampler", slug: "baby-cotton-onesie", description: "Weicher und bequemer Baumwollstrampler für Babys 0-12 Monate. Made in Germany.", price: 25, salePrice: 19, categoryId: "1", images: ["/images/baby-onesie.jpg"], featured: true, isNew: true, rating: 4.8, reviewCount: 45 },
      { id: "2", title: "Weiche Babypuppe", slug: "soft-baby-doll", description: "Weiche und sichere Puppe für Babys. Mit CE-Zertifikat.", price: 18, categoryId: "2", images: ["/images/soft-baby-doll.jpg"], featured: true, rating: 4.9, reviewCount: 67 },
      { id: "3", title: "Babymütze", slug: "baby-bonnet", description: "Weiche und warme Mütze für Babys. 100% Bio-Baumwolle.", price: 12, categoryId: "3", images: ["/images/baby-bonnet.jpg"], featured: false, isNew: true, rating: 4.7, reviewCount: 34 },
      { id: "4", title: "Baby Kleidungsset", slug: "baby-clothes-set", description: "Komplettes Babykleidungsset mit Body, Hose und Mütze.", price: 35, categoryId: "1", images: ["/images/baby-clothes.jpg"], featured: true, rating: 4.6, reviewCount: 52 },
      { id: "5", title: "Schnuller mit Kette", slug: "pacifier-chain", description: "Orthodontischer Schnuller mit sicherer Kette. Made in Germany.", price: 15, salePrice: 12, categoryId: "3", images: ["/images/baby-accessories.jpg"], featured: true, rating: 4.9, reviewCount: 89 },
    ]
  }
  return productsData[language as keyof typeof productsData] || productsData.de
}

export { getCategoriesByLanguage, getProductsByLanguage }
export const categories = getCategoriesByLanguage('de')
export const products = getProductsByLanguage('de')
