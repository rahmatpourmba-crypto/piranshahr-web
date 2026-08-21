import { Link } from 'react-router-dom'
import ads from '../data/ads.json'

export default function Hero() {
  const counts = {
    فروش: ads.filter((a) => a.category === 'فروش').length,
    معاوضه: ads.filter((a) => a.category === 'معاوضه غذا').length,
    رایگان: ads.filter((a) => a.category === 'رایگان').length,
    استخدام: ads.filter((a) => a.category === 'استخدام').length,
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-pink-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-purple-500/15 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-500/10 rounded-full blur-[60px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-300">بازارچه آنلاین محلی</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
            بازارچه محلی
            <br />
            <span className="gradient-text">پیرانشهر</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
            خرید، فروش، معاوضه غذا، استخدام و خدمات محلی — همه در یک مکان
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { label: 'فروش', count: counts.فروش, icon: '💰', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400' },
              { label: 'معاوضه', count: counts.معاوضه, icon: '🍲', color: 'from-orange-500/20 to-orange-600/10 border-orange-500/20 text-orange-400' },
              { label: 'رایگان', count: counts.رایگان, icon: '🎁', color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 text-emerald-400' },
              { label: 'استخدام', count: counts.استخدام, icon: '💼', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400' },
            ].map((item) => (
              <span key={item.label} className={`bg-gradient-to-r ${item.color} border backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium`}>
                {item.icon} {item.count} {item.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/ads" className="btn-primary text-sm shadow-lg shadow-indigo-500/30">
              مشاهده آگهی‌ها
            </Link>
            <Link to="/submit" className="btn-ghost text-sm">
              + ثبت آگهی رایگان
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
