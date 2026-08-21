import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import AdCard from '../components/AdCard'
import PaymentModal from '../components/PaymentModal'
import SmartBarter from '../components/SmartBarter'
import adsData from '../data/ads.json'
import { trackView } from '../utils/tracker'

const CATEGORIES = [
  { key: 'همه', icon: '📋' },
  { key: 'فروش', icon: '💰' },
  { key: 'املاک', icon: '🏠' },
  { key: 'خودرو', icon: '🚗' },
  { key: 'خدمات', icon: '🔧' },
  { key: 'معاوضه غذا', icon: '🍲' },
  { key: 'معاوضه کالا', icon: '🔄' },
  { key: 'رایگان', icon: '🎁' },
  { key: 'استخدام', icon: '💼' },
  { key: 'گمشده', icon: '🔴' },
  { key: 'پیداشده', icon: '🟢' },
  { key: 'نوبت خالی', icon: '🗓' },
]

const SERVICES = [
  { key: 'تعمیرکاری', icon: '🔩' },
  { key: 'سیم‌کشی', icon: '⚡' },
  { key: 'صافکاری', icon: '🚗' },
  { key: 'لوله‌کشی', icon: '🔧' },
  { key: 'نقاشی', icon: '🎨' },
  { key: 'کاشی‌کاری', icon: '🧱' },
  { key: 'نجاری', icon: '🪵' },
]

export default function Ads() {
  const [searchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const qParam = searchParams.get('q')
  const [userCat, setUserCat] = useState(null)
  const [userSubCat, setUserSubCat] = useState(null)
  const activeCat = catParam ?? userCat ?? 'همه'
  const [query, setQuery] = useState(qParam || '')
  const [selectedAd, setSelectedAd] = useState(null)
  const [view, setView] = useState('grid')

  const filteredAds = useMemo(() => {
    const q = query.trim()
    return adsData.filter((ad) => {
      const matchCat = activeCat === 'همه' || ad.category === activeCat || ad.type === activeCat
      const matchSubCat = !userSubCat || ad.subType === userSubCat
      const matchQuery = q === '' || ad.title.includes(q) || (ad.description || '').includes(q) ||
        (ad.hasItem || '').includes(q) || (ad.wants || '').includes(q)
      return matchCat && matchSubCat && matchQuery
    })
  }, [activeCat, userSubCat, query])

  const handleReveal = (ad) => { setSelectedAd(ad); trackView(ad.id, ad.category) }

  const showServices = activeCat === 'خدمات'

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-extrabold text-xl text-gray-900">آگهی‌ها</h1>
        <span className="text-xs text-gray-400 font-medium">{filteredAds.length} نتیجه</span>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو..." className="input-field pr-9 py-2.5 text-sm" />
        {query && (
          <button onClick={() => setQuery('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button key={cat.key} onClick={() => { setUserCat(cat.key); setUserSubCat(null) }}
            className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCat === cat.key
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-700'
            }`}>
            <span className="text-xs">{cat.icon}</span>
            {cat.key}
          </button>
        ))}
      </div>

      {showServices && (
        <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-none">
          {SERVICES.map((s) => (
            <button key={s.key} onClick={() => setUserSubCat(userSubCat === s.key ? null : s.key)}
              className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                userSubCat === s.key
                  ? 'bg-purple-500 text-white shadow-sm'
                  : 'bg-purple-50 text-purple-600 border border-purple-100 hover:bg-purple-100'
              }`}>
              <span>{s.icon}</span> {s.key}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1 mb-4">
        <button onClick={() => setView('grid')}
          className={`p-1.5 rounded-md transition-all ${view === 'grid' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1"/><rect x="8" y="0" width="6" height="6" rx="1"/><rect x="0" y="8" width="6" height="6" rx="1"/><rect x="8" y="8" width="6" height="6" rx="1"/></svg>
        </button>
        <button onClick={() => setView('list')}
          className={`p-1.5 rounded-md transition-all ${view === 'list' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="0" y="0" width="14" height="3" rx="1"/><rect x="0" y="5.5" width="14" height="3" rx="1"/><rect x="0" y="11" width="14" height="3" rx="1"/></svg>
        </button>
      </div>

      {filteredAds.length > 0 ? (
        view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredAds.map((ad) => <AdCard key={ad.id} ad={ad} onReveal={handleReveal} />)}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredAds.map((ad) => (
              <ListCard key={ad.id} ad={ad} onReveal={handleReveal} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-bold text-gray-600 text-sm mb-1">آگهی‌ای یافت نشد</p>
          <p className="text-xs text-gray-400">عبارت یا دسته‌بندی را تغییر دهید</p>
        </div>
      )}

      {selectedAd && <SmartBarter currentAd={selectedAd} allAds={adsData} onReveal={handleReveal} />}
      <PaymentModal ad={selectedAd} isOpen={Boolean(selectedAd)} onClose={() => setSelectedAd(null)} />
    </div>
  )
}

function ListCard({ ad, onReveal }) {
  const tc = { فروش: 'bg-blue-500', معاوضه: 'bg-orange-500', رایگان: 'bg-emerald-500', استخدام: 'bg-purple-500', گمشده: 'bg-red-500', پیداشده: 'bg-teal-500', 'نوبت خالی': 'bg-cyan-500', 'درخواست نیرو': 'bg-indigo-500', 'فروش ملک': 'bg-emerald-500', اجاره: 'bg-teal-500', 'فروش خودرو': 'bg-red-500', 'خدمات فنی': 'bg-purple-500', 'خدمات خودرو': 'bg-amber-500', 'خدمات ساختمانی': 'bg-indigo-500', 'معاوضه': 'bg-orange-500' }

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all p-3 flex items-center gap-3">
      <span className={`w-1.5 h-1.5 rounded-full ${tc[ad.type] || 'bg-gray-400'} flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-sm truncate">{ad.title}</h3>
        <span className="text-[10px] text-gray-400">{ad.type} · {ad.city}</span>
      </div>
      <span className={`font-extrabold text-sm ${
        ad.price === 'رایگان' || ad.price === 0 ? 'text-emerald-500' : ad.type === 'معاوضه' ? 'text-orange-500' : 'text-blue-600'
      }`}>
        {ad.price === 'رایگان' || ad.price === 0 ? 'رایگان' : ad.type === 'معاوضه' ? 'معاوضه' : `${ad.price}`}
      </span>
      <button onClick={() => { trackView(ad.id); onReveal(ad) }}
        className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all flex-shrink-0">
        شماره
      </button>
    </div>
  )
}
