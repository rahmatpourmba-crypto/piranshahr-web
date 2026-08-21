import { trackView } from '../utils/tracker'

const typeColors = {
  فروش: 'bg-blue-100 text-blue-700',
  معاوضه: 'bg-orange-100 text-orange-700',
  رایگان: 'bg-green-100 text-green-700',
  استخدام: 'bg-purple-100 text-purple-700',
  'درخواست نیرو': 'bg-indigo-100 text-indigo-700',
  گمشده: 'bg-red-100 text-red-700',
  پیداشده: 'bg-emerald-100 text-emerald-700',
  'نوبت خالی': 'bg-teal-100 text-teal-700',
}

const typeIcons = {
  فروش: '💰',
  معاوضه: '🔄',
  رایگان: '🎁',
  استخدام: '💼',
  'درخواست نیرو': '👷',
  گمشده: '🔴',
  پیداشده: '🟢',
  'نوبت خالی': '🗓',
}

export default function AdCard({ ad, onReveal }) {
  const handleReveal = () => {
    trackView(ad.id)
    onReveal(ad)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColors[ad.type] || 'bg-gray-100 text-gray-600'}`}>
          {typeIcons[ad.type] || ''} {ad.type}
        </span>
        <span className="text-xs text-gray-400">{ad.date}</span>
      </div>

      <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-1">{ad.title}</h3>
      <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-1">{ad.description}</p>

      <div className="flex items-center justify-between mb-3">
        <span
          className={`font-bold text-lg ${
            ad.price === 'رایگان'
              ? 'text-green-600'
              : ad.type === 'معاوضه'
              ? 'text-orange-600'
              : 'text-blue-600'
          }`}
        >
          {ad.price === 'رایگان' ? '🎁 رایگان' : ad.type === 'معاوضه' ? '🔄 معاوضه' : `${ad.price} تومان`}
        </span>
        <span className="text-xs text-gray-400">📍 {ad.city}</span>
      </div>

      <button
        onClick={handleReveal}
        className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm"
      >
        📞 مشاهده شماره تماس
      </button>
    </div>
  )
}
