import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import AdCard from '../components/AdCard'
import AdDetailModal from '../components/AdDetailModal'
import LiveBanner from '../components/LiveBanner'
import { CATEGORIES, PROVINCES } from '../data/provinces'
import { getAds } from '../lib/ads'
import { Store, Home as HomeIcon, Car, Wrench, UtensilsCrossed, ArrowLeftRight, Gift, Briefcase, Search, CalendarClock, Tractor, MapPin, Phone, Smartphone, BriefcaseBusiness, Truck, Dog } from 'lucide-react'

const iconMap = { 'فروش': Store, 'املاک': HomeIcon, 'وسایل نقلیه': Car, 'خدمات': Wrench, 'معاوضه غذا': UtensilsCrossed, 'معاوضه': ArrowLeftRight, 'رایگان': Gift, 'استخدام': Briefcase, 'گمشده': Search, 'نوبت خالی': CalendarClock, 'دام و کشاورزی': Tractor, 'تاکسی': Phone, 'حمل و نقل': Truck, 'موبایل و تبلت': Smartphone, 'کولبری': MapPin }

export default function Home() {
  const [selectedAd, setSelectedAd] = useState(null)
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAds({ province: 'آذربایجان غربی', city: 'پیرانشهر' })
      .then(setAds)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const topCategories = CATEGORIES.slice(0, 10)

  return (
    <div>
      <section className="bg-white border-b border-gray-100">
        <div className="container py-16 md:py-24 text-center">
          <p className="text-[12px] text-[#A13D4C] font-medium mb-3 tracking-widest uppercase">بازار محلی پیرانشهر</p>
          <h1 className="text-3xl md:text-[44px] font-bold text-gray-900 mb-4 leading-[1.3] tracking-tight">پیرانشهرمارکت</h1>
          <p className="text-gray-500 text-[15px] mb-10 max-w-sm mx-auto leading-[2]">خرید، فروش، املاک، خودرو، معاوضه، خدمات و استخدام — همه در یک مکان</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/ads" className="bg-[#A13D4C] text-white font-semibold px-7 py-3 rounded-xl text-[14px] hover:bg-[#8B2635] transition-colors">مشاهده آگهی‌ها</Link>
            <Link to="/submit" className="bg-white text-gray-900 font-semibold px-7 py-3 rounded-xl text-[14px] border border-gray-200 hover:border-gray-300 transition-colors">ثبت آگهی رایگان</Link>
          </div>
        </div>
      </section>
      <LiveBanner />
      <div className="container py-16 space-y-20">
        <section>
          <h2 className="font-bold text-[18px] text-gray-900 mb-6">دسته‌بندی‌ها</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {topCategories.map(c => (
              <CategoryCard key={c.value} icon={iconMap[c.value]} title={c.label}
                count={ads.filter(a => a.category === c.value).length} link={`/ads?cat=${c.value}`} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[18px] text-gray-900">جدیدترین آگهی‌ها</h2>
            <Link to="/ads" className="text-[13px] text-[#A13D4C] hover:text-[#8B2635] font-medium transition-colors">مشاهده همه</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1,2,3].map(i => <div key={i} className="skeleton h-44" />)}
            </div>
          ) : ads.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ads.slice(0, 6).map(ad => <AdCard key={ad.id} ad={ad} onReveal={setSelectedAd} />)}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-[14px] py-12">هنوز آگهی ثبت نشده.</p>
          )}
        </section>
      </div>
      <AdDetailModal ad={selectedAd} isOpen={Boolean(selectedAd)} onClose={() => setSelectedAd(null)} />
    </div>
  )
}
