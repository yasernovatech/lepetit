"use client"

import { memo } from "react"

interface TimelineItem {
  year: string
  title: string
  desc: string
}

interface TimelineProps {
  items: TimelineItem[]
}

const TimelineItemComponent = memo(({ item, index, isMobile }: { 
  item: TimelineItem
  index: number
  isMobile: boolean 
}) => {
  const isEven = index % 2 === 0
  
  if (isMobile) {
    return (
      <div className={`flex items-center gap-4 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-1 ${isEven ? 'text-right pr-4' : 'text-left pl-4'}`}>
          <div className="bg-white p-4 rounded-xl shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-shadow duration-300 border border-gray-100">
            <div className="text-base font-bold text-blue-600 mb-2 tracking-wide">{item.year}</div>
            <h3 className="text-xs font-semibold text-neutral-900 mb-1 leading-tight">{item.title}</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
          </div>
        </div>
        <div className="relative z-10">
          <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-slate-600 rounded-full border-2 border-white shadow-md" />
        </div>
        <div className="flex-1" />
      </div>
    )
  }

  return (
    <div className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
      <div className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
        <div className={`bg-white p-8 rounded-2xl shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 ${isEven ? 'mr-8' : 'ml-8'}`}>
          <div className="text-2xl font-bold text-blue-600 mb-3 tracking-wide">{item.year}</div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 leading-tight">{item.title}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
        </div>
      </div>
      <div className="relative z-10">
        <div className="w-6 h-6 bg-gradient-to-r from-sky-500 to-slate-600 rounded-full border-4 border-white shadow-lg" />
      </div>
      <div className="flex-1" />
    </div>
  )
})

TimelineItemComponent.displayName = "TimelineItem"

export const Timeline = memo(({ items }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Mobile Timeline */}
      <div className="md:hidden">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-sky-300 via-blue-400 to-slate-700 rounded-full" />
        <div className="space-y-6">
          {items.map((item, index) => (
            <TimelineItemComponent 
              key={item.year} 
              item={item} 
              index={index} 
              isMobile={true} 
            />
          ))}
        </div>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-sky-300 via-blue-400 to-slate-700 rounded-full" />
        <div className="space-y-12">
          {items.map((item, index) => (
            <TimelineItemComponent 
              key={item.year} 
              item={item} 
              index={index} 
              isMobile={false} 
            />
          ))}
        </div>
      </div>
    </div>
  )
})

Timeline.displayName = "Timeline"