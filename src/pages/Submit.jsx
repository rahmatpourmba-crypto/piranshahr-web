import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Check, FileText, Tag, MapPin, Phone, Send } from 'lucide-react'

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
  'فروش': ['فروش'],
  'معاوضه غذا': ['معاوضه'],
  'رایگان': ['رایگان'],
  'استخدام': ['استخدام', 'درخواست نیرو'],
  'گمشده': ['گمشده'],
  'پیداشده': ['پیداشده'],
  'نوبت خالی': ['نوبت خالی'],
}

const cities = ['پیرانشهر', 'مهاباد', 'نقده', 'اشنویه', 'سردشت', 'ارومیه', 'تهران', 'سایر']

const steps = [
  { label: 'دسته‌بندی', icon: Tag },
  { label: 'جزئیات', icon: FileText },
  { label: 'تماس', icon: Phone },
  { label: 'تأیید', icon: Check },
]

export default function Submit() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    category: '',
    type: '',
    title: '',
    description: '',
    price: '',
    city: 'پیرانشهر',
    name: '',
    phone: '',
  })

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const selectedTypes = typeByCategory[form.category] || []

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="font-extrabold text-xl text-gray-900 mb-2">آگهی شما ثبت شد!</h1>
        <p className="text-sm text-gray-500 mb-1">عنوان: {form.title}</p>
        <p className="text-xs text-gray-400 mb-6">دسته‌بندی: {form.category} · {form.city}</p>
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-xs text-gray-500 text-right space-y-1">
          <p>آگهی شما پس از بررسی نمایش داده خواهد شد.</p>
          <p>برای ویرایش یا حذف آگهی با ما تماس بگیرید.</p>
        </div>
        <div className="flex gap-2 justify-center">
          <Link to="/" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
            خانه
          </Link>
          <Link to="/ads" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            مشاهده آگهی‌ها
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-5">
      <div className="flex items-center gap-2 mb-4">
        <Link to="/" className="text-gray-400 hover:text-gray-600 p-1">
          <ChevronRight size={18} />
        </Link>
        <h1 className="font-extrabold text-lg text-gray-900">ثبت آگهی رایگان</h1>
      </div>

      <div className="flex items-center gap-1 mb-5">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
              i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-emerald-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mb-3">{step + 1} از {steps.length} · {steps[step].label}</p>

      {step === 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600 mb-2">دسته‌بندی آگهی را انتخاب کنید:</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button key={cat.value} onClick={() => { update('category', cat.value); update('type', typeByCategory[cat.value]?.[0] || '') }}
                className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium border transition-all ${
                  form.category === cat.value
                    ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}>
                <span className="text-lg">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {selectedTypes.length > 1 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-600 mb-2">نوع آگهی:</p>
              <div className="flex gap-2">
                {selectedTypes.map((t) => (
                  <button key={t} onClick={() => update('type', t)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                      form.type === t ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-white text-gray-500 border-gray-200'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <input type="text" placeholder="عنوان آگهی (مثلاً: گوشی سامسونگ A54)" value={form.title}
            onChange={(e) => update('title', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500" />
          <textarea placeholder="توضیحات آگهی..." value={form.description}
            onChange={(e) => update('description', e.target.value)} rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 resize-none" />
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="قیمت (تومان)" value={form.price}
              onChange={(e) => update('price', e.target.value)} dir="ltr"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-right" />
            <select value={form.city} onChange={(e) => update('city', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 appearance-none">
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <input type="text" placeholder="نام شما" value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500" />
          <input type="tel" placeholder="شماره تماس" value={form.phone}
            onChange={(e) => update('phone', e.target.value)} dir="ltr"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-right" />
          <p className="text-[10px] text-gray-400">شماره تماس فقط به خریدار نمایش داده میشود.</p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-xl p-4 text-xs space-y-2 border border-gray-100">
            <div className="flex justify-between"><span className="text-gray-400">دسته‌بندی:</span><span className="font-medium">{form.category}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">نوع:</span><span className="font-medium">{form.type}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">عنوان:</span><span className="font-medium">{form.title}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">قیمت:</span><span className="font-medium">{form.price || '---'}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">شهر:</span><span className="font-medium">{form.city}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">نام:</span><span className="font-medium">{form.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">تلفن:</span><span className="font-medium" dir="ltr">{form.phone}</span></div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-xs text-blue-700 leading-relaxed">
              آگهی شما پس از بررسی منتشر میشود. اطلاعات تماس فقط به خریداران نمایش داده خواهد شد.
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)}
            className="flex items-center gap-1 px-3 py-2 text-xs text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-50">
            <ChevronRight size={14} /> قبلی
          </button>
        ) : <div />}
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(step + 1)}
            disabled={(step === 0 && !form.category) || (step === 1 && !form.title)}
            className="flex items-center gap-1 bg-blue-600 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            بعدی <ChevronLeft size={14} />
          </button>
        ) : (
          <button onClick={handleSubmit}
            className="flex items-center gap-1 bg-emerald-600 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all">
            <Send size={13} /> ثبت آگهی
          </button>
        )}
      </div>
    </div>
  )
}
