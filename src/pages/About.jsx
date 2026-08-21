import { Link } from 'react-router-dom'
import { Heart, Shield, Zap, Star } from 'lucide-react'

export default function About() {
  return (
    <div className="container py-12">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="font-bold text-[22px] text-gray-900 mb-4">پیرانشهرمارکت</h1>
        <p className="text-[14px] text-gray-500 leading-[2.2] mb-10">
          بازار محلی آنلاین پیرانشهر. جایی که خریدار و فروشنده مستقیماً به هم وصل می‌شوند، بدون واسطه.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
        {[
          { icon: <Zap size={20} className="text-gray-600" strokeWidth={1.8} />, title: 'ثبت آسان', desc: 'آگهی خود را در چند ثانیه ثبت کنید' },
          { icon: <Shield size={20} className="text-gray-600" strokeWidth={1.8} />, title: 'امنیت', desc: 'شماره تماس فقط با پرداخت ناچیز' },
          { icon: <Heart size={20} className="text-gray-600" strokeWidth={1.8} />, title: 'رایگان', desc: 'دسته‌های گمشده و رایگان بدون هزینه' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-5 text-center">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-3">{item.icon}</div>
            <h3 className="font-semibold text-gray-900 text-[14px] mb-1">{item.title}</h3>
            <p className="text-[12px] text-gray-400 leading-[1.9]">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/submit" className="bg-gray-900 text-white px-6 py-3 rounded-xl text-[14px] font-semibold hover:bg-gray-800 transition-colors">
          همین حالا آگهی ثبت کنید
        </Link>
      </div>
    </div>
  )
}
