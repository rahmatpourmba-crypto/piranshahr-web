import { trackView } from '../utils/tracker'
import { MapPin } from 'lucide-react'

function formatPrice(price) {
  if (!price || price === 'توافقی') return 'توافقی'
  const n = typeof price === 'number' ? price : Number(String(price).replace(/[^\d]/g, ''))
  if (isNaN(n) || n === 0) return 'توافقی'
  if (n >= 1000000000) return `${(n / 1000000000).toFixed(1)} میلیارد`
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)} میلیون`
  return `${n.toLocaleString('fa-IR')}`
}

function timeAgo(date) {
  if (!date) return ''
  const now = Date.now()
  const ts = date?.seconds ? date.seconds * 1000 : new Date(date).getTime()
  const diff = now - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'همین الان'
  if (mins < 60) return `${mins} دقیقه پیش`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} ساعت پیش`
  const days = Math.floor(hrs / 24)
  return `${days} روز پیش`
}

const CATEGORY_EMOJI = {
  'فروش': '🛒', 'دست دوم': '♻️', 'معاوضه': '🔄', 'معاوضه غذا': '🍃',
  'غذای رستوران': '🍛', 'نوبت خالی': '📅', 'کولبری': '🎒', 'تاکسی': '🚕',
  'دام و کشاورزی': '🐑', 'املاک': '🏠', 'وسایل نقلیه': '🚗', 'لوازم خانگی': '🛋️',
  'موبایل و تبلت': '📱', 'خدمات': '🔧', 'استخدام': '💼', 'درخواست کار': '🔨',
  'کارگزاری': '🏢', 'ترخیص کار': '📦', 'حمل و نقل': '🚚', 'رایگان': '🎁', 'گمشده': '🔍', 'پیداشده': '✅',
}

const SPECIAL_CATS = ['معاوضه غذا', 'غذای رستوران', 'نوبت خالی', 'کولبری', 'تاکسی', 'دام و کشاورزی']

export default function AdCard({ ad, onReveal }) {
  const handleReveal = () => { trackView(ad.id, ad.category); onReveal(ad) }
  const emoji = CATEGORY_EMOJI[ad.category] || '📌'
  const isSpecial = SPECIAL_CATS.includes(ad.category)
  const price = formatPrice(ad.price)

  return (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group border border-gray-100 hover:-translate-y-0.5"
      onClick={handleReveal}>
      <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
        <span className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity">{emoji}</span>
        <span className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-semibold shadow-sm ${
          isSpecial ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-white text-gray-600'
        }`}>{ad.category}</span>
        {ad.province && <span className="absolute top-2.5 left-2.5 flex items-center gap-0.5 text-[10px] text-gray-400 bg-white/80 px-2 py-0.5 rounded-full"><MapPin size={9} /> {ad.city}</span>}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-[13.5px] leading-[1.5] line-clamp-2 mb-2">{ad.title}</h3>
        <div className="flex items-center justify-between">
          <span className={`font-bold text-[13px] ${price === 'توافقی' ? 'text-gray-400' : 'text-[#A13D4C]'}`}>
            {price === 'توافقی' ? 'توافقی' : <>{price} <span className="text-[11px] font-medium text-gray-400">تومان</span></>}
          </span>
          <span className="text-[11px] text-gray-300">{timeAgo(ad.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}
