import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import AdCard from '../components/AdCard'
import AdDetailModal from '../components/AdDetailModal'
import { CATEGORIES, PROVINCES } from '../data/provinces'
import { getAds } from '../lib/ads'
import { trackView } from '../utils/tracker'

export default function Ads() {
  const [searchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const qParam = searchParams.get('q')
  const [userCat, setUserCat] = useState(null)
  const activeCat = catParam ?? userCat ?? 'همه'
  const [query, setQuery] = useState(qParam || '')
  const [selectedAd, setSelectedAd] = useState(null)
  const [province, setProvince] = useState('آذربایجان غربی')
  const [city, setCity] = useState('پیرانشهر')
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

  const cities = PROVINCES[province] || []

  useEffect(() => {
    setLoading(true)
    getAds({ province: province || undefined, city: city || undefined })
      .then(setAds)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [province, city])

  const filteredAds = useMemo(() => {
    const q = query.trim()
    return ads.filter(ad => {
      const matchCat = activeCat === 'همه' || ad.category === activeCat
      const matchQuery = !q || ad.title?.toLowerCase().includes(q.toLowerCase()) || (ad.description || '').toLowerCase().includes(q.toLowerCase()) || (ad.category || '').toLowerCase().includes(q.toLowerCase())
      return matchCat && matchQuery
    })
  }, [activeCat, query, ads])

  const handleReveal = (ad) => { setSelectedAd(ad); trackView(ad.id, ad.category) }

  return (
    <div className="container py-8">
      <h1 className="font-bold text-[20px] text-gray-900 mb-6">آگهی‌ها</h1>

      <div className="relative mb-5">
        <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="جستجو در عنوان و توضیحات..." className="w-full bg-white border border-gray-200 rounded-xl pr-9 pl-9 py-3 text-[13px] text-gray-700 outline-none focus:border-[#A13D4C] transition-colors" />
        {query && <button onClick={() => setQuery('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"><X size={14} /></button>}
      </div>

      <div className="flex items-center gap-2 mb-5">
        <select value={province} onChange={e => { setProvince(e.target.value); setCity('') }}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-[12px] text-gray-700 outline-none focus:border-[#A13D4C]">
          <option value="">همه استان‌ها</option>
          {Object.keys(PROVINCES).sort((a,b) => a.localeCompare(b, 'fa')).map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={city} onChange={e => setCity(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-[12px] text-gray-700 outline-none focus:border-[#A13D4C]">
          <option value="">همه شهرها</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {province && <span className="text-[11px] text-[#A13D4C] bg-[#FDF2F3] px-2.5 py-1 rounded-full font-medium">{city || province}</span>}
      </div>

      <div className="flex items-center gap-1.5 mb-8 overflow-x-auto pb-1 -mx-5 px-5 sm:mx-0 sm:px-0">
        {CATEGORIES.map(cat => (
          <button key={cat.value} onClick={() => setUserCat(cat.value)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
              activeCat === cat.value ? 'bg-[#A13D4C] text-white' : cat.special ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:border-amber-300' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}>{cat.label}</button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton h-44" />)}
        </div>
      ) : filteredAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAds.map(ad => <AdCard key={ad.id} ad={ad} onReveal={handleReveal} />)}
        </div>
      ) : (
        <div className="text-center py-24">
          <Search size={32} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-[14px]">آگهی‌ای یافت نشد</p>
          <p className="text-gray-300 text-[12px] mt-1">شهر یا دسته دیگری را امتحان کنید</p>
        </div>
      )}

      <AdDetailModal ad={selectedAd} isOpen={Boolean(selectedAd)} onClose={() => setSelectedAd(null)} />
    </div>
  )
}
