import { getRecommendations } from '../utils/recommendations'
import AdCard from './AdCard'

export default function SmartRecommendations({ currentAd, allAds, onReveal }) {
  if (!currentAd || !allAds) return null

  const { sameCategory, related } = getRecommendations(currentAd, allAds)

  if (sameCategory.length === 0 && related.length === 0) return null

  return (
    <div className="mt-8">
      {sameCategory.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">🔗 آگهی‌های مشابه</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sameCategory.map((ad) => (
              <AdCard key={ad.id} ad={ad} onReveal={onReveal} />
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">💡 شاید بپسندید</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((ad) => (
              <AdCard key={ad.id} ad={ad} onReveal={onReveal} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
