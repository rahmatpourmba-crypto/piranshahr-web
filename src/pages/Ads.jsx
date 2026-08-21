import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, PackageSearch } from 'lucide-react'
import AdCard from '../components/AdCard'
import PaymentModal from '../components/PaymentModal'
import SmartRecommendations from '../components/SmartRecommendations'
import adsData from '../data/ads.json'
import { trackView } from '../utils/tracker'

const CATEGORIES = [
  'همه',
  'فروش',
  'معاوضه غذا',
  'رایگان',
  'استخدام',
  'درخواست نیرو',
  'گمشده',
  'پیداشده',
  'نوبت خالی',
]

export default function Ads() {
  const [searchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const [userCat, setUserCat] = useState(null)
  const activeCat = catParam ?? userCat ?? 'همه'
  const [query, setQuery] = useState('')
  const [selectedAd, setSelectedAd] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  const filteredAds = useMemo(() => {
    const q = query.trim()
    return adsData.filter((ad) => {
      const matchCat = activeCat === 'همه' || ad.category === activeCat
      const matchQuery =
        q === '' ||
        String(ad.title).includes(q) ||
        String(ad.description || '').includes(q)
      return matchCat && matchQuery
    })
  }, [activeCat, query])

  const handleReveal = (ad) => {
    setSelectedAd(ad)
    setExpandedId(ad.id)
    trackView(ad.id, ad.category)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">همه آگهی‌ها</h1>
        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full px-3 py-1">
          {filteredAds.length.toLocaleString('fa-IR')} آگهی
        </span>
      </div>

      <div className="relative mb-5">
        <Search className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-text-light pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو در آگهی‌ها..."
          className="w-full rounded-xl border border-border bg-card py-3 pr-12 pl-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setUserCat(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCat === cat
                ? 'bg-primary text-white shadow'
                : 'bg-card text-text-light border border-border hover:border-primary hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredAds.map((ad) => (
            <div key={ad.id} className="space-y-4">
              <AdCard ad={ad} onReveal={handleReveal} />
              {expandedId === ad.id && (
                <SmartRecommendations currentAd={ad} allAds={adsData} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <PackageSearch className="w-14 h-14 text-text-light/50" />
          <p className="text-lg font-semibold">آگهی‌ای یافت نشد</p>
          <p className="text-sm text-text-light">
            عبارت دیگری را جستجو کنید یا دسته‌بندی را تغییر دهید.
          </p>
        </div>
      )}

      <PaymentModal
        ad={selectedAd}
        isOpen={Boolean(selectedAd)}
        onClose={() => setSelectedAd(null)}
      />
    </div>
  )
}
