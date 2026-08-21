import { useState } from 'react'
import { X, Copy, Check, CreditCard, Loader2, Phone } from 'lucide-react'

const PAYIR_API_KEY = ''
const FREE_CATEGORIES = ['رایگان', 'گمشده', 'پیداشده']

export default function PaymentModal({ ad, isOpen, onClose }) {
  const [rrn, setRrn] = useState('')
  const [amount, setAmount] = useState('15000')
  const [copied, setCopied] = useState(false)
  const [step, setStep] = useState('form')
  const [payirToken, setPayirToken] = useState('')

  if (!isOpen || !ad) return null

  const isFree = FREE_CATEGORIES.includes(ad.category) || FREE_CATEGORIES.includes(ad.type)
  const cardNumber = '6037701616939556'
  const handleCopy = () => { navigator.clipboard.writeText(cardNumber).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const handleCopyPhone = () => { navigator.clipboard.writeText(ad.phone).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  const handlePayIr = async () => {
    if (!PAYIR_API_KEY) { alert('درگاه پرداخت هنوز فعال نشده. کارت به کارت کنید.'); return }
    setStep('loading')
    try {
      const res = await fetch('https://pay.ir/api/send', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api: PAYIR_API_KEY, amount: parseInt(amount), redirect: window.location.origin + '/piranshahr-web/payir-callback' }) })
      const data = await res.json()
      if (data.status === 1 && data.token) { setPayirToken(data.token); setStep('payir') }
      else { alert('خطا در اتصال به درگاه'); setStep('form') }
    } catch { alert('خطا در اتصال'); setStep('form') }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto relative animate-fade-up shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl z-10">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isFree ? 'bg-emerald-500' : 'bg-gradient-to-br from-blue-500 to-orange-500'}`}>
              {isFree ? <Phone size={16} className="text-white" /> : <CreditCard size={16} className="text-white" />}
            </div>
            <h3 className="font-bold text-sm text-gray-900">{isFree ? 'مشاهده شماره' : 'پرداخت'}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
        </div>

        <div className="p-5">
          {isFree ? (
            <div className="text-center py-4">
              <div className="bg-emerald-50 rounded-xl p-4 mb-4 border border-emerald-100">
                <p className="text-xs text-emerald-600 font-bold mb-1">🎁 این آگهی رایگان است</p>
                <p className="text-[10px] text-emerald-500">مشاهده شماره تماس نیاز به پرداخت ندارد</p>
              </div>
              <p className="text-sm text-gray-500 mb-3">{ad.title}</p>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-[10px] text-gray-400 mb-2">شماره تماس:</p>
                <div className="flex items-center justify-center gap-3">
                  <a href={`tel:${ad.phone}`} className="font-mono text-lg font-bold text-blue-600" dir="ltr">{ad.phone}</a>
                  <button onClick={handleCopyPhone} className="text-blue-500 hover:text-blue-700 p-1">
                    {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
              <button onClick={onClose} className="btn-outline text-xs px-6 py-2">بستن</button>
            </div>
          ) : (
            <>
              {step === 'form' && (
                <>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-3 font-medium">{ad.title}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-gray-400">شماره کارت:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gray-700" dir="ltr">{cardNumber}</span>
                          <button onClick={handleCopy} className="text-blue-500 hover:text-blue-700 p-0.5">
                            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between"><span className="text-[11px] text-gray-400">صاحب کارت:</span><span className="text-[11px] font-bold text-gray-700">عبدالباسط رحمت پور</span></div>
                      <div className="flex items-center justify-between"><span className="text-[11px] text-gray-400">بانک:</span><span className="text-[11px] font-bold text-gray-700">صادرات</span></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[11px] font-medium text-gray-500 mb-1">مبلغ (تومان)</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <button onClick={handlePayIr} className="w-full btn-primary text-sm py-3 flex items-center justify-center gap-2">
                      <CreditCard size={16} /> پرداخت آنلاین با Pay.ir
                    </button>
                    <p className="text-center text-[10px] text-gray-400 font-medium">— یا کارت به کارت —</p>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setStep('success') }} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-500 mb-1">شماره پیگیر (RRN)</label>
                      <input type="text" value={rrn} onChange={(e) => setRrn(e.target.value)} placeholder="شماره ۱۲ رقمی" dir="ltr" className="input-field text-right" required />
                    </div>
                    <button type="submit" className="w-full bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all shadow-md shadow-emerald-200">
                      ✅ تأیید کارت به کارت
                    </button>
                  </form>
                </>
              )}

              {step === 'loading' && (
                <div className="text-center py-10">
                  <Loader2 size={32} className="text-blue-500 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-500">در حال اتصال...</p>
                </div>
              )}

              {step === 'payir' && (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4 animate-float">💳</div>
                  <h3 className="font-bold text-sm text-gray-900 mb-2">انتقال به درگاه</h3>
                  <p className="text-xs text-gray-500 mb-5">مبلغ: {parseInt(amount).toLocaleString('fa-IR')} تومان</p>
                  <a href={`https://pay.ir/pg/${payirToken}`} className="inline-flex btn-primary text-sm px-8 py-3">رفتن به درگاه پرداخت</a>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-bold text-sm text-emerald-600 mb-1">پرداخت ثبت شد!</h3>
                  <p className="text-xs text-gray-500 mb-1">پیگیر: {rrn}</p>
                  <p className="text-xs text-gray-400 mb-5">شماره تماس: <span className="font-bold text-gray-800" dir="ltr">{ad.phone}</span></p>
                  <button onClick={() => { setStep('form'); onClose() }} className="btn-outline text-xs px-6 py-2">بستن</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
