import { useState } from 'react'
import { MapPin, Navigation, Car } from 'lucide-react'
import drivers from '../data/drivers.json'

const vehicleTypes = [
  { value: 'پراید', price: 5000, label: 'پراید', icon: '🚗' },
  { value: 'پژو', price: 7000, label: 'پژو', icon: '🚙' },
  { value: 'ون', price: 10000, label: 'ون', icon: '🚐' },
]
const areas = ['میدان امام', 'خیابان طالقانی', 'بازار مرکزی', 'محله نوبهار', 'محله قلعه', 'خیابان آزادی', 'میدان شهدا', 'پارک لاله']

export default function TaxiForm() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [vehicleType, setVehicleType] = useState('پراید')
  const [submitted, setSubmitted] = useState(false)

  const est = vehicleTypes.find((v) => v.value === vehicleType)?.price || 5000
  const activeDrivers = drivers.filter((d) => d.active && (d.serviceType === 'taxi' || d.serviceType === 'both'))

  if (submitted) return (
    <div className="card p-8 text-center">
      <div className="text-4xl mb-3">✅</div>
      <h3 className="font-bold text-sm text-emerald-600 mb-1">درخواست ثبت شد!</h3>
      <p className="text-xs text-gray-400">راننده‌ها به‌زودی تماس میگیرند.</p>
    </div>
  )

  return (
    <div className="card p-5">
      <h3 className="font-bold text-sm text-gray-900 mb-4">درخواست تاکسی</h3>
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-3">
        <div>
          <label className="block text-[11px] font-medium text-gray-500 mb-1">مبدأ</label>
          <div className="relative">
            <MapPin size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="input-field pr-9 appearance-none" required>
              <option value="">انتخاب کنید...</option>{areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-medium text-gray-500 mb-1">مقصد</label>
          <div className="relative">
            <Navigation size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select value={destination} onChange={(e) => setDestination(e.target.value)} className="input-field pr-9 appearance-none" required>
              <option value="">انتخاب کنید...</option>{areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-medium text-gray-500 mb-1">نوع خودرو</label>
          <div className="grid grid-cols-3 gap-2">
            {vehicleTypes.map((v) => (
              <button key={v.value} type="button" onClick={() => setVehicleType(v.value)}
                className={`border rounded-xl py-2.5 text-center transition-all ${
                  vehicleType === v.value ? 'border-blue-300 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100' : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white'
                }`}>
                <span className="text-xl">{v.icon}</span>
                <span className="block text-[11px] font-bold">{v.label}</span>
                <span className="block text-[10px] text-gray-400">{v.price.toLocaleString()} ت</span>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl py-3 px-4 text-center border border-blue-100">
          <span className="text-xs text-gray-500">قیمت تقریبی: </span>
          <span className="text-base font-extrabold text-blue-600">{est.toLocaleString()} تومان</span>
        </div>
        <button type="submit" className="w-full btn-primary text-sm py-3">🚕 درخواست تاکسی</button>
      </form>

      {activeDrivers.length > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-500 mb-2">رانندگان فعال ({activeDrivers.length})</p>
          <div className="space-y-2">
            {activeDrivers.slice(0, 3).map((d) => (
              <div key={d.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                <div className="flex items-center gap-2">
                  <Car size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-gray-700">{d.name}</span>
                  <span className="text-[10px] text-gray-400">{d.vehicleType}</span>
                </div>
                <a href={`tel:${d.phone}`} className="text-emerald-600 text-xs font-bold hover:text-emerald-700">تماس</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
