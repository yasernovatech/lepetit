"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function AdminPanel() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [content, setContent] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('hero')
  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/data/content.json')
        .then(r => r.json())
        .then(setContent)
      
      import('@/pro/components/kokonutui/data')
        .then(m => setProducts(m.products))
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    if (password === 'lepetit2025') {
      setIsAuthenticated(true)
    } else {
      alert('رمز عبور اشتباه است')
    }
  }

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const saveContent = () => {
    setSaving(true)
    const jsonContent = JSON.stringify(content, null, 2)
    downloadFile('content.json', jsonContent)
    
    const htmlGuide = `<!DOCTYPE html>
<html dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>راهنمای آپلود</title>
<style>
body{font-family:Tahoma;padding:20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);margin:0}
.container{max-width:700px;margin:0 auto;background:white;padding:30px;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.3)}
h1{color:#667eea;font-size:28px;margin-bottom:10px}
.step{background:#f8f9fa;padding:15px;margin:15px 0;border-radius:10px;border-right:5px solid #667eea}
.step h3{color:#333;margin:0 0 10px 0;font-size:18px}
.code{background:#2d3748;color:#48bb78;padding:15px;border-radius:8px;font-family:monospace;margin:10px 0;font-size:14px}
.success{background:#d4edda;color:#155724;padding:20px;border-radius:10px;margin-top:30px;text-align:center;font-size:18px;font-weight:bold}
@media(max-width:600px){body{padding:10px}.container{padding:20px}h1{font-size:24px}.step h3{font-size:16px}}
</style>
</head>
<body>
<div class="container">
<h1>✅ فایل دانلود شد</h1>
<p style="color:#666">فایل <strong>content.json</strong> آماده آپلود است</p>
<div class="step">
<h3>مرحله 1: ورود به cPanel</h3>
<p>به پنل مدیریت هاست بروید</p>
</div>
<div class="step">
<h3>مرحله 2: File Manager</h3>
<p>روی File Manager کلیک کنید</p>
</div>
<div class="step">
<h3>مرحله 3: مسیر</h3>
<div class="code">public_html/data/</div>
</div>
<div class="step">
<h3>مرحله 4: آپلود</h3>
<p>فایل <strong>content.json</strong> را آپلود کنید</p>
</div>
<div class="success">🎉 تغییرات اعمال شد!</div>
</div>
</body>
</html>`
    
    setTimeout(() => {
      downloadFile('راهنمای-آپلود.html', htmlGuide)
      setSaving(false)
      alert('✅ فایلها دانلود شد!')
    }, 500)
  }

  const saveProducts = () => {
    setSaving(true)
    const tsContent = `export const products = ${JSON.stringify(products, null, 2)}`
    downloadFile('data.ts', tsContent)
    setTimeout(() => {
      setSaving(false)
      alert('✅ فایل محصولات دانلود شد')
    }, 500)
  }

  const filteredProducts = products.filter(p => 
    (p.name_fa || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.name_de || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg">
              <span className="text-4xl sm:text-5xl">🔐</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">پنل مدیریت</h1>
            <p className="text-gray-500 text-base sm:text-lg">Le Petit Admin</p>
          </div>
          <Input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="mb-4 sm:mb-6 h-12 sm:h-14 text-base sm:text-lg border-2"
          />
          <Button onClick={handleLogin} className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            ورود 🚀
          </Button>
        </div>
      </div>
    )
  }

  if (!content) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 sm:mb-6"></div>
        <p className="text-gray-600 text-lg sm:text-xl">در حال بارگذاری...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 mb-4 sm:mb-6 border-l-4 sm:border-l-8 border-purple-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">پنل مدیریت Le Petit</h1>
              <p className="text-gray-500 text-sm sm:text-lg">مدیریت آسان محتوا</p>
            </div>
            <div className="bg-green-100 text-green-700 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg">
              🟢 آنلاین
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-4 mb-4 sm:mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              {id: 'hero', icon: '🖼️', label: 'اسلایدر'},
              {id: 'contact', icon: '📞', label: 'تماس'},
              {id: 'home', icon: '🏠', label: 'صفحه اصلی'},
              {id: 'about', icon: 'ℹ️', label: 'درباره'},
              {id: 'products', icon: '🛍️', label: 'محصولات'}
            ].map(tab => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 h-10 sm:h-14 px-3 sm:px-6 text-sm sm:text-lg font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-lg sm:text-2xl mr-1 sm:mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
          
          {activeTab === 'hero' && (
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 sm:border-b-4 border-purple-500">🖼️ تصاویر اسلایدر</h2>
              <div className="space-y-4 sm:space-y-6">
                {content.hero.images.map((img: string, i: number) => (
                  <div key={i} className="bg-gray-50 p-4 sm:p-6 rounded-xl border-2 border-gray-200">
                    <label className="block text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-3">📸 تصویر {i + 1}</label>
                    <Input
                      value={img}
                      onChange={(e) => {
                        const newContent = {...content}
                        newContent.hero.images[i] = e.target.value
                        setContent(newContent)
                      }}
                      className="h-12 sm:h-14 text-base sm:text-lg border-2 bg-white"
                    />
                  </div>
                ))}
              </div>
              <Button 
                onClick={saveContent} 
                disabled={saving}
                className="mt-6 sm:mt-8 h-12 sm:h-16 text-base sm:text-xl font-bold w-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg"
              >
                {saving ? '⏳ ذخیره...' : '💾 ذخیره'}
              </Button>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 sm:border-b-4 border-purple-500">📞 اطلاعات تماس</h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-3">📱 تلفن</label>
                  <Input
                    value={content.contact.phone}
                    onChange={(e) => setContent({...content, contact: {...content.contact, phone: e.target.value}})}
                    className="h-12 sm:h-14 text-base sm:text-lg border-2 bg-white"
                  />
                </div>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-3">📧 ایمیل</label>
                  <Input
                    value={content.contact.email}
                    onChange={(e) => setContent({...content, contact: {...content.contact, email: e.target.value}})}
                    className="h-12 sm:h-14 text-base sm:text-lg border-2 bg-white"
                  />
                </div>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border-2 border-gray-200">
                  <label className="block text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-3">📍 آدرس</label>
                  <Textarea
                    value={content.contact.address}
                    onChange={(e) => setContent({...content, contact: {...content.contact, address: e.target.value}})}
                    className="min-h-20 sm:min-h-24 text-base sm:text-lg border-2 bg-white"
                  />
                </div>
              </div>
              <Button 
                onClick={saveContent} 
                disabled={saving}
                className="mt-6 sm:mt-8 h-12 sm:h-16 text-base sm:text-xl font-bold w-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg"
              >
                {saving ? '⏳ ذخیره...' : '💾 ذخیره'}
              </Button>
            </div>
          )}

          {activeTab === 'home' && content.home && (
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 sm:border-b-4 border-purple-500">🏠 صفحه اصلی</h2>
              <div className="space-y-4 sm:space-y-8">
                <div className="bg-blue-50 p-4 sm:p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">📦 دستهبندی</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">فارسی</label>
                      <Input value={content.home.categories.title_fa} onChange={(e) => setContent({...content, home: {...content.home, categories: {...content.home.categories, title_fa: e.target.value}}})} className="h-10 sm:h-12 bg-white border-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">آلمانی</label>
                      <Input value={content.home.categories.title_de} onChange={(e) => setContent({...content, home: {...content.home, categories: {...content.home.categories, title_de: e.target.value}}})} className="h-10 sm:h-12 bg-white border-2" />
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                onClick={saveContent} 
                disabled={saving}
                className="mt-6 sm:mt-8 h-12 sm:h-16 text-base sm:text-xl font-bold w-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg"
              >
                {saving ? '⏳ ذخیره...' : '💾 ذخیره'}
              </Button>
            </div>
          )}

          {activeTab === 'about' && content.about && (
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 sm:border-b-4 border-purple-500">ℹ️ تایملاین</h2>
              <div className="space-y-3 sm:space-y-4 max-h-96 sm:max-h-[500px] overflow-y-auto pr-1 sm:pr-2">
                {content.about.timeline.map((item: any, i: number) => (
                  <div key={i} className="bg-orange-50 p-4 sm:p-6 rounded-xl border-2 border-orange-200">
                    <div className="font-bold text-base sm:text-lg text-orange-600 mb-3 sm:mb-4">📅 مورد {i + 1}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <Input placeholder="سال فارسی" value={item.year_fa} onChange={(e) => {
                        const newContent = {...content}
                        newContent.about.timeline[i].year_fa = e.target.value
                        setContent(newContent)
                      }} className="h-10 sm:h-12 bg-white border-2 text-sm sm:text-base" />
                      <Input placeholder="سال آلمانی" value={item.year_de} onChange={(e) => {
                        const newContent = {...content}
                        newContent.about.timeline[i].year_de = e.target.value
                        setContent(newContent)
                      }} className="h-10 sm:h-12 bg-white border-2 text-sm sm:text-base" />
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={saveContent} 
                disabled={saving}
                className="mt-6 sm:mt-8 h-12 sm:h-16 text-base sm:text-xl font-bold w-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg"
              >
                {saving ? '⏳ ذخیره...' : '💾 ذخیره'}
              </Button>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 sm:border-b-4 border-purple-500 gap-3">
                <h2 className="text-xl sm:text-3xl font-bold text-gray-800">🛍️ محصولات</h2>
                <div className="bg-purple-100 text-purple-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg">
                  {products.length} محصول
                </div>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <Input
                  placeholder="🔍 جستجو..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 sm:h-14 text-base sm:text-lg border-2 bg-white"
                />
              </div>

              <div className="space-y-3 sm:space-y-4 max-h-96 sm:max-h-[500px] overflow-y-auto pr-1 sm:pr-2">
                {filteredProducts.map((product, i) => (
                  <div key={i} className="bg-blue-50 p-4 sm:p-6 rounded-xl border-2 border-blue-200">
                    <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-blue-600 mb-1">#{products.indexOf(product) + 1}</div>
                        <h3 className="text-base sm:text-xl font-bold text-gray-800 truncate">{product.name_fa || product.name}</h3>
                        <div className="text-base sm:text-lg font-bold text-green-600 mt-1 sm:mt-2">💰 {product.price} €</div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => setEditingProduct(editingProduct === i ? null : i)}
                        className={`h-10 sm:h-12 px-3 sm:px-6 font-bold text-sm sm:text-base flex-shrink-0 ${editingProduct === i ? 'bg-red-500' : 'bg-blue-500'}`}
                      >
                        {editingProduct === i ? '✓' : '✏️'}
                      </Button>
                    </div>
                    {editingProduct === i && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-blue-300">
                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">نام فارسی</label>
                          <Input value={product.name_fa || ''} onChange={(e) => {
                            const newProducts = [...products]
                            newProducts[products.indexOf(product)].name_fa = e.target.value
                            setProducts(newProducts)
                          }} className="h-10 sm:h-12 bg-white border-2 text-sm sm:text-base" />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">قیمت</label>
                          <Input type="number" step="0.01" value={product.price || ''} onChange={(e) => {
                            const newProducts = [...products]
                            newProducts[products.indexOf(product)].price = parseFloat(e.target.value)
                            setProducts(newProducts)
                          }} className="h-10 sm:h-12 bg-white border-2 text-sm sm:text-base" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={saveProducts} 
                disabled={saving}
                className="mt-6 sm:mt-8 h-12 sm:h-16 text-base sm:text-xl font-bold w-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
              >
                {saving ? '⏳ ذخیره...' : `💾 ذخیره (${products.length})`}
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
