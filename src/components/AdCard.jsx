import { trackView } from '../utils/tracker'

const typeConfig = {
  فروش: { color: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400', icon: '💰' },
  معاوضه: { color: 'from-orange-500/20 to-orange-600/10 border-orange-500/20 text-orange-400', icon: '🔄' },
  رایگان: { color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 text-emerald-400', icon: '🎁' },
  استخدام: { color: 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400', icon: '💼' },
  'درخواست نیرو': { color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/20 text-indigo-400', icon: '👷' },
  گمشده: { color: 'from-red-500/20 to-red-600/10 border-red-500/20 text-red-400', icon: '🔴' },
  پیداشده: { color: 'from-teal-500/20 to-teal-600/10 border-teal-500/20 text-teal-400', icon: '🟢' },
  'نوبت خالی': { color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/20 text-cyan-400', icon: '🗓' },
}

export default function AdCard({ ad, onReveal }) {
  const tc = typeConfig[ad.type] || { color: 'from-gray-500/20 to-gray-600/10 border-gray-500/20 text-gray-400', icon: '📋' }

  const handleReveal = () => {
    trackView(ad.id)
    onReveal(ad)
  }

  return (
    <div className="glass rounded-xl overflow-hidden flex flex-col glow-card animate-fade-in-up">
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2.5">
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-gradient-to-r ${tc.color} border`}>
            {tc.icon} {ad.type}
          </span>
          <span className="text-[10px] text-gray-600">{ad.date}</span>
        </div>

        <h3 className="font-bold text-white text-sm mb-1.5 line-clamp-1">{ad.title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">{ad.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className={`font-extrabold text-base ${
            ad.price === 'رایگان' ? 'text-emerald-400'
            : ad.type === 'معاوضه' ? 'text-orange-400'
            : 'text-indigo-400'
          }`}>
            {ad.price === 'رایگان' ? '🎁 رایگان' : ad.type === 'معاوضه' ? '🔄 معاوضه' : `${ad.price} تومان`}
          </span>
          <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">📍 {ad.city}</span>
        </div>

        <button onClick={handleReveal}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2.5 rounded-lg font-bold text-xs hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-200">
          📞 مشاهده شماره تماس
        </button>
      </div>
    </div>
  )
}
