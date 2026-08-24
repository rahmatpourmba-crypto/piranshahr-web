import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Send } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { submitAd } from '../lib/ads'
import { CATEGORIES, PROVINCES } from '../data/provinces'

const cities = PROVINCES['آذربایجان غربی'] || []

export default function Submit() {
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', category: 'فروش', description: '', price: '',
    province: 'آذربایجان غربی', city: 'پیرانشهر',
    phone: user?.phoneNumber || '',
  })
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const provinceCities = PROVINCES[form.province] || []

  if (submitted) return (
    <div className="container max-w-md py-24 text-center">
      <div className="text-3xl mb-4">✓</div>
      <h1 className="font-bold text-[18px] text-gray-900 mb-2">آگهی ثبت شد</h1>
      <p className="text-[13px] text-gray-400 mb-6">{form.title}</p>
      <div className="flex gap-3 justify-center">
        <Link to="/" className="px-5 py-2.5 rounded-xl border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">خانه</Link>
        <Link to="/ads" className="px-5 py-2.5 rounded-xl btn-primary text-[13px]">مشاهده آگهی‌ها</Link>
      </div>
    </div>
  )

  return (
    <div className="container max-w-md py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/" className="text-gray-400 hover:text-gray-700 p-1"><ChevronRight size={18} /></Link>
        <h1 className="font-bold text-[18px] text-gray-900">ثبت آگهی رایگان</h1>
      </div>

      {!user && (
        <div className="bg-[#FDF2F3] border border-[#F5E6E8] rounded-xl p-4 mb-6 text-center">
          <p className="text-[13px] text-[#A13D4C] font-medium">برای ثبت آگهی ابتدا وارد شوید</p>
          <Link to="/" className="text-[12px] text-gray-500 mt-1 inline-block hover:text-[#A13D4C]">ورود / ثبت‌نام</Link>
        </div>
      )}

      <div className="flex items-center gap-2 mb-8">
        {[0,1,2].map(i => (
          <div key={i} className="flex items-center flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold ${
              i <= step ? 'bg-[#A13D4C] text-white' : 'bg-gray-100 text-gray-400'
            }`}>{i < step ? '✓' : i + 1}</div>
            {i < 2 && <div className={`flex-1 h-px mx-2 ${i < step ? 'bg-[#A13D4C]' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-3">
          <div className="form-group">
            <label className="text-[12px] font-semibold text-gray-700 mb-1 block">عنوان آگهی *</label>
            <input type="text" value={form.title} onChange={e => update('title', e.target.value)}
              placeholder="مثلاً: مبل راحتی سه نفره" className="input-field" />
          </div>
          <div className="form-group">
            <label className="text-[12px] font-semibold text-gray-700 mb-1 block">دسته‌بندی *</label>
            <select value={form.category} onChange={e => update('category', e.target.value)} className="input-field appearance-none">
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.icon} {c.label}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="form-group">
              <label className="text-[12px] font-semibold text-gray-700 mb-1 block">قیمت (تومان)</label>
              <input type="number" value={form.price} onChange={e => update('price', e.target.value)}
                placeholder="توافقی" dir="ltr" className="input-field text-left" />
            </div>
            <div className="form-group">
              <label className="text-[12px] font-semibold text-gray-700 mb-1 block">شماره تماس *</label>
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                placeholder="0912xxxxxxx" dir="ltr" className="input-field text-left" />
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <div className="form-group">
            <label className="text-[12px] font-semibold text-gray-700 mb-1 block">توضیحات *</label>
            <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={4}
              placeholder="توضیحات کامل آگهی..." className="input-field resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="form-group">
              <label className="text-[12px] font-semibold text-gray-700 mb-1 block">استان *</label>
              <select value={form.province} onChange={e => { update('province', e.target.value); update('city', '') }}
                className="input-field appearance-none">
                {Object.keys(PROVINCES).sort((a,b) => a.localeCompare(b, 'fa')).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="text-[12px] font-semibold text-gray-700 mb-1 block">شهر *</label>
              <select value={form.city} onChange={e => update('city', e.target.value)} className="input-field appearance-none">
                {provinceCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-100">
          <h3 className="font-semibold text-[14px] text-gray-900 mb-3">تأیید آگهی</h3>
          <div className="flex justify-between text-[13px]"><span className="text-gray-400">عنوان:</span><span className="font-bold text-gray-700">{form.title}</span></div>
          <div className="flex justify-between text-[13px]"><span className="text-gray-400">دسته:</span><span className="font-bold text-gray-700">{form.category}</span></div>
          <div className="flex justify-between text-[13px]"><span className="text-gray-400">قیمت:</span><span className="font-bold text-gray-700">{form.price || 'توافقی'}</span></div>
          <div className="flex justify-between text-[13px]"><span className="text-gray-400">موقعیت:</span><span className="font-bold text-gray-700">{form.city}، {form.province}</span></div>
          <div className="flex justify-between text-[13px]"><span className="text-gray-400">تلفن:</span><span className="font-bold text-gray-700" dir="ltr">{form.phone}</span></div>
          <div className="mt-3 text-[13px] text-gray-500 border-t border-gray-200 pt-3">{form.description}</div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 0 ? <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-[13px] text-gray-400 hover:text-gray-700 py-2"><ChevronRight size={14} /> قبلی</button> : <div />}
        {step < 2 ? (
          <button onClick={() => setStep(step + 1)} disabled={(step === 0 && (!form.title || !form.phone))}
            className="flex items-center gap-1 btn-primary px-5 py-2.5 text-[13px] disabled:opacity-30 disabled:cursor-not-allowed">بعدی <ChevronLeft size={14} /></button>
        ) : (
          <button onClick={async () => {
            if (!user) return
            setLoading(true)
            try {
              await submitAd({
                title: form.title, category: form.category, description: form.description,
                price: form.price, city: form.city, province: form.province,
                phone: form.phone, userId: user.uid, userName: user.displayName || user.email,
              })
              setSubmitted(true)
            } catch (e) { alert('خطا در ثبت آگهی.') }
            setLoading(false)
          }} disabled={loading || !user} className="flex items-center gap-1 btn-primary px-5 py-2.5 text-[13px] disabled:opacity-50">
            {loading ? '...' : <><Send size={13} /> ثبت آگهی</>}
          </button>
        )}
      </div>
    </div>
  )
}
