import { trackView } from '../utils/tracker'

const typeColor = {
  فروش: 'bg-blue-500', معاوضه: 'bg-orange-500', رایگان: 'bg-emerald-500', استخدام: 'bg-purple-500',
  'درخواست نیرو': 'bg-indigo-500', گمشده: 'bg-red-500', پیداشده: 'bg-teal-500', 'نوبت خالی': 'bg-cyan-500',
}
const typeEmoji = {
  فروش: '💰', معاوضه: '🔄', رایگان: '🎁', استخدام: '💼',
  'درخواست نیرو': '👷', گمشده: '🔴', پیداشده: '🟢', 'نوبت خالی': '🗓',
}

export default function AdCard({ ad, onReveal }) {
  const handleReveal = () => { trackView(ad.id); onReveal(ad) }
  const tc = typeColor[ad.type] || 'bg-gray-400'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-extrabold text-gray-900 text-sm leading-relaxed flex-1 ml-2 line-clamp-1">{ad.title}</h3>
          <span className={`w-1 h-1 rounded-full ${tc} flex-shrink-0 mt-2`} />
        </div>

        <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-1">{ad.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-bold text-white ${tc} px-2 py-0.5 rounded-md`}>
            {typeEmoji[ad.type] || ''} {ad.type}
          </span>
          <span className="text-[10px] text-gray-400">{ad.city}</span>
          <span className="text-[10px] text-gray-300 mr-auto">{ad.date}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className={`font-extrabold text-lg ${
            ad.price === 'رایگان' ? 'text-emerald-500' : ad.type === 'معاوضه' ? 'text-orange-500' : 'text-blue-600'
          }`}>
            {ad.price === 'رایگان' ? 'رایگان' : ad.type === 'معاوضه' ? 'معاوضه' : `${ad.price}`}
            {ad.price !== 'رایگان' && ad.type !== 'معاوضه' && <span className="text-xs font-medium text-gray-400 mr-0.5">تومان</span>}
          </span>
          <button onClick={handleReveal}
            className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-all">
            مشاهده شماره
          </button>
        </div>
      </div>
    </div>
  )
}
