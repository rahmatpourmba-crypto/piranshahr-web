import { useState } from 'react'
import { Store, UtensilsCrossed, Gift, Briefcase, Search, CalendarClock, Flame, Star } from 'lucide-react'
import Hero from '../components/Hero'
import CategoryCard from '../components/CategoryCard'
import LiveBanner from '../components/LiveBanner'
import AdCard from '../components/AdCard'
import PaymentModal from '../components/PaymentModal'
import adsData from '../data/ads.json'
import { getPopularAds, getUrgentAds } from '../utils/recommendations'

const categories = [
  { icon: Store, title: 'فروش', cat: 'فروش', link: '/ads?cat=فروش', color: 'blue' },
  { icon: UtensilsCrossed, title: 'معاوضه غذا', cat: 'معاوضه غذا', link: '/ads?cat=معاوضه غذا', color: 'orange' },
  { icon: Gift, title: 'رایگان', cat: 'رایگان', link: '/ads?cat=رایگان', color: 'green' },
  { icon: Briefcase, title: 'استخدام', cat: 'استخدام', link: '/ads?cat=استخدام', color: 'purple' },
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

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Star size={18} className="text-blue-600 fill-blue-600" />
            <h2 className="font-extrabold text-base text-gray-900">دسته‌بندی‌ها</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {categories.map((item) => (
              <CategoryCard
                key={item.cat}
                icon={item.icon}
                title={item.title}
                count={adsData.filter((ad) => ad.category === item.cat).length}
                link={item.link}
                color={item.color}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              <h2 className="font-extrabold text-base text-gray-900">پیشنهاد ویژه امروز</h2>
            </div>
            <a href="/piranshahr-web/ads" className="text-xs text-blue-600 font-medium hover:underline">مشاهده همه ←</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {popularAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} onReveal={setSelectedAd} />
            ))}
          </div>
        </section>

        {urgentAds.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Flame size={18} className="text-red-500 fill-red-500" />
              <h2 className="font-extrabold text-base text-gray-900">فوری: فرصت‌های ویژه</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {urgentAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} onReveal={setSelectedAd} />
              ))}
            </div>
          </section>
        )}
      </div>

      <PaymentModal ad={selectedAd} isOpen={Boolean(selectedAd)} onClose={() => setSelectedAd(null)} />
    </div>
  )
}
