import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import AdCard from '../components/AdCard'
import PaymentModal from '../components/PaymentModal'
import adsData from '../data/ads.json'
import { trackView } from '../utils/tracker'
import { sortAdsByPremium } from '../utils/recommendations'

const CATEGORIES = ['همه', 'فروش', 'املاک', 'خودرو', 'خدمات', 'معاوضه غذا', 'معاوضه کالا', 'رایگان', 'استخدام', 'گمشده', 'پیداشده', 'نوبت خالی']

export default function Ads() {
  const [searchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const [userCat, setUserCat] = useState(null)
  const activeCat = catParam ?? userCat ?? 'همه'
  const [query, setQuery] = useState('')
  const [selectedAd, setSelectedAd] = useState(null)

  const filteredAds = useMemo(() => {
    const q = query.trim()
    return sortAdsByPremium(adsData.filter(ad => {
      const matchCat = activeCat === 'همه' || ad.category === activeCat
      const matchQuery = !q || ad.title.includes(q) || (ad.description || '').includes(q) || (ad.hasItem || '').includes(q) || (ad.wants || '').includes(q)
      return matchCat && matchQuery
    }))
  }, [activeCat, query])

  const handleReveal = (ad) => { setSelectedAd(ad); trackView(ad.id, ad.category) }

  return (
    <div className="container py-8">
      <h1 className="font-bold text-[20px] text-gray-900 mb-6">آگهی‌ها</h1>

      <div className="relative mb-5">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="جستجو..." className="w-full bg-white border border-gray-200 rounded-xl pr-9 pl-9 py-2.5 text-[13px] text-gray-700 outline-none focus:border-gray-400 transition-colors" />
        {query && <button onClick={() => setQuery('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"><X size={14} /></button>}
      </div>

      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1 -mx-5 px-5 sm:mx-0 sm:px-0">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setUserCat(cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
              activeCat === cat ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}>{cat}</button>
        ))}
      </div>

      {filteredAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAds.map(ad => <AdCard key={ad.id} ad={ad} onReveal={handleReveal} />)}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-gray-400 text-[14px]">آگهی‌ای یافت نشد</p>
        </div>
      )}

      <PaymentModal ad={selectedAd} isOpen={Boolean(selectedAd)} onClose={() => setSelectedAd(null)} />
    </div>
  )
}
