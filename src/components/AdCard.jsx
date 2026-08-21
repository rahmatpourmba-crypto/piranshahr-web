import { trackView } from '../utils/tracker'

function formatPrice(price, type) {
  if (price === 'رایگان' || price === 0) return 'رایگان'
  if (type === 'معاوضه') return 'معاوضه'
  if (!price) return '---'
  if (price >= 1000000000) return `${(price / 1000000000).toFixed(1)} میلیارد`
  if (price >= 1000000) return `${(price / 1000000).toFixed(0)} میلیون`
  return `${price.toLocaleString('fa-IR')}`
}

export default function AdCard({ ad, onReveal }) {
  const handleReveal = () => { trackView(ad.id); onReveal(ad) }

  return (
    <div className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer group"
      onClick={handleReveal}>
      {ad.premium && (
        <div className="bg-gray-900 px-3 py-1 text-white text-[10px] font-semibold">
          {ad.premium === 'فوری' ? 'فوری' : ad.premium === 'ویژه' ? 'ویژه' : 'بالای صفحه'}
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-gray-900 text-[14px] leading-[1.7] line-clamp-1">{ad.title}</h3>
          {ad.wants && <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md flex-shrink-0">معاوضه</span>}
        </div>
        <p className="text-gray-400 text-[13px] line-clamp-1 mb-3">{ad.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900 text-[15px]">
            {formatPrice(ad.price, ad.type)}
            {ad.price != null && ad.price !== 0 && ad.price !== 'رایگان' && ad.type !== 'معاوضه' &&
              <span className="text-[11px] font-medium text-gray-400 mr-1">تومان</span>}
          </span>
          <span className="text-[11px] text-gray-400">{ad.city}</span>
        </div>
      </div>
    </div>
  )
}
