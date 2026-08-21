import { trackView } from '../utils/tracker'

const typeColor = {
  فروش: 'bg-blue-500', معاوضه: 'bg-orange-500', 'معاوضه غذا': 'bg-orange-500', 'معاوضه کالا': 'bg-orange-500',
  رایگان: 'bg-emerald-500', استخدام: 'bg-purple-500', 'درخواست نیرو': 'bg-indigo-500',
  گمشده: 'bg-red-500', پیداشده: 'bg-teal-500', 'نوبت خالی': 'bg-cyan-500',
  'فروش ملک': 'bg-emerald-600', اجاره: 'bg-teal-600', 'فروش خودرو': 'bg-red-500',
  'خدمات فنی': 'bg-purple-500', 'خدمات خودرو': 'bg-amber-500', 'خدمات ساختمانی': 'bg-indigo-500',
}
const typeEmoji = {
  فروش: '💰', معاوضه: '🔄', 'معاوضه غذا': '🍲', 'معاوضه کالا': '🔄',
  رایگان: '🎁', استخدام: '💼', 'درخواست نیرو': '👷',
  گمشده: '🔴', پیداشده: '🟢', 'نوبت خالی': '🗓',
  'فروش ملک': '🏠', اجاره: '🏠', 'فروش خودرو': '🚗',
  'خدمات فنی': '🔧', 'خدمات خودرو': '🚗', 'خدمات ساختمانی': '🏗',
}

const premiumStyle = {
  'ویژه': { border: 'border-amber-300', badge: 'bg-amber-500', label: '⭐ ویژه', shadow: 'shadow-amber-100' },
  'بالای صفحه': { border: 'border-blue-300', badge: 'bg-blue-500', label: '📌 بالای صفحه', shadow: 'shadow-blue-100' },
  'فوری': { border: 'border-red-300', badge: 'bg-red-500', label: '🔥 فوری', shadow: 'shadow-red-100' },
}

function formatPrice(price, type) {
  if (price === 'رایگان' || price === 0) return 'رایگان'
  if (type === 'معاوضه') return 'معاوضه'
  if (!price) return '---'
  if (price >= 1000000000) return `${(price / 1000000000).toFixed(1)} میلیارد`
  if (price >= 1000000) return `${(price / 1000000).toFixed(0)} میلیون`
  return `${price}`
}

export default function AdCard({ ad, onReveal }) {
  const handleReveal = () => { trackView(ad.id); onReveal(ad) }
  const tc = typeColor[ad.type] || typeColor[ad.category] || 'bg-gray-400'
  const ps = ad.premium ? premiumStyle[ad.premium] : null

  return (
    <div className={`bg-white rounded-[20px] border hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer ${
      ps ? `${ps.border} shadow-lg ${ps.shadow}` : 'border-gray-100/80 hover:border-gray-200'
    }`}
      onClick={handleReveal}>
      {ps && (
        <div className={`${ps.badge} px-4 py-1.5 text-white text-[11px] font-bold flex items-center gap-1.5 tracking-wide`}>
          {ps.label}
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-extrabold text-gray-900 text-[15px] leading-[1.8] flex-1 ml-3 line-clamp-1 tracking-tight">{ad.title}</h3>
          <span className={`w-2 h-2 rounded-full ${tc} flex-shrink-0 mt-2 shadow-sm`} />
        </div>

        <p className="text-gray-400 text-[13px] leading-[1.9] mb-4 line-clamp-1">{ad.description}</p>

        {(ad.wants || ad.hasItem) && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {ad.hasItem && (
              <span className="text-[11px] font-semibold bg-orange-50 text-orange-600 px-3 py-1 rounded-xl border border-orange-100/80">
                🔄 دارد: {ad.hasItem}
              </span>
            )}
            {ad.wants && (
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-xl border border-emerald-100/80">
                🎯 میخواهد: {ad.wants}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2.5 mb-4">
          <span className={`text-[11px] font-bold text-white ${tc} px-2.5 py-1 rounded-lg`}>
            {typeEmoji[ad.type] || typeEmoji[ad.category] || ''} {ad.type || ad.category}
          </span>
          <span className="text-[12px] text-gray-400 font-medium">{ad.city}</span>
          {ad.subType && <span className="text-[11px] text-gray-300 font-medium">{ad.subType}</span>}
          <span className="text-[11px] text-gray-300 mr-auto font-medium">{ad.date}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <span className={`font-extrabold text-[18px] tracking-tight ${
            ad.price === 'رایگان' || ad.price === 0 ? 'text-emerald-500' :
            ad.type === 'معاوضه' ? 'text-orange-500' : 'text-gray-900'
          }`}>
            {formatPrice(ad.price, ad.type)}
            {ad.price !== 'رایگان' && ad.price !== 0 && ad.type !== 'معاوضه' && ad.price != null &&
              <span className="text-[12px] font-semibold text-gray-400 mr-1">تومان</span>}
          </span>
          <button onClick={(e) => { e.stopPropagation(); handleReveal() }}
            className="bg-gray-900 text-white px-4 py-2 rounded-xl text-[12px] font-bold hover:bg-gray-800 transition-all shadow-sm">
            مشاهده شماره
          </button>
        </div>
      </div>
    </div>
  )
}
