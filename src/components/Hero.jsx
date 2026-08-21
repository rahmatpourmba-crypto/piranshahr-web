import { Link } from 'react-router-dom'
import ads from '../data/ads.json'

export default function Hero() {
  const counts = {
    فروش: ads.filter((a) => a.category === 'فروش').length,
    املاک: ads.filter((a) => a.category === 'املاک').length,
    خودرو: ads.filter((a) => a.category === 'خودرو').length,
    خدمات: ads.filter((a) => a.category === 'خدمات').length,
    معاوضه: ads.filter((a) => a.category === 'معاوضه غذا' || a.category === 'معاوضه کالا').length,
    رایگان: ads.filter((a) => a.category === 'رایگان').length,
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-80 h-80 bg-orange-400 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-20 w-60 h-60 bg-red-400 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-18">
        <div className="text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 border border-white/20">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse-dot" />
            <span className="text-xs text-blue-100 font-medium">بازارچه آنلاین محلی</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
            بازارچه محلی
            <br />
            <span className="text-orange-300">پیرانشهر</span>
          </h1>
          <p className="text-blue-200 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
            خرید، فروش، املاک، خودرو، معاوضه، خدمات و استخدام محلی — همه در یک مکان
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
              💰 {counts.فروش} فروش
            </span>
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
              🏠 {counts.املاک} املاک
            </span>
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
              🚗 {counts.خودرو} خودرو
            </span>
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
              🔧 {counts.خدمات} خدمات
            </span>
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
              🔄 {counts.معاوضه} معاوضه
            </span>
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
              🎁 {counts.رایگان} رایگان
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/ads" className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-blue-900/20 text-sm">
              مشاهده آگهی‌ها
            </Link>
            <Link to="/submit" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 text-sm border border-orange-400">
              + ثبت آگهی رایگان
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
