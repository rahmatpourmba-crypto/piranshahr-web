import { useState, useEffect } from 'react'
import ads from '../data/ads.json'

const messages = [
  `${ads.filter(a => a.category === 'فروش').length} آگهی فروش فعال`,
  `${ads.filter(a => a.category === 'املاک').length} آگهی املاک`,
  `${ads.filter(a => a.category === 'خودرو').length} آگهی خودرو`,
  `${ads.filter(a => a.category === 'خدمات').length} خدمات فنی`,
  `${ads.filter(a => a.category === 'رایگان').length} هدیه رایگان`,
  `${ads.filter(a => a.category === 'گمشده').length} آگهی گمشده`,
]

export default function LiveBanner() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex(p => (p + 1) % messages.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="bg-[#FDF2F3] border-b border-[#F5E6E8] py-2">
      <div className="container flex items-center justify-center">
        <span className="text-[12px] text-[#A13D4C] font-medium">{messages[index]}</span>
      </div>
    </div>
  )
}
