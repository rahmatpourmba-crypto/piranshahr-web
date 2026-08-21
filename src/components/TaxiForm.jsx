import { useState } from 'react'
import { MapPin, Navigation, Car } from 'lucide-react'
import drivers from '../data/drivers.json'

const vehicleTypes = [
  { value: 'پراید', price: 5000, label: 'پراید' },
  { value: 'پژو', price: 7000, label: 'پژو' },
  { value: 'ون', price: 10000, label: 'ون' },
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = `🚕 درخواست تاکسی\nمبدأ: ${origin}\nمقصد: ${destination}\nنوع خودرو: ${vehicleType}\nقیمت تقریبی: ${estimatedPrice.toLocaleString()} تومان`
    window.open(`https://t.me/Superapoiranshar_bot?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">درخواست تاکسی</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">مبدأ</label>
          <div className="relative">
            <MapPin size={18} className="absolute right-3 top-3 text-gray-400" />
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              required
            >
              <option value="">انتخاب کنید...</option>
              {areas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">مقصد</label>
          <div className="relative">
            <Navigation size={18} className="absolute right-3 top-3 text-gray-400" />
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              required
            >
              <option value="">انتخاب کنید...</option>
              {areas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">نوع خودرو</label>
          <div className="grid grid-cols-3 gap-2">
            {vehicleTypes.map((v) => (
              <button
                key={v.value}
                type="button"
                onClick={() => setVehicleType(v.value)}
                className={`border rounded-xl py-2 text-sm font-medium transition-colors ${
                  vehicleType === v.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {v.label}
                <span className="block text-xs text-gray-400 mt-0.5">{v.price.toLocaleString()} ت</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <span className="text-sm text-gray-600">قیمت تقریبی: </span>
          <span className="text-lg font-bold text-blue-700">{estimatedPrice.toLocaleString()} تومان</span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          🚕 درخواست تاکسی
        </button>
      </form>

      {activeDrivers.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-bold text-gray-700 mb-2">رانندگان فعال نزدیک ({activeDrivers.length})</h4>
          <div className="space-y-2">
            {activeDrivers.slice(0, 3).map((d) => (
              <div key={d.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <Car size={16} className="text-blue-600" />
                  <span className="text-sm font-medium">{d.name}</span>
                  <span className="text-xs text-gray-400">{d.vehicleType}</span>
                </div>
                <a href={`tel:${d.phone}`} className="text-green-600 text-sm font-medium">
                  تماس
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
