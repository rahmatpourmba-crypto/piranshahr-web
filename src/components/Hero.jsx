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
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-white rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
            بازارچه محلی پیرانشهر
          </h1>
          <p className="text-blue-200 text-sm md:text-base mb-5">
            آگهی فروش، معاوضه غذا، استخدام، حمل و نقل و خدمات محلی
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
              🛒 {counts.فروش} فروش
            </span>
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
              🍲 {counts.معاوضه} معاوضه
            </span>
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
              🎁 {counts.رایگان} رایگان
            </span>
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
              💼 {counts.استخدام} استخدام
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              to="/ads"
              className="bg-white text-blue-700 font-bold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-blue-900/20 text-sm"
            >
              مشاهده آگهی‌ها
            </Link>
            <a
              href="https://t.me/Superapoiranshar_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 border border-white/25 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-white/25 transition-all text-sm"
            >
              ثبت آگهی در تلگرام
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
