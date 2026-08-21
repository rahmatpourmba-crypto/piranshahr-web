import { getRecommendations } from '../utils/recommendations'
import AdCard from './AdCard'

export default function SmartRecommendations({ currentAd, allAds, onReveal }) {
  if (!currentAd || !allAds) return null

  const { sameCategory, related } = getRecommendations(currentAd, allAds)

  if (sameCategory.length === 0 && related.length === 0) return null

  return (
    <div className="space-y-5 mt-5">
      {sameCategory.length > 0 && (
        <div>
          <h3 className="font-bold text-sm text-gray-900 mb-2">🔗 مشابه</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sameCategory.map((ad) => (
              <AdCard key={ad.id} ad={ad} onReveal={onReveal} />
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div>
          <h3 className="font-bold text-sm text-gray-900 mb-2">💡 شاید بپسندید</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {related.map((ad) => (
              <AdCard key={ad.id} ad={ad} onReveal={onReveal} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
