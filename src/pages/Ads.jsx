import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, PackageSearch } from 'lucide-react'
import AdCard from '../components/AdCard'
import PaymentModal from '../components/PaymentModal'
import adsData from '../data/ads.json'
import { trackView } from '../utils/tracker'

const CATEGORIES = ['همه', 'فروش', 'معاوضه غذا', 'رایگان', 'استخدام', 'درخواست نیرو', 'گمشده', 'پیداشده', 'نوبت خالی']
const catEmojis = { همه: '📋', فروش: '💰', 'معاوضه غذا': '🍲', رایگان: '🎁', استخدام: '💼', 'درخواست نیرو': '👷', گمشده: '🔴', پیداشده: '🟢', 'نوبت خالی': '🗓' }

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
        <h1 className="font-extrabold text-lg text-gray-900">همه آگهی‌ها</h1>
        <span className="badge bg-blue-50 text-blue-600 border border-blue-200">{filteredAds.length} آگهی</span>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجو در آگهی‌ها..." className="input-field pr-10" />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-5 scrollbar-none -mx-1 px-1">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setUserCat(cat)}
            className={`flex-shrink-0 flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold border transition-all ${
              activeCat === cat ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}>{catEmojis[cat]} {cat}</button>
        ))}
      </div>

      {filteredAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredAds.map((ad) => <AdCard key={ad.id} ad={ad} onReveal={handleReveal} />)}
        </div>
      ) : (
        <div className="text-center py-16">
          <PackageSearch size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="font-bold text-gray-600 mb-1">آگهی‌ای یافت نشد</p>
          <p className="text-xs text-gray-400">عبارت یا دسته‌بندی را تغییر دهید</p>
        </div>
      )}

      <PaymentModal ad={selectedAd} isOpen={Boolean(selectedAd)} onClose={() => setSelectedAd(null)} />
    </div>
  )
}
