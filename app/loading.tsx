"use client"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
        <p className="text-slate-600 text-sm">در حال بارگذاری...</p>
      </div>
    </div>
  )
}