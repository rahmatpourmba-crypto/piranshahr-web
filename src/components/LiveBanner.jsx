import { useState, useEffect } from 'react'
import ads from '../data/ads.json'

const messages = [
  { text: `${ads.filter((a) => a.type === 'گمشده').length} آگهی گمشده ثبت شده`, color: 'text-red-400', emoji: '🔴' },
  { text: `${ads.filter((a) => a.category === 'رایگان').length} هدیه رایگان موجود است`, color: 'text-emerald-400', emoji: '🎁' },
  { text: `${ads.filter((a) => a.category === 'فروش').length} آگهی فروش ثبت شد`, color: 'text-blue-400', emoji: '🛒' },
  { text: `${ads.filter((a) => a.category === 'نوبت خالی').length} نوبت خالی منتظر شماست`, color: 'text-cyan-400', emoji: '🗓' },
  { text: `${ads.filter((a) => a.category === 'معاوضه غذا').length} فرصت معاوضه غذا`, color: 'text-orange-400', emoji: '🍲' },
]

export default function LiveBanner() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % messages.length), 4000)
    return () => clearInterval(t)
  }, [])

  const msg = messages[index]

  return (
    <div className="bg-gray-900 py-1.5 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
        <span className={`text-xs font-medium transition-all duration-300 ${msg.color}`}>
          {msg.emoji} {msg.text}
        </span>
      </div>
    </div>
  )
}
