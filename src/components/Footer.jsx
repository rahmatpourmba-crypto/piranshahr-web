import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Check, Send } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'خانه' },
  { to: '/ads', label: 'آگهی‌ها' },
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
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="font-extrabold text-sm mb-3">🏠 بازارچه محلی پیرانشهر</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              بازارچه آنلاین آگهی‌های محلی پیرانشهر. فروش، معاوضه، استخدام، حمل و نقل و خدمات.
            </p>
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-[11px] text-gray-500 mb-1">💳 شماره کارت:</p>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-sm font-bold" dir="ltr">{cardNumber}</span>
                <button onClick={handleCopy} className="text-blue-400 hover:text-blue-300 p-0.5">
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">عبدالباسط رحمت پور | بانک صادرات</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">دسترسی سریع</h4>
            <div className="grid grid-cols-2 gap-1">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="text-xs text-gray-400 hover:text-white py-1 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">تماس و ثبت آگهی</h4>
            <a
              href="https://t.me/Superapoiranshar_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-500 transition-colors mb-3"
            >
              <Send size={14} />
              ربات تلگرام
            </a>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              سلب مسئولیت: این سایت صرفاً جهت اطلاع‌رسانی است و مسئولیت معاملات بر عهده طرفین می‌باشد.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-[10px] text-gray-600">
          © ۱۴۰۵ بازارچه محلی پیرانشهر
        </div>
      </div>
    </footer>
  )
}
