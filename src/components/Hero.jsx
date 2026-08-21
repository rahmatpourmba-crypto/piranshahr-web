import { Link } from 'react-router-dom'
import ads from '../data/ads.json'

export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="container py-16 md:py-24 text-center">
        <p className="text-[13px] text-gray-400 font-medium mb-4 tracking-wide">بازار محلی پیرانشهر</p>
        <h1 className="text-3xl md:text-[42px] font-bold text-gray-900 mb-4 leading-[1.4] tracking-tight">
          پیرانشهرمارکت
        </h1>
        <p className="text-gray-500 text-[15px] mb-8 max-w-md mx-auto leading-[2]">
          خرید، فروش، املاک، خودرو، معاوضه، خدمات و استخدام — همه در یک مکان
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/ads" className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl text-[14px] hover:bg-gray-800 transition-colors">
            مشاهده آگهی‌ها
          </Link>
          <Link to="/submit" className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl text-[14px] border border-gray-200 hover:border-gray-300 transition-colors">
            ثبت آگهی رایگان
          </Link>
        </div>
      </div>
    </section>
  )
}
