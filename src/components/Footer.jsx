import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Check } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'خانه' },
  { to: '/ads', label: 'آگهی‌ها' },
  { to: '/submit', label: 'ثبت آگهی' },
  { to: '/drivers', label: 'رانندگان' },
  { to: '/cargo', label: 'حمل بار' },
  { to: '/taxi', label: 'تاکسی' },
  { to: '/about', label: 'درباره ما' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const cardNumber = '6037701616939556'

  const handleCopy = () => {
    navigator.clipboard.writeText(cardNumber).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="border-t border-white/5 bg-gradient-to-b from-transparent to-[#0a0a1a]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm shadow-lg shadow-indigo-500/20">🏠</div>
              <span className="font-extrabold text-sm text-white">بازارچه پیرانشهر</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              بازارچه آنلاین آگهی‌های محلی پیرانشهر
            </p>
            <div className="glass rounded-xl p-3">
              <p className="text-[10px] text-gray-500 mb-1.5">💳 شماره کارت برای حمایت:</p>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-gray-300" dir="ltr">{cardNumber}</span>
                <button onClick={handleCopy} className="text-indigo-400 hover:text-indigo-300 p-0.5 transition-colors">
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
              </div>
              <p className="text-[10px] text-gray-600 mt-1">عبدالباسط رحمت پور · بانک صادرات</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs text-gray-300 mb-3">دسترسی سریع</h4>
            <div className="grid grid-cols-2 gap-y-1.5">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="text-xs text-gray-500 hover:text-indigo-400 transition-colors py-0.5">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs text-gray-300 mb-3">ثبت آگهی</h4>
            <Link to="/submit" className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all mb-4">
              + ثبت آگهی رایگان
            </Link>
            <p className="text-[10px] text-gray-600 leading-relaxed">
              سلب مسئولیت: این سایت صرفاً جهت اطلاع‌رسانی است و مسئولیت معاملات بر عهده طرفین می‌باشد.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-5 text-center text-[10px] text-gray-700">
          © ۱۴۰۵ بازارچه محلی پیرانشهر · ساخته شده با ❤️
        </div>
      </div>
    </footer>
  )
}
