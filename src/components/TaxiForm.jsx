import { useState } from 'react'
import { MapPin, Navigation, Car } from 'lucide-react'
import drivers from '../data/drivers.json'

const vehicleTypes = [
  { value: 'پراید', price: 5000, label: 'پراید', icon: '🚗' },
  { value: 'پژو', price: 7000, label: 'پژو', icon: '🚙' },
  { value: 'ون', price: 10000, label: 'ون', icon: '🚐' },
]

const areas = [
  'میدان امام', 'خیابان طالقانی', 'بازار مرکزی', 'محله نوبهار',
  'محله قلعه', 'خیابان آزادی', 'میدان شهدا', 'پارک لاله',
]

export default function TaxiForm() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [vehicleType, setVehicleType] = useState('پراید')

  const selectedVehicle = vehicleTypes.find((v) => v.value === vehicleType)
  const estimatedPrice = selectedVehicle?.price || 5000

  const activeDrivers = drivers.filter(
    (d) => d.active && (d.serviceType === 'taxi' || d.serviceType === 'both')
  )

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6 text-center">
        <div className="text-4xl mb-2">✅</div>
        <h3 className="font-bold text-sm text-emerald-700 mb-1">درخواست تاکسی ثبت شد!</h3>
        <p className="text-xs text-emerald-600">مبدأ: {origin} → مقصد: {destination}</p>
        <p className="text-xs text-emerald-500 mt-1">راننده‌های نزدیک به‌زودی با شما تماس میگیرند.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <h3 className="font-bold text-sm text-gray-900 mb-3">درخواست تاکسی</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">مبدأ</label>
          <div className="relative">
            <MapPin size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select value={origin} onChange={(e) => setOrigin(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 appearance-none" required>
              <option value="">انتخاب کنید...</option>
              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">مقصد</label>
          <div className="relative">
            <Navigation size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select value={destination} onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 appearance-none" required>
              <option value="">انتخاب کنید...</option>
              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">نوع خودرو</label>
          <div className="grid grid-cols-3 gap-1.5">
            {vehicleTypes.map((v) => (
              <button key={v.value} type="button" onClick={() => setVehicleType(v.value)}
                className={`border rounded-lg py-2 text-center transition-all ${
                  vehicleType === v.value ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}>
                <span className="text-lg">{v.icon}</span>
                <span className="block text-[11px] font-medium">{v.label}</span>
                <span className="block text-[10px] text-gray-400">{v.price.toLocaleString()} ت</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg py-2 px-3 text-center border border-blue-100">
          <span className="text-xs text-gray-500">قیمت تقریبی: </span>
          <span className="text-sm font-extrabold text-blue-700">{estimatedPrice.toLocaleString()} تومان</span>
        </div>

        <button type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all">
          🚕 درخواست تاکسی
        </button>
      </form>

      {activeDrivers.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-2">رانندگان فعال ({activeDrivers.length})</p>
          <div className="space-y-1.5">
            {activeDrivers.slice(0, 3).map((d) => (
              <div key={d.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <Car size={14} className="text-blue-600" />
                  <span className="text-xs font-medium text-gray-800">{d.name}</span>
                  <span className="text-[10px] text-gray-400">{d.vehicleType}</span>
                </div>
                <a href={`tel:${d.phone}`} className="text-emerald-600 text-xs font-medium hover:underline">تماس</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
