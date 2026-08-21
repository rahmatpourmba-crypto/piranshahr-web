import { trackView } from '../utils/tracker'

const premiumStyle = {
  'ویژه': { badge: '⭐ ویژه' },
  'بالای صفحه': { badge: '📌 بالای صفحه' },
  'فوری': { badge: '🔥 فوری' },
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
  const ps = ad.premium ? premiumStyle[ad.premium] : null

  return (
    <div className={`bg-white rounded-[20px] border border-gray-100/80 overflow-hidden group cursor-pointer hover:shadow-xl hover:border-gray-200 transition-all duration-300`}
      onClick={handleReveal}>
      {ps && (
        <div className="bg-gray-900 px-4 py-1.5 text-white text-[11px] font-bold flex items-center gap-1.5 tracking-wide">
          {ps.badge}
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-extrabold text-gray-900 text-[15px] leading-[1.8] flex-1 ml-3 line-clamp-1 tracking-tight">{ad.title}</h3>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-2.5" />
        </div>

        <p className="text-gray-400 text-[13px] leading-[1.9] mb-4 line-clamp-1">{ad.description}</p>

        {(ad.wants || ad.hasItem) && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {ad.hasItem && (
              <span className="text-[11px] font-semibold bg-gray-50 text-gray-600 px-3 py-1 rounded-xl border border-gray-100">
                دارد: {ad.hasItem}
              </span>
            )}
            {ad.wants && (
              <span className="text-[11px] font-semibold bg-gray-50 text-gray-600 px-3 py-1 rounded-xl border border-gray-100">
                میخواهد: {ad.wants}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2.5 mb-4">
          <span className="text-[11px] font-semibold bg-gray-50 text-gray-600 px-2.5 py-1 rounded-lg border border-gray-100">
            {ad.type || ad.category}
          </span>
          <span className="text-[12px] text-gray-400 font-medium">{ad.city}</span>
          {ad.subType && <span className="text-[11px] text-gray-300 font-medium">{ad.subType}</span>}
          <span className="text-[11px] text-gray-300 mr-auto font-medium">{ad.date}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <span className={`font-extrabold text-[18px] tracking-tight ${
            ad.price === 'رایگان' || ad.price === 0 ? 'text-gray-900' :
            ad.type === 'معاوضه' ? 'text-gray-900' : 'text-gray-900'
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
