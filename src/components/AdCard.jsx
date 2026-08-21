import { trackView } from '../utils/tracker'

const typeConfig = {
  فروش: { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: '💰' },
  معاوضه: { color: 'bg-orange-50 text-orange-700 border-orange-200', icon: '🔄' },
  رایگان: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: '🎁' },
  استخدام: { color: 'bg-purple-50 text-purple-700 border-purple-200', icon: '💼' },
  'درخواست نیرو': { color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: '👷' },
  گمشده: { color: 'bg-red-50 text-red-700 border-red-200', icon: '🔴' },
  پیداشده: { color: 'bg-teal-50 text-teal-700 border-teal-200', icon: '🟢' },
  'نوبت خالی': { color: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: '🗓' },
}

export default function AdCard({ ad, onReveal }) {
  const tc = typeConfig[ad.type] || { color: 'bg-gray-50 text-gray-600 border-gray-200', icon: '📋' }

  const handleReveal = () => {
    trackView(ad.id)
    onReveal(ad)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      <div className="p-3.5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${tc.color}`}>
            {tc.icon} {ad.type}
          </span>
          <span className="text-[11px] text-gray-400">{ad.date}</span>
        </div>

        <h3 className="font-bold text-gray-900 text-[15px] mb-1.5 line-clamp-1 leading-relaxed">{ad.title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">{ad.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className={`font-extrabold text-base ${
            ad.price === 'رایگان' ? 'text-emerald-600'
            : ad.type === 'معاوضه' ? 'text-orange-600'
            : 'text-blue-600'
          }`}>
            {ad.price === 'رایگان' ? '🎁 رایگان' : ad.type === 'معاوضه' ? '🔄 معاوضه' : `${ad.price} تومان`}
          </span>
          <span className="text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">📍 {ad.city}</span>
        </div>

        <button
          onClick={handleReveal}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all text-xs"
        >
          📞 مشاهده شماره تماس
        </button>
      </div>
    </div>
  )
}
