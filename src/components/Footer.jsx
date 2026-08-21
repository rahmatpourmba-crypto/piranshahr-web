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
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-white text-sm shadow-lg">🏠</div>
              <div>
                <span className="font-extrabold text-[15px] block leading-tight">بازارچه پیرانشهر</span>
                <span className="text-[11px] text-gray-500 font-medium">بازارچه آنلاین محلی</span>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
              <p className="text-[11px] text-gray-500 mb-2 font-medium">💳 حمایت مالی:</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[13px] font-bold tracking-wider" dir="ltr">{cardNumber}</span>
                <button onClick={handleCopy} className="text-blue-400 hover:text-blue-300 p-1 transition-colors">
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-[11px] text-gray-600 mt-2">عبدالباسط رحمت پور · صادرات</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[13px] text-gray-300 mb-4 tracking-wide">دسترسی سریع</h4>
            <div className="grid grid-cols-2 gap-y-2">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="text-[13px] text-gray-500 hover:text-white transition-colors py-0.5">{l.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[13px] text-gray-300 mb-4 tracking-wide">ثبت آگهی</h4>
            <Link to="/submit" className="flex items-center justify-center gap-2 bg-orange-500 text-white text-[13px] font-bold py-3 rounded-2xl mb-5 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
              + ثبت آگهی رایگان
            </Link>
            <p className="text-[11px] text-gray-600 leading-[2]">
              سلب مسئولیت: این سایت صرفاً جهت اطلاع‌رسانی است و مسئولیت معاملات بر عهده طرفین می‌باشد.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-10 pt-6 text-center text-[12px] text-gray-700 font-medium">
          © ۱۴۰۵ بازارچه محلی پیرانشهر
        </div>
      </div>
    </footer>
  )
}
