import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'

const driverSteps = ['اطلاعات شخصی', 'خودرو', 'مسیرها', 'تأیید']
const cargoSteps = ['اطلاعات شخصی', 'وسیله', 'مسیرها', 'تأیید']

const areas = [
  'میدان امام', 'خیابان طالقانی', 'بازار مرکزی', 'محله نوبهار',
  'محله قلعه', 'خیابان آزادی', 'میدان شهدا', 'پارک لاله',
  'جاده مهاباد', 'جاده ارومیه', 'جاده سردشت', 'جاده بانه',
]

export default function RegisterForm({ type }) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', vehicleType: '', plate: '', serviceType: '',
    cargoVehicle: '', capacity: '', cargoType: '', routes: [],
  })

  const steps = type === 'driver' ? driverSteps : cargoSteps
  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }))
  const toggleRoute = (a) => setForm((p) => ({ ...p, routes: p.routes.includes(a) ? p.routes.filter((r) => r !== a) : [...p.routes, a] }))
  const handleSubmit = () => setSubmitted(true)

  if (submitted) {
    return (
      <div className="glass rounded-xl p-8 text-center glow-card">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-bold text-sm text-emerald-400 mb-1">ثبت‌نام شما ثبت شد!</h3>
        <p className="text-xs text-gray-500">اطلاعات ذخیره شد و به‌زودی تماس گرفته میشود.</p>
      </div>
    )
  }

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
  const selectClass = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition appearance-none"

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-1 mb-4">
        {steps.map((_, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
              i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' : 'bg-white/5 text-gray-600'
            }`}>{i < step ? '✓' : i + 1}</div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-emerald-500' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-gray-600 mb-2">{step + 1} از {steps.length} · {steps[step]}</p>

      {step === 0 && (
        <div className="space-y-2">
          <input type="text" placeholder="نام و نام خانوادگی" value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass} />
          <input type="tel" placeholder="شماره تماس" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} dir="ltr" />
        </div>
      )}

      {step === 1 && type === 'driver' && (
        <div className="space-y-2">
          <select value={form.vehicleType} onChange={(e) => update('vehicleType', e.target.value)} className={selectClass}>
            <option value="">نوع خودرو</option>
            <option value="پراید">پراید</option><option value="پژو">پژو</option>
            <option value="ون">ون</option><option value="کامیون">کامیون</option>
          </select>
          <input type="text" placeholder="شماره پلاک" value={form.plate} onChange={(e) => update('plate', e.target.value)} className={inputClass} />
          <select value={form.serviceType} onChange={(e) => update('serviceType', e.target.value)} className={selectClass}>
            <option value="">نوع خدمت</option>
            <option value="taxi">تاکسی</option><option value="cargo">حمل بار</option><option value="both">هر دو</option>
          </select>
        </div>
      )}

      {step === 1 && type === 'cargo' && (
        <div className="space-y-2">
          <select value={form.cargoVehicle} onChange={(e) => update('cargoVehicle', e.target.value)} className={selectClass}>
            <option value="">نوع وسیله</option>
            <option value="وانت">وانت</option><option value="نیسان">نیسان</option>
            <option value="کامیون">کامیون</option><option value="تریلی">تریلی</option>
          </select>
          <input type="text" placeholder="ظرفیت حمل" value={form.capacity} onChange={(e) => update('capacity', e.target.value)} className={inputClass} />
          <select value={form.cargoType} onChange={(e) => update('cargoType', e.target.value)} className={selectClass}>
            <option value="">نوع بار</option>
            <option value="سبک">سبک</option><option value="سنگین">سنگین</option><option value="یخچالی">یخچالی</option>
          </select>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-2 gap-1.5">
          {areas.map((area) => (
            <button key={area} type="button" onClick={() => toggleRoute(area)}
              className={`rounded-lg py-2 px-2 text-xs font-medium border transition-all ${
                form.routes.includes(area) ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/15'
              }`}>
              {form.routes.includes(area) ? '✓ ' : ''}{area}
            </button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="glass rounded-xl p-4 text-xs space-y-1.5">
          <div className="flex justify-between"><span className="text-gray-500">نام:</span><span className="font-medium text-gray-300">{form.name}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">تلفن:</span><span className="font-medium text-gray-300" dir="ltr">{form.phone}</span></div>
          {type === 'driver' ? (
            <>
              <div className="flex justify-between"><span className="text-gray-500">خودرو:</span><span className="font-medium text-gray-300">{form.vehicleType}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">پلاک:</span><span className="font-medium text-gray-300">{form.plate}</span></div>
            </>
          ) : (
            <>
              <div className="flex justify-between"><span className="text-gray-500">وسیله:</span><span className="font-medium text-gray-300">{form.cargoVehicle}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">ظرفیت:</span><span className="font-medium text-gray-300">{form.capacity}</span></div>
            </>
          )}
          <div className="flex justify-between"><span className="text-gray-500">مسیرها:</span><span className="font-medium text-gray-300">{form.routes.join('، ')}</span></div>
        </div>
      )}

      <div className="flex justify-between mt-5">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-all">
            <ChevronRight size={14} /> قبلی
          </button>
        ) : <div />}
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(step + 1)} className="btn-primary text-xs px-4 py-2 flex items-center gap-1">
            بعدی <ChevronLeft size={14} />
          </button>
        ) : (
          <button onClick={handleSubmit} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-1">
            <Check size={14} /> ثبت
          </button>
        )}
      </div>
    </div>
  )
}
