import { useState } from 'react'
import { Truck } from 'lucide-react'
import cargo from '../data/cargo.json'
import CargoCard from '../components/CargoCard'
import RegisterForm from '../components/RegisterForm'

const filters = [{ value: 'all', label: 'همه' }, { value: 'سبک', label: 'سبک' }, { value: 'سنگین', label: 'سنگین' }, { value: 'یخچالی', label: 'یخچالی' }]

export default function CargoTransport() {
  const [filter, setFilter] = useState('all')
  const [showRegister, setShowRegister] = useState(false)
  const filtered = cargo.filter((c) => filter === 'all' || c.cargoType === filter)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 noise-bg">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-extrabold text-lg text-white">حمل و نقل بار</h1>
          <p className="text-xs text-gray-500 mt-0.5">{filtered.length} حمل‌کننده فعال</p>
        </div>
        <button onClick={() => setShowRegister(!showRegister)} className="btn-primary text-xs px-4 py-2">
          + ثبت‌نام
        </button>
      </div>

      {showRegister && <div className="mb-5"><RegisterForm type="cargo" /></div>}

      <div className="flex gap-1.5 mb-5">
        {filters.map((f) => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              filter === f.value ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/15'
            }`}>{f.label}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((c) => <CargoCard key={c.id} cargo={c} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Truck size={40} className="text-gray-700 mx-auto mb-2" />
          <p className="text-sm font-bold text-gray-500">حمل‌کننده‌ای یافت نشد</p>
        </div>
      )}
    </div>
  )
}
