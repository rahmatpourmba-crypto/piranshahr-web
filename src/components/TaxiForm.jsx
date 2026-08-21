import { useState } from 'react'
import { MapPin, Navigation, Car, Check } from 'lucide-react'
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
  const [submitted, setSubmitted] = useState(false)

  const selectedVehicle = vehicleTypes.find((v) => v.value === vehicleType)
  const estimatedPrice = selectedVehicle?.price || 5000
  const activeDrivers = drivers.filter((d) => d.active && (d.serviceType === 'taxi' || d.serviceType === 'both'))

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  if (submitted) {
    return (
      <div className="glass rounded-xl p-8 text-center glow-card">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-bold text-sm text-emerald-400 mb-1">درخواست ثبت شد!</h3>
        <p className="text-xs text-gray-500">مبدأ: {origin} → مقصد: {destination}</p>
        <p className="text-[10px] text-gray-600 mt-1">راننده‌ها به‌زودی تماس میگیرند.</p>
      </div>
    )
  }

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 pr-9 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition appearance-none"
  const selectClass = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 pr-9 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition appearance-none"

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="font-bold text-sm text-white mb-4">درخواست تاکسی</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[11px] font-medium text-gray-400 mb-1">مبدأ</label>
          <div className="relative">
            <MapPin size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <select value={origin} onChange={(e) => setOrigin(e.target.value)} className={selectClass} required>
              <option value="">انتخاب کنید...</option>
              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-gray-400 mb-1">مقصد</label>
          <div className="relative">
            <Navigation size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <select value={destination} onChange={(e) => setDestination(e.target.value)} className={selectClass} required>
              <option value="">انتخاب کنید...</option>
              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-gray-400 mb-1">نوع خودرو</label>
          <div className="grid grid-cols-3 gap-2">
            {vehicleTypes.map((v) => (
              <button key={v.value} type="button" onClick={() => setVehicleType(v.value)}
                className={`border rounded-xl py-2.5 text-center transition-all ${
                  vehicleType === v.value ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400' : 'border-white/5 bg-white/5 text-gray-500 hover:border-white/15'
                }`}>
                <span className="text-xl">{v.icon}</span>
                <span className="block text-[11px] font-medium">{v.label}</span>
                <span className="block text-[10px] text-gray-600">{v.price.toLocaleString()} ت</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl py-3 px-4 text-center">
          <span className="text-xs text-gray-500">قیمت تقریبی: </span>
          <span className="text-base font-extrabold gradient-text">{estimatedPrice.toLocaleString()} تومان</span>
        </div>

        <button type="submit" className="w-full btn-primary text-sm py-3">
          🚕 درخواست تاکسی
        </button>
      </form>

      {activeDrivers.length > 0 && (
        <div className="mt-5 pt-4 border-t border-white/5">
          <p className="text-xs font-medium text-gray-500 mb-2">رانندگان فعال ({activeDrivers.length})</p>
          <div className="space-y-2">
            {activeDrivers.slice(0, 3).map((d) => (
              <div key={d.id} className="flex items-center justify-between glass-light rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <Car size={14} className="text-indigo-400" />
                  <span className="text-xs font-medium text-gray-300">{d.name}</span>
                  <span className="text-[10px] text-gray-600">{d.vehicleType}</span>
                </div>
                <a href={`tel:${d.phone}`} className="text-emerald-400 text-xs font-medium hover:text-emerald-300 transition-colors">تماس</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
