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
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-orange-500 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 py-16 md:py-20">
        <div className="text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-white/10">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse-dot" />
            <span className="text-[13px] text-white/70 font-medium tracking-wide">بازارچه آنلاین محلی</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-[1.3] tracking-tight">
            بازارچه محلی
            <br />
            <span className="bg-gradient-to-l from-orange-300 to-amber-200 bg-clip-text text-transparent">پیرانشهر</span>
          </h1>
          <p className="text-white/50 text-[15px] md:text-[17px] mb-10 max-w-lg mx-auto leading-[2] font-medium">
            خرید، فروش، املاک، خودرو، معاوضه، خدمات و استخدام محلی — همه در یک مکان
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            <span className="bg-white/10 backdrop-blur-sm text-white/80 px-4 py-2 rounded-2xl text-[13px] font-semibold border border-white/5">
              💰 {counts.فروش} فروش
            </span>
            <span className="bg-white/10 backdrop-blur-sm text-white/80 px-4 py-2 rounded-2xl text-[13px] font-semibold border border-white/5">
              🏠 {counts.املاک} املاک
            </span>
            <span className="bg-white/10 backdrop-blur-sm text-white/80 px-4 py-2 rounded-2xl text-[13px] font-semibold border border-white/5">
              🚗 {counts.خودرو} خودرو
            </span>
            <span className="bg-white/10 backdrop-blur-sm text-white/80 px-4 py-2 rounded-2xl text-[13px] font-semibold border border-white/5">
              🔧 {counts.خدمات} خدمات
            </span>
            <span className="bg-white/10 backdrop-blur-sm text-white/80 px-4 py-2 rounded-2xl text-[13px] font-semibold border border-white/5">
              🔄 {counts.معاوضه} معاوضه
            </span>
            <span className="bg-white/10 backdrop-blur-sm text-white/80 px-4 py-2 rounded-2xl text-[13px] font-semibold border border-white/5">
              🎁 {counts.رایگان} رایگان
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/ads" className="bg-white text-gray-900 font-bold px-8 py-3.5 rounded-2xl hover:bg-gray-50 transition-all shadow-xl shadow-black/10 text-[14px] tracking-tight">
              مشاهده آگهی‌ها
            </Link>
            <Link to="/submit" className="bg-orange-500 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 text-[14px] tracking-tight">
              + ثبت آگهی رایگان
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
