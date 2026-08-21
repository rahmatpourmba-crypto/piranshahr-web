import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Check } from 'lucide-react'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const cardNumber = '6037701616939556'
  const handleCopy = () => { navigator.clipboard.writeText(cardNumber).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <span className="font-bold text-[14px] text-gray-900 block mb-2">پیرانشهرمارکت</span>
            <p className="text-[13px] text-gray-400 leading-[2]">بازار آنلاین محلی پیرانشهر</p>
          </div>
          <div>
            <span className="font-semibold text-[12px] text-gray-900 block mb-3">دسترسی سریع</span>
            <div className="space-y-2">
              {[['/ads','آگهی‌ها'],['/submit','ثبت آگهی'],['/drivers','رانندگان'],['/cargo','حمل بار'],['/about','درباره ما']].map(([to, label]) => (
                <Link key={to} to={to} className="block text-[13px] text-gray-400 hover:text-gray-900 transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <span className="font-semibold text-[12px] text-gray-900 block mb-3">حمایت مالی</span>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[13px] font-medium text-gray-600" dir="ltr">{cardNumber}</span>
              <button onClick={handleCopy} className="text-gray-400 hover:text-gray-600 p-0.5">
                {copied ? <Check size={14} className="text-gray-600" /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-[12px] text-gray-400">عبدالباسط رحمت پور · صادرات</p>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-[12px] text-gray-400">
          © ۱۴۰۵ پیرانشهرمارکت
        </div>
      </div>
    </footer>
  )
}
