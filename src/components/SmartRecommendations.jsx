import { getRecommendations } from '../utils/recommendations'
import AdCard from './AdCard'

export default function SmartRecommendations({ currentAd, allAds, onReveal }) {
  if (!currentAd || !allAds) return null
  const { sameCategory, related } = getRecommendations(currentAd, allAds)
  if (sameCategory.length === 0 && related.length === 0) return null

  return (
    <div className="space-y-8 mt-6">
      {sameCategory.length > 0 && (
        <div>
          <h3 className="font-bold text-[14px] text-gray-900 mb-3">آگهی‌های مشابه</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sameCategory.map((ad) => <AdCard key={ad.id} ad={ad} onReveal={onReveal} />)}
          </div>
        </div>
      )}
      {related.length > 0 && (
        <div>
          <h3 className="font-bold text-[14px] text-gray-900 mb-3">شاید بپسندید</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((ad) => <AdCard key={ad.id} ad={ad} onReveal={onReveal} />)}
          </div>
        </div>
      )}
    </div>
  )
}
