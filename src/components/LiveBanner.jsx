import { useState, useEffect } from 'react'
import ads from '../data/ads.json'

const messages = [
  {
    text: `🔴 ${ads.filter((a) => a.type === 'گمشده').length} آگهی گمشده ثبت شده`,
    color: 'text-red-400',
  },
  {
    text: `🎁 ${ads.filter((a) => a.category === 'رایگان').length} هدیه رایگان هنوز موجود است`,
    color: 'text-green-400',
  },
  {
    text: `🛒 ${ads.filter((a) => a.category === 'فروش').length} آگهی فروش ثبت شد`,
    color: 'text-blue-400',
  },
  {
    text: `🗓 ${ads.filter((a) => a.category === 'نوبت خالی').length} نوبت خالی منتظر شماست`,
    color: 'text-teal-400',
  },
  {
    text: `🔄 ${ads.filter((a) => a.category === 'معاوضه غذا').length} فرصت معاوضه غذا`,
    color: 'text-orange-400',
  },
]

export default function LiveBanner() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const msg = messages[index]

  return (
    <div className="bg-gray-900 text-white py-2 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse ml-2" />
        <span className={`text-sm font-medium transition-opacity duration-500 ${msg.color}`}>
          {msg.text}
        </span>
      </div>
    </div>
  )
}
