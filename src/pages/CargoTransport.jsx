import { useState } from 'react'
import { Truck } from 'lucide-react'
import cargo from '../data/cargo.json'
import CargoCard from '../components/CargoCard'
import RegisterForm from '../components/RegisterForm'
import PaymentModal from '../components/PaymentModal'

const filters = [{ value: 'all', label: 'همه' }, { value: 'سبک', label: 'سبک' }, { value: 'سنگین', label: 'سنگین' }, { value: 'یخچالی', label: 'یخچالی' }]

export default function CargoTransport() {
  const [filter, setFilter] = useState('all')
  const [showReg, setShowReg] = useState(false)
  const [selectedCargo, setSelectedCargo] = useState(null)
  const filtered = cargo.filter((c) => filter === 'all' || c.cargoType === filter)

  const handleReveal = (c) => {
    setSelectedCargo({ title: c.name, phone: c.phone, city: 'پیرانشهر' })
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-extrabold text-xl text-gray-900 tracking-tight">حمل و نقل بار</h1>
          <p className="text-[13px] text-gray-400 mt-1 font-medium">{filtered.length} حمل‌کننده فعال</p>
        </div>
        <button onClick={() => setShowReg(!showReg)} className="bg-gray-900 text-white text-[13px] font-bold px-5 py-2.5 rounded-2xl hover:bg-gray-800 transition-all shadow-sm">+ ثبت‌نام</button>
      </div>
      {showReg && <div className="mb-6"><RegisterForm type="cargo" /></div>}
      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              filter === f.value ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}>{f.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => <CargoCard key={c.id} cargo={c} onReveal={handleReveal} />)}
      </div>
      {filtered.length === 0 && <div className="text-center py-20"><Truck size={40} className="text-gray-300 mx-auto mb-3" /><p className="text-sm font-bold text-gray-500">حمل‌کننده‌ای یافت نشد</p></div>}
      <PaymentModal ad={selectedCargo} isOpen={Boolean(selectedCargo)} onClose={() => setSelectedCargo(null)} />
    </div>
  )
}
