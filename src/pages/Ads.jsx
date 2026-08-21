import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, PackageSearch } from 'lucide-react'
import AdCard from '../components/AdCard'
import PaymentModal from '../components/PaymentModal'
import adsData from '../data/ads.json'
import { trackView } from '../utils/tracker'

const CATEGORIES = ['همه', 'فروش', 'معاوضه غذا', 'رایگان', 'استخدام', 'درخواست نیرو', 'گمشده', 'پیداشده', 'نوبت خالی']
const catEmojis = {
  همه: '📋', فروش: '💰', 'معاوضه غذا': '🍲', رایگان: '🎁', استخدام: '💼',
  'درخواست نیرو': '👷', گمشده: '🔴', پیداشده: '🟢', 'نوبت خالی': '🗓',
}

export default function Ads() {
  const [searchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const [userCat, setUserCat] = useState(null)
  const activeCat = catParam ?? userCat ?? 'همه'
  const [query, setQuery] = useState('')
  const [selectedAd, setSelectedAd] = useState(null)

  const filteredAds = useMemo(() => {
    const q = query.trim()
    return adsData.filter((ad) => {
      const matchCat = activeCat === 'همه' || ad.category === activeCat || ad.type === activeCat
      const matchQuery = q === '' || ad.title.includes(q) || (ad.description || '').includes(q)
      return matchCat && matchQuery
    })
  }, [activeCat, query])

  const handleReveal = (ad) => { setSelectedAd(ad); trackView(ad.id, ad.category) }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-extrabold text-lg text-white">همه آگهی‌ها</h1>
        <span className="bg-indigo-500/15 text-indigo-400 text-xs font-bold px-3 py-1 rounded-lg border border-indigo-500/20">
          {filteredAds.length} آگهی
        </span>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجو..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition" />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-5 scrollbar-none -mx-1 px-1">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setUserCat(cat)}
            className={`flex-shrink-0 flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all border ${
              activeCat === cat ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/15 hover:text-gray-300'
            }`}>
            <span>{catEmojis[cat]}</span> {cat}
          </button>
        ))}
      </div>

      {filteredAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredAds.map((ad) => <AdCard key={ad.id} ad={ad} onReveal={handleReveal} />)}
        </div>
      ) : (
        <div className="text-center py-16">
          <PackageSearch size={48} className="text-gray-700 mx-auto mb-3" />
          <p className="font-bold text-gray-400 mb-1">آگهی‌ای یافت نشد</p>
          <p className="text-xs text-gray-600">عبارت یا دسته‌بندی را تغییر دهید</p>
        </div>
      )}

      <PaymentModal ad={selectedAd} isOpen={Boolean(selectedAd)} onClose={() => setSelectedAd(null)} />
    </div>
  )
}
