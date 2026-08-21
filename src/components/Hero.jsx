import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="container py-20 md:py-28 text-center">
        <p className="text-[12px] text-[#A13D4C] font-medium mb-3 tracking-widest uppercase">بازار محلی پیرانشهر</p>
        <h1 className="text-3xl md:text-[44px] font-bold text-gray-900 mb-4 leading-[1.3] tracking-tight">
          پیرانشهرمارکت
        </h1>
        <p className="text-gray-500 text-[15px] mb-10 max-w-sm mx-auto leading-[2]">
          خرید، فروش، املاک، خودرو، معاوضه، خدمات و استخدام — همه در یک مکان
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/ads" className="bg-[#A13D4C] text-white font-semibold px-7 py-3 rounded-xl text-[14px] hover:bg-[#8B2635] transition-colors">
            مشاهده آگهی‌ها
          </Link>
          <Link to="/submit" className="bg-white text-gray-900 font-semibold px-7 py-3 rounded-xl text-[14px] border border-gray-200 hover:border-gray-300 transition-colors">
            ثبت آگهی رایگان
          </Link>
        </div>
      </div>
    </section>
  )
}
