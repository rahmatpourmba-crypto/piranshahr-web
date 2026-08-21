import { useState } from 'react'
import { Store, Home as HomeIcon, Car, Wrench, UtensilsCrossed, ArrowLeftRight, Gift, Briefcase, Search, CalendarClock } from 'lucide-react'
import Hero from '../components/Hero'
import LiveBanner from '../components/LiveBanner'
import CategoryCard from '../components/CategoryCard'
import AdCard from '../components/AdCard'
import PaymentModal from '../components/PaymentModal'
import adsData from '../data/ads.json'
import { getPopularAds } from '../utils/recommendations'

const categories = [
  { icon: Store, title: 'فروش', cat: 'فروش', link: '/ads?cat=فروش' },
  { icon: HomeIcon, title: 'املاک', cat: 'املاک', link: '/ads?cat=املاک' },
  { icon: Car, title: 'خودرو', cat: 'خودرو', link: '/ads?cat=خودرو' },
  { icon: Wrench, title: 'خدمات', cat: 'خدمات', link: '/ads?cat=خدمات' },
  { icon: UtensilsCrossed, title: 'معاوضه غذا', cat: 'معاوضه غذا', link: '/ads?cat=معاوضه غذا' },
  { icon: ArrowLeftRight, title: 'معاوضه کالا', cat: 'معاوضه کالا', link: '/ads?cat=معاوضه کالا' },
  { icon: Gift, title: 'رایگان', cat: 'رایگان', link: '/ads?cat=رایگان' },
  { icon: Briefcase, title: 'استخدام', cat: 'استخدام', link: '/ads?cat=استخدام' },
  { icon: Search, title: 'گمشده و پیداشده', cat: 'گمشده', link: '/ads?cat=گمشده' },
  { icon: CalendarClock, title: 'نوبت خالی', cat: 'نوبت خالی', link: '/ads?cat=نوبت خالی' },
]

export default function Home() {
  const [selectedAd, setSelectedAd] = useState(null)
  const popularAds = getPopularAds(adsData)

  return (
    <div>
      <Hero />
      <LiveBanner />
      <div className="container py-16 space-y-20">
        <section>
          <h2 className="font-bold text-[18px] text-gray-900 mb-6">دسته‌بندی‌ها</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map(c => (
              <CategoryCard key={c.cat} icon={c.icon} title={c.title}
                count={adsData.filter(a => a.category === c.cat).length} link={c.link} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[18px] text-gray-900">جدیدترین آگهی‌ها</h2>
            <a href="/piranshahr-web/ads" className="text-[13px] text-[#A13D4C] hover:text-[#8B2635] font-medium transition-colors">مشاهده همه</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularAds.map(ad => <AdCard key={ad.id} ad={ad} onReveal={setSelectedAd} />)}
          </div>
        </section>
      </div>
      <PaymentModal ad={selectedAd} isOpen={Boolean(selectedAd)} onClose={() => setSelectedAd(null)} />
    </div>
  )
}
