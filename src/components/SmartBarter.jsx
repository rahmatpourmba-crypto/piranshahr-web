import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftRight } from 'lucide-react'

export default function SmartBarter({ currentAd, allAds, onReveal }) {
  if (!currentAd || !allAds) return null

  const matches = useMemo(() => {
    const wants = (currentAd.wants || '').toLowerCase()
    const has = (currentAd.hasItem || '').toLowerCase()
    const title = (currentAd.title || '').toLowerCase()
    const desc = (currentAd.description || '').toLowerCase()
    const searchTerms = [wants, has, title, desc].filter(Boolean)
    if (searchTerms.length === 0) return []
    return allAds
      .filter(ad => {
        if (ad.id === currentAd.id) return false
        if (ad.category !== 'معاوضه کالا' && ad.category !== 'معاوضه غذا') return false
        const adText = `${ad.title} ${ad.description} ${ad.hasItem || ''} ${ad.wants || ''}`.toLowerCase()
        return searchTerms.some(term => term && adText.includes(term))
      })
      .slice(0, 4)
  }, [currentAd, allAds])

  if (matches.length === 0) return null

  return (
    <div className="mt-5 p-5 rounded-2xl bg-[#FDF2F3] border border-[#F5E6E8]">
      <div className="flex items-center gap-2 mb-3">
        <ArrowLeftRight size={16} className="text-[#A13D4C]" />
        <h3 className="font-bold text-[13px] text-gray-900">پیشنهاد معاوضه هوشمند</h3>
      </div>
      <p className="text-[11px] text-gray-500 mb-3">آگهی‌هایی که ممکن است برای معاوضه مناسب باشند:</p>
      <div className="space-y-2">
        {matches.map(ad => (
          <Link key={ad.id} to={`/ads?q=${encodeURIComponent(ad.title)}`}
            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#F5E6E8] hover:border-[#A13D4C] hover:shadow-md transition-all">
            <span className="w-8 h-8 rounded-lg bg-[#FDF2F3] flex items-center justify-center text-sm flex-shrink-0">🔄</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[12px] text-gray-900 truncate">{ad.title}</h4>
              <p className="text-[10px] text-gray-400 truncate">{ad.description}</p>
            </div>
            <span className="text-[10px] font-bold text-[#A13D4C] bg-[#FDF2F3] px-2 py-0.5 rounded-full flex-shrink-0">
              {ad.wants || 'معاوضه'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
