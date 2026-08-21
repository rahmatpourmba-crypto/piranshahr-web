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
    <section className="bg-gradient-to-bl from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">بازارچه محلی پیرانشهر</h1>
        <p className="text-lg md:text-xl text-blue-100 mb-6">
          آگهی‌های فروش، معاوضه غذا، استخدام، حمل و نقل و خدمات محلی
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="bg-white/15 px-4 py-1.5 rounded-full text-sm">
            🛒 {counts.فروش} آگهی فروش
          </span>
          <span className="bg-white/15 px-4 py-1.5 rounded-full text-sm">
            🍲 {counts.معاوضه} معاوضه غذا
          </span>
          <span className="bg-white/15 px-4 py-1.5 rounded-full text-sm">
            🎁 {counts.رایگان} هدیه رایگان
          </span>
          <span className="bg-white/15 px-4 py-1.5 rounded-full text-sm">
            💼 {counts.استخدام} آگهی استخدام
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/ads"
            className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            مشاهده آگهی‌ها
          </Link>
          <a
            href="https://t.me/Superapoiranshar_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 border border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors"
          >
            ثبت آگهی در تلگرام
          </a>
        </div>
      </div>
    </section>
  )
}
