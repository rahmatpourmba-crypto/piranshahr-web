import { trackView } from '../utils/tracker'

const typeConfig = {
  فروش: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', icon: '💰' },
  معاوضه: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', icon: '🔄' },
  رایگان: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: '🎁' },
  استخدام: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', icon: '💼' },
  'درخواست نیرو': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', icon: '👷' },
  گمشده: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', icon: '🔴' },
  پیداشده: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', icon: '🟢' },
  'نوبت خالی': { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', icon: '🗓' },
}

export default function AdCard({ ad, onReveal }) {
  const tc = typeConfig[ad.type] || { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', icon: '📋' }

  const handleReveal = () => { trackView(ad.id); onReveal(ad) }

  return (
    <div className="card overflow-hidden flex flex-col animate-fade-up">
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className={`badge ${tc.bg} ${tc.text} border ${tc.border}`}>
            {tc.icon} {ad.type}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">{ad.date}</span>
        </div>

        <h3 className="font-extrabold text-gray-900 text-[15px] mb-1.5 line-clamp-1 leading-relaxed">{ad.title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">{ad.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className={`font-extrabold text-base ${
            ad.price === 'رایگان' ? 'text-emerald-500' : ad.type === 'معاوضه' ? 'text-orange-500' : 'text-blue-600'
          }`}>
            {ad.price === 'رایگان' ? '🎁 رایگان' : ad.type === 'معاوضه' ? '🔄 معاوضه' : `${ad.price} تومان`}
          </span>
          <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full font-medium">📍 {ad.city}</span>
        </div>

        <button onClick={handleReveal}
          className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-1.5">
          📞 مشاهده شماره تماس
        </button>
      </div>
    </div>
  )
}
