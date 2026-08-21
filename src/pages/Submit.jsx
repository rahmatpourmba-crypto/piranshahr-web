import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Check, Send } from 'lucide-react'

const categories = [
  { value: 'فروش', label: 'فروش' }, { value: 'املاک', label: 'املاک' },
  { value: 'خودرو', label: 'خودرو' }, { value: 'خدمات', label: 'خدمات' },
  { value: 'معاوضه غذا', label: 'معاوضه غذا' }, { value: 'معاوضه کالا', label: 'معاوضه کالا' },
  { value: 'رایگان', label: 'رایگان' }, { value: 'استخدام', label: 'استخدام' },
  { value: 'گمشده', label: 'گمشده' }, { value: 'پیداشده', label: 'پیداشده' },
  { value: 'نوبت خالی', label: 'نوبت خالی' },
]

const typeByCategory = {
  'فروش': ['فروش'], 'املاک': ['فروش ملک', 'اجاره'], 'خودرو': ['فروش خودرو'],
  'خدمات': ['خدمات فنی', 'خدمات خودرو', 'خدمات ساختمانی'],
  'معاوضه غذا': ['معاوضه غذا'], 'معاوضه کالا': ['معاوضه'],
  'رایگان': ['رایگان'], 'استخدام': ['استخدام', 'درخواست نیرو'],
  'گمشده': ['گمشده'], 'پیداشده': ['پیداشده'], 'نوبت خالی': ['نوبت خالی']
}

const serviceTypes = ['تعمیرکاری', 'سیم‌کشی', 'صافکاری', 'لوله‌کشی', 'نقاشی', 'کاشی‌کاری', 'نجاری']
const cities = ['پیرانشهر', 'مهاباد', 'نقده', 'اشنویه', 'سردشت', 'ارومیه', 'تهران', 'سایر']

const premiums = [
  { value: '', label: 'رایگان', desc: 'آگهی عادی', price: 0 },
  { value: 'ویژه', label: 'آگهی ویژه', desc: 'اولویت بالاتر در لیست', price: 5000 },
  { value: 'بالای صفحه', label: 'بالای صفحه', desc: 'همیشه بالای لیست', price: 5000 },
  { value: 'فوری', label: 'آگهی فوری', desc: 'در بخش فوری صفحه اصلی', price: 10000 },
]

export default function Submit() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ category: '', type: '', subType: '', title: '', description: '', price: '', city: 'پیرانشهر', name: '', phone: '', wants: '', hasItem: '', premium: '' })
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  if (submitted) return (
    <div className="container max-w-md py-24 text-center">
      <div className="text-3xl mb-4">✓</div>
      <h1 className="font-bold text-[18px] text-gray-900 mb-2">آگهی ثبت شد</h1>
      <p className="text-[13px] text-gray-400 mb-6">{form.title}</p>
      <div className="flex gap-3 justify-center">
        <Link to="/" className="px-5 py-2.5 rounded-xl border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">خانه</Link>
        <Link to="/ads" className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-[13px] font-semibold hover:bg-gray-800 transition-colors">مشاهده آگهی‌ها</Link>
      </div>
    </div>
  )

  const isBarter = form.category === 'معاوضه کالا' || form.category === 'معاوضه غذا'

  return (
    <div className="container max-w-md py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/" className="text-gray-400 hover:text-gray-700 p-1"><ChevronRight size={18} /></Link>
        <h1 className="font-bold text-[18px] text-gray-900">ثبت آگهی</h1>
      </div>

      <div className="flex items-center gap-2 mb-8">
        {[0,1,2,3].map(i => (
          <div key={i} className="flex items-center flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold ${
              i < step ? 'bg-gray-900 text-white' : i === step ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'
            }`}>{i < step ? '✓' : i + 1}</div>
            {i < 3 && <div className={`flex-1 h-px mx-2 ${i < step ? 'bg-gray-900' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-2">
          <p className="text-[12px] text-gray-400 mb-3">دسته‌بندی</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(c => (
              <button key={c.value} onClick={() => { update('category', c.value); update('type', typeByCategory[c.value]?.[0] || ''); update('subType', '') }}
                className={`p-3 rounded-xl text-[13px] font-medium border transition-colors text-right ${
                  form.category === c.value ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}>{c.label}</button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          {form.category === 'خدمات' && (
            <div className="flex flex-wrap gap-1.5">
              {serviceTypes.map(t => (
                <button key={t} onClick={() => update('subType', t)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors ${
                    form.subType === t ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'
                  }`}>{t}</button>
              ))}
            </div>
          )}
          <input type="text" placeholder="عنوان آگهی" value={form.title} onChange={e => update('title', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-gray-700 outline-none focus:border-gray-400 transition-colors" />
          <textarea placeholder="توضیحات" value={form.description} onChange={e => update('description', e.target.value)} rows={3}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-gray-700 outline-none focus:border-gray-400 transition-colors resize-none" />
          {isBarter && (
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="میخواهم معاوضه کنم با..." value={form.wants} onChange={e => update('wants', e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-gray-700 outline-none focus:border-gray-400 transition-colors" />
              <input type="text" placeholder="چه چیزی دارم" value={form.hasItem} onChange={e => update('hasItem', e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-gray-700 outline-none focus:border-gray-400 transition-colors" />
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="قیمت (تومان)" value={form.price} onChange={e => update('price', e.target.value)} disabled={isBarter} dir="ltr"
              className={`bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-gray-700 outline-none focus:border-gray-400 transition-colors ${isBarter ? 'opacity-40' : ''}`} />
            <select value={form.city} onChange={e => update('city', e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-gray-700 outline-none focus:border-gray-400 transition-colors">
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <p className="text-[12px] text-gray-400 mb-2">آگهی ویژه (اختیاری)</p>
          {premiums.map(p => (
            <button key={p.value} onClick={() => update('premium', p.value)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors text-right ${
                form.premium === p.value ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}>
              <div>
                <span className="text-[13px] font-semibold">{p.label}</span>
                <span className="text-[12px] mr-2 opacity-60">{p.desc}</span>
              </div>
              <span className="text-[12px] font-medium">{p.price > 0 ? `${p.price.toLocaleString('fa-IR')} تومان` : 'رایگان'}</span>
            </button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <input type="text" placeholder="نام" value={form.name} onChange={e => update('name', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-gray-700 outline-none focus:border-gray-400 transition-colors" />
          <input type="tel" placeholder="شماره تماس" value={form.phone} onChange={e => update('phone', e.target.value)} dir="ltr"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-gray-700 outline-none focus:border-gray-400 transition-colors" />
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 0 ? <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-[13px] text-gray-400 hover:text-gray-700 py-2"><ChevronRight size={14} /> قبلی</button> : <div />}
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} disabled={(step === 0 && !form.category) || (step === 1 && !form.title)}
            className="flex items-center gap-1 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">بعدی <ChevronLeft size={14} /></button>
        ) : (
          <button onClick={() => setSubmitted(true)} className="flex items-center gap-1 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-800 transition-colors"><Send size={13} /> ثبت</button>
        )}
      </div>
    </div>
  )
}
