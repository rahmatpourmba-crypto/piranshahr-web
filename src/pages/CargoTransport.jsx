import { useState } from 'react'
import { Truck, Weight } from 'lucide-react'
import cargo from '../data/cargo.json'
import CargoCard from '../components/CargoCard'
import RegisterForm from '../components/RegisterForm'

const filters = [
  { value: 'all', label: 'همه' },
  { value: 'سبک', label: 'سبک' },
  { value: 'سنگین', label: 'سنگین' },
  { value: 'یخچالی', label: 'یخچالی' },
]

export default function CargoTransport() {
  const [filter, setFilter] = useState('all')
  const [showRegister, setShowRegister] = useState(false)

  const filtered = cargo.filter(
    (c) => filter === 'all' || c.cargoType === filter
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-extrabold text-lg text-gray-900">حمل و نقل بار</h1>
          <p className="text-xs text-gray-400 mt-0.5">{filtered.length} حمل‌کننده فعال</p>
        </div>
        <button
          onClick={() => setShowRegister(!showRegister)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
        >
          + ثبت‌نام حمل‌کننده
        </button>
      </div>

      {showRegister && (
        <div className="mb-5">
          <RegisterForm type="cargo" />
        </div>
      )}

      <div className="flex gap-1.5 mb-4">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === f.value
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((c) => (
          <CargoCard key={c.id} cargo={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Truck size={40} className="text-gray-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-gray-500">حمل‌کننده‌ای یافت نشد</p>
        </div>
      )}
    </div>
  )
}
