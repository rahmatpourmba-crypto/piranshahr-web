import { useState } from 'react'
import {
  Store,
  UtensilsCrossed,
  Gift,
  Briefcase,
  Search,
  CalendarClock,
  Sparkles,
  Flame,
} from 'lucide-react'
import Hero from '../components/Hero'
import CategoryCard from '../components/CategoryCard'
import LiveBanner from '../components/LiveBanner'
import AdCard from '../components/AdCard'
import SmartRecommendations from '../components/SmartRecommendations'
import PaymentModal from '../components/PaymentModal'
import adsData from '../data/ads.json'
import { getPopularAds, getUrgentAds } from '../utils/recommendations'

const categories = [
  {
    icon: Store,
    title: 'فروش',
    cat: 'فروش',
    link: '/ads?cat=فروش',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: UtensilsCrossed,
    title: 'معاوضه غذا',
    cat: 'معاوضه غذا',
    link: '/ads?cat=معاوضه غذا',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Gift,
    title: 'رایگان',
    cat: 'رایگان',
    link: '/ads?cat=رایگان',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Briefcase,
    title: 'استخدام',
    cat: 'استخدام',
    link: '/ads?cat=استخدام',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Search,
    title: 'گمشده و پیداشده',
    cat: 'گمشده',
    link: '/ads?cat=گمشده',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: CalendarClock,
    title: 'نوبت خالی',
    cat: 'نوبت خالی',
    link: '/ads?cat=نوبت خالی',
    color: 'bg-sky-100 text-sky-600',
  },
]

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </span>
      <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
    </div>
  )
}

export default function Home() {
  const [selectedAd, setSelectedAd] = useState(null)
  const popularAds = getPopularAds(adsData)
  const urgentAds = getUrgentAds(adsData)

  return (
    <div>
      <Hero />
      <LiveBanner />

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">
        <section>
          <SectionTitle icon={Sparkles} title="دسته‌بندی‌ها" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((item) => (
              <CategoryCard
                key={item.cat}
                icon={item.icon}
                title={item.title}
                count={
                  adsData.filter((ad) => ad.category === item.cat).length
                }
                link={item.link}
                color={item.color}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={Sparkles} title="پیشنهاد ویژه امروز" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} onReveal={setSelectedAd} />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={Flame} title="فوری: فرصت‌های ویژه" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {urgentAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} onReveal={setSelectedAd} />
            ))}
          </div>
        </section>

        {popularAds.length > 0 && (
          <section>
            <SectionTitle
              icon={Sparkles}
              title="پیشنهاد هوشمند بر اساس آگهی ویژه"
            />
            <SmartRecommendations
              currentAd={popularAds[0]}
              allAds={adsData}
            />
          </section>
        )}
      </div>

      <PaymentModal
        ad={selectedAd}
        isOpen={Boolean(selectedAd)}
        onClose={() => setSelectedAd(null)}
      />
    </div>
  )
}
