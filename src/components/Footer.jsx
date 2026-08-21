import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Check } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'خانه' },
  { to: '/ads', label: 'آگهی‌ها' },
  { to: '/submit', label: 'ثبت آگهی' },
  { to: '/ads?cat=املاک', label: 'املاک' },
  { to: '/ads?cat=خودرو', label: 'خودرو' },
  { to: '/ads?cat=خدمات', label: 'خدمات' },
  { to: '/drivers', label: 'رانندگان' },
  { to: '/cargo', label: 'حمل بار' },
  { to: '/taxi', label: 'تاکسی' },
  { to: '/about', label: 'درباره ما' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const cardNumber = '6037701616939556'
  const handleCopy = () => { navigator.clipboard.writeText(cardNumber).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white text-sm shadow-lg">🏠</div>
              <span className="font-extrabold text-sm">بازارچه پیرانشهر</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">بازارچه آنلاین آگهی‌های محلی پیرانشهر</p>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 mb-1.5">💳 حمایت مالی:</p>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold" dir="ltr">{cardNumber}</span>
                <button onClick={handleCopy} className="text-blue-400 hover:text-blue-300 p-0.5">
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
              </div>
              <p className="text-[10px] text-gray-600 mt-1">عبدالباسط رحمت پور · صادرات</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs text-gray-300 mb-3">دسترسی سریع</h4>
            <div className="grid grid-cols-2 gap-y-1.5">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="text-xs text-gray-500 hover:text-white transition-colors py-0.5">{l.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs text-gray-300 mb-3">ثبت آگهی</h4>
            <Link to="/submit" className="flex items-center justify-center gap-2 btn-orange text-xs py-2.5 rounded-xl mb-4">
              + ثبت آگهی رایگان
            </Link>
            <p className="text-[10px] text-gray-600 leading-relaxed">
              سلب مسئولیت: این سایت صرفاً جهت اطلاع‌رسانی است و مسئولیت معاملات بر عهده طرفین می‌باشد.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-5 text-center text-[10px] text-gray-700">
          © ۱۴۰۵ بازارچه محلی پیرانشهر
        </div>
      </div>
    </footer>
  )
}
