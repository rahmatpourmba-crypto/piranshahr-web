import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Check, FileText, Tag, Phone, Send } from 'lucide-react'

const categories = [
  { value: 'فروش', label: 'فروش', icon: '💰' },
  { value: 'معاوضه غذا', label: 'معاوضه غذا', icon: '🍲' },
  { value: 'رایگان', label: 'رایگان', icon: '🎁' },
  { value: 'استخدام', label: 'استخدام', icon: '💼' },
  { value: 'گمشده', label: 'گمشده', icon: '🔴' },
  { value: 'پیداشده', label: 'پیداشده', icon: '🟢' },
  { value: 'نوبت خالی', label: 'نوبت خالی', icon: '🗓' },
]
const typeByCategory = {
  'فروش': ['فروش'], 'معاوضه غذا': ['معاوضه'], 'رایگان': ['رایگان'],
  'استخدام': ['استخدام', 'درخواست نیرو'], 'گمشده': ['گمشده'], 'پیداشده': ['پیداشده'], 'نوبت خالی': ['نوبت خالی'],
}
const cities = ['پیرانشهر', 'مهاباد', 'نقده', 'اشنویه', 'سردشت', 'ارومیه', 'تهران', 'سایر']

export default function Submit() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ category: '', type: '', title: '', description: '', price: '', city: 'پیرانشهر', name: '', phone: '' })

  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }))
  const selectedTypes = typeByCategory[form.category] || []

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center noise-bg">
        <div className="text-5xl mb-4 animate-float">✅</div>
        <h1 className="font-extrabold text-xl text-white mb-2">آگهی شما ثبت شد!</h1>
        <p className="text-sm text-gray-500 mb-6">عنوان: {form.title}</p>
        <div className="flex gap-2 justify-center">
          <Link to="/" className="btn-ghost text-xs px-5 py-2.5">خانه</Link>
          <Link to="/ads" className="btn-primary text-xs px-5 py-2.5">مشاهده آگهی‌ها</Link>
        </div>
      </div>
    )
  }

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
  const selectClass = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition appearance-none"

  return (
    <div className="max-w-lg mx-auto px-4 py-6 noise-bg">
      <div className="flex items-center gap-2 mb-5">
        <Link to="/" className="text-gray-600 hover:text-white p-1 transition-colors"><ChevronRight size={18} /></Link>
        <h1 className="font-extrabold text-lg text-white">ثبت آگهی رایگان</h1>
      </div>

      <div className="flex items-center gap-1 mb-5">
        {[Tag, FileText, Phone, Check].map((Icon, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
              i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' : 'bg-white/5 text-gray-600'
            }`}>{i < step ? '✓' : <Icon size={12} />}</div>
            {i < 3 && <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-emerald-500' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-2 animate-fade-in-up">
          <p className="text-xs text-gray-500 mb-2">دسته‌بندی را انتخاب کنید:</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button key={cat.value} onClick={() => { update('category', cat.value); update('type', typeByCategory[cat.value]?.[0] || '') }}
                className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium border transition-all ${
                  form.category === cat.value ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/15'
                }`}>
                <span className="text-lg">{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3 animate-fade-in-up">
          <input type="text" placeholder="عنوان آگهی" value={form.title} onChange={(e) => update('title', e.target.value)} className={inputClass} />
          <textarea placeholder="توضیحات..." value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} className={`${inputClass} resize-none`} />
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="قیمت (تومان)" value={form.price} onChange={(e) => update('price', e.target.value)} dir="ltr" className={`${inputClass} text-right`} />
            <select value={form.city} onChange={(e) => update('city', e.target.value)} className={selectClass}>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3 animate-fade-in-up">
          <input type="text" placeholder="نام شما" value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass} />
          <input type="tel" placeholder="شماره تماس" value={form.phone} onChange={(e) => update('phone', e.target.value)} dir="ltr" className={`${inputClass} text-right`} />
          <p className="text-[10px] text-gray-600">شماره فقط به خریدار نمایش داده میشود.</p>
        </div>
      )}

      {step === 3 && (
        <div className="glass rounded-xl p-4 text-xs space-y-2 animate-fade-in-up">
          <div className="flex justify-between"><span className="text-gray-500">دسته‌بندی:</span><span className="font-medium text-gray-300">{form.category}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">عنوان:</span><span className="font-medium text-gray-300">{form.title}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">قیمت:</span><span className="font-medium text-gray-300">{form.price || '---'}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">شهر:</span><span className="font-medium text-gray-300">{form.city}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">نام:</span><span className="font-medium text-gray-300">{form.name}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">تلفن:</span><span className="font-medium text-gray-300" dir="ltr">{form.phone}</span></div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 px-3 py-2 text-xs text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-all">
            <ChevronRight size={14} /> قبلی
          </button>
        ) : <div />}
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} disabled={(step === 0 && !form.category) || (step === 1 && !form.title)}
            className="btn-primary text-xs px-5 py-2.5 flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed">
            بعدی <ChevronLeft size={14} />
          </button>
        ) : (
          <button onClick={() => setSubmitted(true)} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-1">
            <Send size={13} /> ثبت آگهی
          </button>
        )}
      </div>
    </div>
  )
}
