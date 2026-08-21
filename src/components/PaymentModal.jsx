import { useState } from 'react'
import { X, Copy, Check, CreditCard, Loader2 } from 'lucide-react'

const PAYIR_API_KEY = '' // فردا توکن را اینجا قرار دهید

export default function PaymentModal({ ad, isOpen, onClose }) {
  const [rrn, setRrn] = useState('')
  const [amount, setAmount] = useState('15000')
  const [copied, setCopied] = useState(false)
  const [step, setStep] = useState('form') // form | loading | success | payir
  const [payirToken, setPayirToken] = useState('')

  if (!isOpen || !ad) return null

  const cardNumber = '6037701616939556'

  const handleCopy = () => {
    navigator.clipboard.writeText(cardNumber).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePayIr = async () => {
    if (!PAYIR_API_KEY) {
      alert('درگاه پرداخت هنوز فعال نشده است. لطفاً کارت به کارت کنید.')
      return
    }
    setStep('loading')
    try {
      const res = await fetch('https://pay.ir/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api: PAYIR_API_KEY,
          amount: parseInt(amount),
          redirect: window.location.origin + '/piranshahr-web/payir-callback',
          phone: '',
        }),
      })
      const data = await res.json()
      if (data.status === 1 && data.token) {
        setPayirToken(data.token)
        setStep('payir')
      } else {
        alert('خطا در اتصال به درگاه پرداخت')
        setStep('form')
      }
    } catch {
      alert('خطا در اتصال به درگاه پرداخت')
      setStep('form')
    }
  }

  const handleManualSubmit = (e) => {
    e.preventDefault()
    setStep('success')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="glass rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto relative animate-fade-in-up" onClick={(e) => e.stopPropagation()}>

        <div className="sticky top-0 glass border-b border-white/5 px-5 py-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <CreditCard size={16} className="text-white" />
            </div>
            <h3 className="font-bold text-sm text-white">پرداخت</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {step === 'form' && (
            <>
              <div className="glass rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-500 mb-3">{ad.title}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">شماره کارت:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-gray-300" dir="ltr">{cardNumber}</span>
                      <button onClick={handleCopy} className="text-indigo-400 hover:text-indigo-300 p-0.5">
                        {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">صاحب کارت:</span>
                    <span className="text-[11px] font-bold text-gray-300">عبدالباسط رحمت پور</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">بانک:</span>
                    <span className="text-[11px] font-bold text-gray-300">صادرات</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">مبلغ (تومان)</label>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition" />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <button onClick={handlePayIr}
                  className="w-full btn-primary text-sm py-3 flex items-center justify-center gap-2">
                  <CreditCard size={16} />
                  پرداخت آنلاین با Pay.ir
                </button>
                <p className="text-center text-[10px] text-gray-600">— یا کارت به کارت —</p>
              </div>

              <form onSubmit={handleManualSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">شماره پیگیر (RRN)</label>
                  <input type="text" value={rrn} onChange={(e) => setRrn(e.target.value)}
                    placeholder="شماره ۱۲ رقمی پیگیر" dir="ltr"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition" required />
                </div>
                <button type="submit" className="w-full bg-emerald-600/80 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all">
                  ✅ تأیید کارت به کارت
                </button>
              </form>
            </>
          )}

          {step === 'loading' && (
            <div className="text-center py-10">
              <Loader2 size={32} className="text-indigo-400 animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-400">در حال اتصال به درگاه پرداخت...</p>
            </div>
          )}

          {step === 'payir' && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4 animate-float">💳</div>
              <h3 className="font-bold text-sm text-white mb-2">انتقال به درگاه پرداخت</h3>
              <p className="text-xs text-gray-500 mb-5">مبلغ: {parseInt(amount).toLocaleString('fa-IR')} تومان</p>
              <a href={`https://pay.ir/pg/${payirToken}`}
                className="inline-flex items-center gap-2 btn-primary text-sm px-8 py-3">
                رفتن به درگاه پرداخت
              </a>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-bold text-sm text-emerald-400 mb-1">پرداخت ثبت شد!</h3>
              <p className="text-xs text-gray-500 mb-1">پیگیر: {rrn}</p>
              <p className="text-xs text-gray-400 mb-5">
                شماره تماس: <span className="font-bold text-white" dir="ltr">{ad.phone}</span>
              </p>
              <button onClick={() => { setStep('form'); onClose() }}
                className="btn-ghost text-xs px-6 py-2">
                بستن
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
