import { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'

const FREE_CATEGORIES = ['رایگان', 'گمشده', 'پیداشده']

export default function PaymentModal({ ad, isOpen, onClose }) {
  const [rrn, setRrn] = useState('')
  const [copied, setCopied] = useState(false)
  const [step, setStep] = useState('form')

  if (!isOpen || !ad) return null

  const isFree = FREE_CATEGORIES.includes(ad.category) || FREE_CATEGORIES.includes(ad.type)
  const cardNumber = '6037701616939556'
  const handleCopy = () => { navigator.clipboard.writeText(cardNumber).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm relative animate-fade-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-[14px] text-gray-900">{isFree ? 'شماره تماس' : 'پرداخت'}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
        </div>

        <div className="p-5">
          {isFree ? (
            <div className="text-center">
              <p className="text-[13px] text-gray-500 mb-4">{ad.title}</p>
              <a href={`tel:${ad.phone}`} className="inline-block font-mono text-xl font-bold text-gray-900 mb-4" dir="ltr">{ad.phone}</a>
              <button onClick={onClose} className="block w-full py-2.5 rounded-xl border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">بستن</button>
            </div>
          ) : step === 'form' ? (
            <>
              <p className="text-[13px] text-gray-500 mb-4">{ad.title}</p>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-gray-400">شماره کارت</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[13px] font-medium text-gray-700" dir="ltr">{cardNumber}</span>
                    <button onClick={handleCopy} className="text-gray-400 hover:text-gray-600">
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-gray-400">صاحب کارت</span>
                  <span className="text-[12px] font-medium text-gray-700">عبدالباسط رحمت پور</span>
                </div>
              </div>
              <div className="mb-4">
                <input type="text" value={rrn} onChange={e => setRrn(e.target.value)}
                  placeholder="شماره پیگیر ۱۲ رقمی" dir="ltr" className="input-field" />
              </div>
              <button onClick={() => { if (rrn.length >= 6) setStep('success') }}
                className="w-full btn-primary py-3 text-[13px] disabled:opacity-40" disabled={rrn.length < 6}>
                تأیید پرداخت
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-3xl mb-3">✓</div>
              <p className="font-semibold text-gray-900 mb-1">پرداخت ثبت شد</p>
              <p className="text-[13px] text-gray-400 mb-1">شماره تماس:</p>
              <p className="font-mono text-lg font-bold text-gray-900 mb-4" dir="ltr">{ad.phone}</p>
              <button onClick={() => { setStep('form'); onClose() }} className="w-full py-2.5 rounded-xl border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">بستن</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
