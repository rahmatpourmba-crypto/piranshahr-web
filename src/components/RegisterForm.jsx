import { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const driverSteps = ['اطلاعات شخصی', 'اطلاعات خودرو', 'مسیرهای پرتکرار', 'تأیید نهایی']
const cargoSteps = ['اطلاعات شخصی', 'اطلاعات وسیله', 'مسیرهای پرتکرار', 'تأیید نهایی']

const areas = [
  'میدان امام', 'خیابان طالقانی', 'بازار مرکزی', 'محله نوبهار',
  'محله قلعه', 'خیابان آزادی', 'میدان شهدا', 'پارک لاله',
  'جاده مهاباد', 'جاده ارومیه', 'جاده سردشت', 'جاده بانه',
]

export default function RegisterForm({ type }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', phone: '',
    vehicleType: '', plate: '', serviceType: '',
    cargoVehicle: '', capacity: '', cargoType: '',
    routes: [],
  })

  const steps = type === 'driver' ? driverSteps : cargoSteps
  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const toggleRoute = (area) => {
    setForm((prev) => ({
      ...prev,
      routes: prev.routes.includes(area)
        ? prev.routes.filter((r) => r !== area)
        : [...prev.routes, area],
    }))
  }

  const handleSubmit = () => {
    let msg = `📋 ثبت‌نام ${type === 'driver' ? 'راننده' : 'حمل‌کننده'}\n`
    msg += `نام: ${form.name}\nتلفن: ${form.phone}\n`
    if (type === 'driver') {
      msg += `خودرو: ${form.vehicleType}\nپلاک: ${form.plate}\nنوع خدمت: ${form.serviceType}\n`
    } else {
      msg += `وسیله: ${form.cargoVehicle}\nظرفیت: ${form.capacity}\nنوع بار: ${form.cargoType}\n`
    }
    msg += `مسیرها: ${form.routes.join(', ')}`
    window.open(`https://t.me/Superapoiranshar_bot?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              i <= step ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`hidden sm:block w-12 h-0.5 mx-1 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">{steps[step]}</h3>

      {step === 0 && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="شماره تماس"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="ltr"
          />
        </div>
      )}

      {step === 1 && type === 'driver' && (
        <div className="space-y-3">
          <select
            value={form.vehicleType}
            onChange={(e) => update('vehicleType', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">نوع خودرو</option>
            <option value="پراید">پراید</option>
            <option value="پژو">پژو</option>
            <option value="ون">ون</option>
            <option value="کامیون">کامیون</option>
          </select>
          <input
            type="text"
            placeholder="شماره پلاک (مثال: 12 ب 345)"
            value={form.plate}
            onChange={(e) => update('plate', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={form.serviceType}
            onChange={(e) => update('serviceType', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">نوع خدمت</option>
            <option value="taxi">تاکسی</option>
            <option value="cargo">حمل بار</option>
            <option value="both">هر دو</option>
          </select>
        </div>
      )}

      {step === 1 && type === 'cargo' && (
        <div className="space-y-3">
          <select
            value={form.cargoVehicle}
            onChange={(e) => update('cargoVehicle', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">نوع وسیله</option>
            <option value="وانت">وانت</option>
            <option value="نیسان">نیسان</option>
            <option value="کامیون">کامیون</option>
            <option value="تریلی">تریلی</option>
          </select>
          <input
            type="text"
            placeholder="ظرفیت حمل (مثال: 1 تن)"
            value={form.capacity}
            onChange={(e) => update('capacity', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={form.cargoType}
            onChange={(e) => update('cargoType', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">نوع بار</option>
            <option value="سبک">سبک</option>
            <option value="سنگین">سنگین</option>
            <option value="یخچالی">یخچالی</option>
          </select>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-sm text-gray-500 mb-3">مسیرهایی که در آنها فعال هستید را انتخاب کنید:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {areas.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => toggleRoute(area)}
                className={`border rounded-xl py-2 px-3 text-sm transition-colors ${
                  form.routes.includes(area)
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {form.routes.includes(area) ? '✓ ' : ''}{area}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
          <div><span className="text-gray-500">نام:</span> <span className="font-medium">{form.name}</span></div>
          <div><span className="text-gray-500">تلفن:</span> <span className="font-medium" dir="ltr">{form.phone}</span></div>
          {type === 'driver' ? (
            <>
              <div><span className="text-gray-500">خودرو:</span> <span className="font-medium">{form.vehicleType}</span></div>
              <div><span className="text-gray-500">پلاک:</span> <span className="font-medium">{form.plate}</span></div>
              <div><span className="text-gray-500">خدمت:</span> <span className="font-medium">{form.serviceType}</span></div>
            </>
          ) : (
            <>
              <div><span className="text-gray-500">وسیله:</span> <span className="font-medium">{form.cargoVehicle}</span></div>
              <div><span className="text-gray-500">ظرفیت:</span> <span className="font-medium">{form.capacity}</span></div>
              <div><span className="text-gray-500">بار:</span> <span className="font-medium">{form.cargoType}</span></div>
            </>
          )}
          <div><span className="text-gray-500">مسیرها:</span> <span className="font-medium">{form.routes.join(', ')}</span></div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            <ChevronRight size={16} /> قبلی
          </button>
        ) : <div />}

        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-1 bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700"
          >
            بعدی <ChevronLeft size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1 bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-green-700"
          >
            ✅ ارسال ثبت‌نام
          </button>
        )}
      </div>
    </div>
  )
}
