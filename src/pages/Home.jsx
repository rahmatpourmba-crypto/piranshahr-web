import { useState } from 'react'
import { Store, UtensilsCrossed, Gift, Briefcase, Search, CalendarClock, Star, Home as HomeIcon, Car, Wrench, ArrowLeftRight } from 'lucide-react'
import Hero from '../components/Hero'
import CategoryCard from '../components/CategoryCard'
import LiveBanner from '../components/LiveBanner'
import AdCard from '../components/AdCard'
import PaymentModal from '../components/PaymentModal'
import adsData from '../data/ads.json'
import { getPopularAds, getUrgentAds } from '../utils/recommendations'

const categories = [
  { icon: Store, title: 'فروش', cat: 'فروش', link: '/ads?cat=فروش', color: 'blue' },
  { icon: HomeIcon, title: 'املاک', cat: 'املاک', link: '/ads?cat=املاک', color: 'emerald' },
  { icon: Car, title: 'خودرو', cat: 'خودرو', link: '/ads?cat=خودرو', color: 'red' },
  { icon: Wrench, title: 'خدمات', cat: 'خدمات', link: '/ads?cat=خدمات', color: 'purple' },
  { icon: UtensilsCrossed, title: 'معاوضه غذا', cat: 'معاوضه غذا', link: '/ads?cat=معاوضه غذا', color: 'orange' },
  { icon: ArrowLeftRight, title: 'معاوضه کالا', cat: 'معاوضه کالا', link: '/ads?cat=معاوضه کالا', color: 'amber' },
  { icon: Gift, title: 'رایگان', cat: 'رایگان', link: '/ads?cat=رایگان', color: 'green' },
  { icon: Briefcase, title: 'استخدام', cat: 'استخدام', link: '/ads?cat=استخدام', color: 'indigo' },
  { icon: Search, title: 'گمشده و پیداشده', cat: 'گمشده', link: '/ads?cat=گمشده', color: 'red' },
  { icon: CalendarClock, title: 'نوبت خالی', cat: 'نوبت خالی', link: '/ads?cat=نوبت خالی', color: 'teal' },
]

export default function Home() {
  const [selectedAd, setSelectedAd] = useState(null)
  const popularAds = getPopularAds(adsData)
  const urgentAds = getUrgentAds(adsData)

  return (
    <div>
      <Hero />
      <LiveBanner />
      <div className="max-w-6xl mx-auto px-5 py-12 space-y-12">
        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <Star size={18} className="text-gray-900 fill-gray-900" />
            <h2 className="font-extrabold text-[18px] text-gray-900 tracking-tight">دسته‌بندی‌ها</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((c) => (
              <CategoryCard key={c.cat} icon={c.icon} title={c.title}
                count={adsData.filter((a) => a.category === c.cat).length} link={c.link} color={c.color} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Star size={18} className="text-amber-500 fill-amber-500" />
              <h2 className="font-extrabold text-[18px] text-gray-900 tracking-tight">پیشنهاد ویژه</h2>
            </div>
            <a href="/piranshahr-web/ads" className="text-[13px] text-gray-500 font-bold hover:text-gray-900 transition-colors">مشاهده همه ←</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularAds.map((ad) => <AdCard key={ad.id} ad={ad} onReveal={setSelectedAd} />)}
          </div>
        </section>

        {urgentAds.length > 0 && (
          <section>
            <div className="flex items-center gap-2.5 mb-5">
              <Star size={18} className="text-red-500 fill-red-500" />
              <h2 className="font-extrabold text-[18px] text-gray-900 tracking-tight">فوری: فرصت‌های ویژه</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {urgentAds.map((ad) => <AdCard key={ad.id} ad={ad} onReveal={setSelectedAd} />)}
            </div>
          </section>
        )}
      </div>
      <PaymentModal ad={selectedAd} isOpen={Boolean(selectedAd)} onClose={() => setSelectedAd(null)} />
    </div>
  )
}
