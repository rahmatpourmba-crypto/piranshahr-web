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
    <footer className="bg-slate-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">🏠 بازارچه محلی پیرانشهر</h3>
            <p className="text-sm text-gray-400 mb-4">
              بازارچه آنلاین آگهی‌های محلی پیرانشهر. فروش، معاوضه، استخدام، حمل و نقل و خدمات.
            </p>
            <div className="bg-slate-700 rounded-xl p-3 text-sm">
              <p className="text-gray-300 mb-1">💳 شماره کارت:</p>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold" dir="ltr">{cardNumber}</span>
                <button onClick={handleCopy} className="text-blue-400 hover:text-blue-300">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-1">عبدالباسط رحمت پور | بانک صادرات</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3">دسترسی سریع</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">تماس با ما</h4>
            <a
              href="https://t.me/Superapoiranshar_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-500 transition-colors mb-3"
            >
              <Send size={16} />
              ربات تلگرام
            </a>
            <p className="text-xs text-gray-500">
              سلب مسئولیت: این سایت صرفاً جهت اطلاع‌رسانی است و مسئولیت معاملات بر عهده طرفین می‌باشد.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-4 text-center text-xs text-gray-500">
          © ۱۴۰۵ بازارچه محلی پیرانشهر. تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  )
}
