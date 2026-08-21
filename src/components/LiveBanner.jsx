import { useState, useEffect } from 'react'
import ads from '../data/ads.json'

const messages = [
  `${ads.filter((a) => a.category === 'گمشده').length} آگهی گمشده ثبت شده`,
  `${ads.filter((a) => a.category === 'رایگان').length} هدیه رایگان موجود است`,
  `${ads.filter((a) => a.category === 'فروش').length} آگهی فروش ثبت شد`,
  `${ads.filter((a) => a.category === 'املاک').length} آگهی املاک موجود است`,
  `${ads.filter((a) => a.category === 'خودرو').length} آگهی خودرو ثبت شد`,
  `${ads.filter((a) => a.category === 'خدمات').length} خدمات فنی و ساختمانی`,
  `${ads.filter((a) => a.category === 'معاوضه کالا').length} آگهی معاوضه کالا`,
  `${ads.filter((a) => a.category === 'نوبت خالی').length} نوبت خالی منتظر شماست`,
]

export default function LiveBanner() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % messages.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="bg-gray-900 py-2.5 px-5">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2.5">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse-dot flex-shrink-0" />
        <span className="text-[12px] font-semibold text-white/70 transition-all duration-500 tracking-wide">
          {messages[index]}
        </span>
      </div>
    </div>
  )
}
