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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between rounded-t-2xl z-10">
          <h3 className="font-bold text-sm text-gray-900">پرداخت کارت به کارت</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          {!submitted ? (
            <>
              <div className="bg-gray-50 rounded-xl p-3 mb-4">
                <p className="text-xs text-gray-500 mb-2">{ad.title}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">شماره کارت:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-sm font-bold text-gray-800" dir="ltr">{cardNumber}</span>
                      <button onClick={handleCopy} className="text-blue-600 hover:text-blue-800 p-0.5">
                        {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">صاحب کارت:</span>
                    <span className="text-xs font-bold">عبدالباسط رحمت پور</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">بانک:</span>
                    <span className="text-xs font-bold">صادرات</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">مبلغ (تومان)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">شماره پیگیر (RRN)</label>
                  <input
                    type="text"
                    value={rrn}
                    onChange={(e) => setRrn(e.target.value)}
                    placeholder="شماره ۱۲ رقمی پیگیر"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    dir="ltr"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-green-700 active:scale-[0.98] transition-all"
                >
                  ✅ تأیید پرداخت
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-green-700 mb-1 text-sm">پرداخت ثبت شد!</h3>
              <p className="text-xs text-gray-500 mb-1">پیگیر: {rrn}</p>
              <p className="text-xs text-gray-400 mb-4">
                شماره تماس: <span className="font-bold text-gray-700" dir="ltr">{ad.phone}</span>
              </p>
              <button
                onClick={() => { setSubmitted(false); onClose() }}
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                بستن
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
