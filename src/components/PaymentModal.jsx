import { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'

export default function PaymentModal({ ad, isOpen, onClose }) {
  const [rrn, setRrn] = useState('')
  const [amount, setAmount] = useState('15000')
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen || !ad) return null

  const cardNumber = '6037701616939556'

  const handleCopy = () => {
    navigator.clipboard.writeText(cardNumber).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <h3 className="text-lg font-bold text-gray-800 mb-1">پرداخت کارت به کارت</h3>
            <p className="text-sm text-gray-500 mb-4">{ad.title}</p>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">شماره کارت:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-gray-800" dir="ltr">{cardNumber}</span>
                  <button onClick={handleCopy} className="text-blue-600 hover:text-blue-800">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">نام صاحب کارت:</span>
                <span className="text-sm font-medium">عبدالباسط رحمت پور</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">بانک:</span>
                <span className="text-sm font-medium">صادرات</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">مبلغ (تومان)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">شماره پیگیر (RRN)</label>
                <input
                  type="text"
                  value={rrn}
                  onChange={(e) => setRrn(e.target.value)}
                  placeholder="شماره ۱۲ رقمی پیگیر"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                ✅ تأیید پرداخت
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-lg font-bold text-green-700 mb-2">پرداخت ثبت شد!</h3>
            <p className="text-sm text-gray-500 mb-4">شماره پیگیر شما: {rrn}</p>
            <p className="text-xs text-gray-400 mb-4">
              شماره تماس فروشنده: <span className="font-bold text-gray-700" dir="ltr">{ad.phone}</span>
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose() }}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
            >
              بستن
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
