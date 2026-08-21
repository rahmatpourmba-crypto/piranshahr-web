import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'

const driverSteps = ['اطلاعات شخصی', 'خودرو', 'مسیرها', 'تأیید']
const cargoSteps = ['اطلاعات شخصی', 'وسیله', 'مسیرها', 'تأیید']
const areas = ['میدان امام', 'خیابان طالقانی', 'بازار مرکزی', 'محله نوبهار', 'محله قلعه', 'خیابان آزادی', 'میدان شهدا', 'پارک لاله', 'جاده مهاباد', 'جاده ارومیه', 'جاده سردشت', 'جاده بانه']

export default function RegisterForm({ type }) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', vehicleType: '', plate: '', serviceType: '', cargoVehicle: '', capacity: '', cargoType: '', routes: [] })

  const steps = type === 'driver' ? driverSteps : cargoSteps
  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }))
  const toggleRoute = (a) => setForm((p) => ({ ...p, routes: p.routes.includes(a) ? p.routes.filter((r) => r !== a) : [...p.routes, a] }))

  if (submitted) return (
    <div className="card p-8 text-center">
      <div className="text-4xl mb-3">✅</div>
      <h3 className="font-bold text-sm text-emerald-600 mb-1">ثبت‌نام شما ثبت شد!</h3>
      <p className="text-xs text-gray-400">به‌زودی تماس گرفته میشود.</p>
    </div>
  )

  return (
    <div className="card p-5">
      <div className="flex items-center gap-1 mb-4">
        {steps.map((_, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
              i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-blue-500 text-white shadow-md shadow-blue-200' : 'bg-gray-100 text-gray-400'
            }`}>{i < step ? '✓' : i + 1}</div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 mb-2 font-medium">{step + 1} از {steps.length} · {steps[step]}</p>

      {step === 0 && (
        <div className="space-y-2">
          <input type="text" placeholder="نام و نام خانوادگی" value={form.name} onChange={(e) => update('name', e.target.value)} className="input-field" />
          <input type="tel" placeholder="شماره تماس" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input-field" dir="ltr" />
        </div>
      )}

      {step === 1 && type === 'driver' && (
        <div className="space-y-2">
          <select value={form.vehicleType} onChange={(e) => update('vehicleType', e.target.value)} className="input-field appearance-none">
            <option value="">نوع خودرو</option><option>پراید</option><option>پژو</option><option>ون</option><option>کامیون</option>
          </select>
          <input type="text" placeholder="شماره پلاک" value={form.plate} onChange={(e) => update('plate', e.target.value)} className="input-field" />
          <select value={form.serviceType} onChange={(e) => update('serviceType', e.target.value)} className="input-field appearance-none">
            <option value="">نوع خدمت</option><option value="taxi">تاکسی</option><option value="cargo">حمل بار</option><option value="both">هر دو</option>
          </select>
        </div>
      )}

      {step === 1 && type === 'cargo' && (
        <div className="space-y-2">
          <select value={form.cargoVehicle} onChange={(e) => update('cargoVehicle', e.target.value)} className="input-field appearance-none">
            <option value="">نوع وسیله</option><option>وانت</option><option>نیسان</option><option>کامیون</option><option>تریلی</option>
          </select>
          <input type="text" placeholder="ظرفیت حمل" value={form.capacity} onChange={(e) => update('capacity', e.target.value)} className="input-field" />
          <select value={form.cargoType} onChange={(e) => update('cargoType', e.target.value)} className="input-field appearance-none">
            <option value="">نوع بار</option><option>سبک</option><option>سنگین</option><option>یخچالی</option>
          </select>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-2 gap-1.5">
          {areas.map((a) => (
            <button key={a} type="button" onClick={() => toggleRoute(a)}
              className={`rounded-lg py-2 px-2 text-xs font-semibold border transition-all ${
                form.routes.includes(a) ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
              }`}>{form.routes.includes(a) ? '✓ ' : ''}{a}</button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="bg-gray-50 rounded-xl p-4 text-xs space-y-1.5 border border-gray-100">
          <div className="flex justify-between"><span className="text-gray-400">نام:</span><span className="font-bold text-gray-700">{form.name}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">تلفن:</span><span className="font-bold text-gray-700" dir="ltr">{form.phone}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">مسیرها:</span><span className="font-bold text-gray-700">{form.routes.join('، ')}</span></div>
        </div>
      )}

      <div className="flex justify-between mt-5">
        {step > 0 ? <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-50"><ChevronRight size={14} /> قبلی</button> : <div />}
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(step + 1)} className="btn-primary text-xs px-4 py-2 flex items-center gap-1">بعدی <ChevronLeft size={14} /></button>
        ) : (
          <button onClick={() => setSubmitted(true)} className="bg-emerald-500 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 shadow-md shadow-emerald-200 flex items-center gap-1"><Check size={14} /> ثبت</button>
        )}
      </div>
    </div>
  )
}
