import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Check, FileText, Tag, Phone, Send } from 'lucide-react'

const categories = [
  { value: 'فروش', label: 'فروش', icon: '💰' },
  { value: 'املاک', label: 'املاک', icon: '🏠' },
  { value: 'خودرو', label: 'خودرو', icon: '🚗' },
  { value: 'خدمات', label: 'خدمات', icon: '🔧' },
  { value: 'معاوضه غذا', label: 'معاوضه غذا', icon: '🍲' },
  { value: 'معاوضه کالا', label: 'معاوضه کالا', icon: '🔄' },
  { value: 'رایگان', label: 'رایگان', icon: '🎁' },
  { value: 'استخدام', label: 'استخدام', icon: '💼' },
  { value: 'گمشده', label: 'گمشده', icon: '🔴' },
  { value: 'پیداشده', label: 'پیداشده', icon: '🟢' },
  { value: 'نوبت خالی', label: 'نوبت خالی', icon: '🗓' },
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

export default function Submit() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ category: '', type: '', subType: '', title: '', description: '', price: '', city: 'پیرانشهر', name: '', phone: '', wants: '', hasItem: '' })
  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }))

  if (submitted) return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4 animate-float">✅</div>
      <h1 className="font-extrabold text-xl text-gray-900 mb-2">آگهی ثبت شد!</h1>
      <p className="text-sm text-gray-500 mb-6">عنوان: {form.title}</p>
      <div className="flex gap-2 justify-center">
        <Link to="/" className="btn-outline text-xs px-5 py-2.5">خانه</Link>
        <Link to="/ads" className="btn-primary text-xs px-5 py-2.5">مشاهده آگهی‌ها</Link>
      </div>
    </div>
  )

  const icons = [Tag, FileText, Phone, Check]
  const isBarter = form.category === 'معاوضه کالا' || form.category === 'معاوضه غذا'

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-5">
        <Link to="/" className="text-gray-400 hover:text-gray-700 p-1 transition-colors"><ChevronRight size={18} /></Link>
        <h1 className="font-extrabold text-lg text-gray-900">ثبت آگهی رایگان</h1>
      </div>

      <div className="flex items-center gap-1 mb-5">
        {icons.map((Icon, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
              i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-blue-500 text-white shadow-md shadow-blue-200' : 'bg-gray-100 text-gray-400'
            }`}>{i < step ? '✓' : <Icon size={12} />}</div>
            {i < 3 && <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-2 animate-fade-up">
          <p className="text-xs text-gray-500 mb-2 font-medium">دسته‌بندی:</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <button key={c.value} onClick={() => { update('category', c.value); update('type', typeByCategory[c.value]?.[0] || ''); update('subType', ''); update('wants', ''); update('hasItem', '') }}
                className={`flex items-center gap-2 p-3 rounded-xl text-sm font-bold border transition-all ${
                  form.category === c.value ? 'bg-blue-50 text-blue-600 border-blue-300 shadow-sm shadow-blue-100' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}><span className="text-lg">{c.icon}</span> {c.label}</button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3 animate-fade-up">
          {form.category === 'املاک' && (
            <div className="grid grid-cols-2 gap-2">
              {typeByCategory['املاک'].map(t => (
                <button key={t} onClick={() => update('type', t)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${form.type === t ? 'bg-emerald-50 text-emerald-600 border-emerald-300' : 'bg-white text-gray-500 border-gray-200'}`}>{t}</button>
              ))}
            </div>
          )}
          {form.category === 'خودرو' && (
            <div className="grid grid-cols-3 gap-2">
              {['سواری', 'باری', 'موتور'].map(t => (
                <button key={t} onClick={() => update('subType', t)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${form.subType === t ? 'bg-red-50 text-red-600 border-red-300' : 'bg-white text-gray-500 border-gray-200'}`}>{t}</button>
              ))}
            </div>
          )}
          {form.category === 'خدمات' && (
            <div className="grid grid-cols-3 gap-2">
              {serviceTypes.map(t => (
                <button key={t} onClick={() => update('subType', t)}
                  className={`p-2 rounded-xl text-[11px] font-bold border transition-all ${form.subType === t ? 'bg-purple-50 text-purple-600 border-purple-300' : 'bg-white text-gray-500 border-gray-200'}`}>{t}</button>
              ))}
            </div>
          )}
          <input type="text" placeholder="عنوان آگهی" value={form.title} onChange={(e) => update('title', e.target.value)} className="input-field" />
          <textarea placeholder="توضیحات..." value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} className="input-field resize-none" />
          {isBarter && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="میخواهم معاوضه کنم با..." value={form.wants} onChange={(e) => update('wants', e.target.value)} className="input-field" />
                <input type="text" placeholder="چه چیزی دارم" value={form.hasItem} onChange={(e) => update('hasItem', e.target.value)} className="input-field" />
              </div>
            </>
          )}
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder={isBarter ? '' : 'قیمت (تومان)'} value={form.price} onChange={(e) => update('price', e.target.value)} disabled={isBarter} dir="ltr" className={`input-field text-right ${isBarter ? 'opacity-40' : ''}`} />
            <select value={form.city} onChange={(e) => update('city', e.target.value)} className="input-field appearance-none">
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3 animate-fade-up">
          <input type="text" placeholder="نام شما" value={form.name} onChange={(e) => update('name', e.target.value)} className="input-field" />
          <input type="tel" placeholder="شماره تماس" value={form.phone} onChange={(e) => update('phone', e.target.value)} dir="ltr" className="input-field text-right" />
          <p className="text-[10px] text-gray-400">شماره فقط به خریدار نمایش داده میشود.</p>
        </div>
      )}

      {step === 3 && (
        <div className="bg-gray-50 rounded-xl p-4 text-xs space-y-2 border border-gray-100 animate-fade-up">
          <div className="flex justify-between"><span className="text-gray-400">دسته‌بندی:</span><span className="font-bold text-gray-700">{form.category}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">عنوان:</span><span className="font-bold text-gray-700">{form.title}</span></div>
          {isBarter && form.wants && <div className="flex justify-between"><span className="text-gray-400">معاوضه با:</span><span className="font-bold text-orange-600">{form.wants}</span></div>}
          {!isBarter && <div className="flex justify-between"><span className="text-gray-400">قیمت:</span><span className="font-bold text-gray-700">{form.price || '---'}</span></div>}
          <div className="flex justify-between"><span className="text-gray-400">شهر:</span><span className="font-bold text-gray-700">{form.city}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">نام:</span><span className="font-bold text-gray-700">{form.name}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">تلفن:</span><span className="font-bold text-gray-700" dir="ltr">{form.phone}</span></div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 0 ? <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 px-3 py-2 text-xs text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-50"><ChevronRight size={14} /> قبلی</button> : <div />}
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} disabled={(step === 0 && !form.category) || (step === 1 && !form.title)}
            className="btn-primary text-xs px-5 py-2.5 flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed">بعدی <ChevronLeft size={14} /></button>
        ) : (
          <button onClick={() => setSubmitted(true)} className="bg-orange-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-orange-600 shadow-md shadow-orange-200 flex items-center gap-1"><Send size={13} /> ثبت آگهی</button>
        )}
      </div>
    </div>
  )
}
