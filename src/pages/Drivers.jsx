import { useState } from 'react'
import { Car } from 'lucide-react'
import drivers from '../data/drivers.json'
import DriverCard from '../components/DriverCard'
import RegisterForm from '../components/RegisterForm'
import PaymentModal from '../components/PaymentModal'

const filters = [{ value: 'all', label: 'همه' }, { value: 'taxi', label: 'تاکسی' }, { value: 'cargo', label: 'حمل بار' }, { value: 'both', label: 'هر دو' }]

export default function Drivers() {
  const [filter, setFilter] = useState('all')
  const [showReg, setShowReg] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const filtered = drivers.filter((d) => filter === 'all' || d.serviceType === filter)

  const handleReveal = (driver) => {
    setSelectedDriver({ title: driver.name, phone: driver.phone, city: 'پیرانشهر' })
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-extrabold text-xl text-gray-900 tracking-tight">رانندگان پیرانشهر</h1>
          <p className="text-[13px] text-gray-400 mt-1 font-medium">{filtered.length} راننده فعال</p>
        </div>
        <button onClick={() => setShowReg(!showReg)} className="bg-gray-900 text-white text-[13px] font-bold px-5 py-2.5 rounded-2xl hover:bg-gray-800 transition-all shadow-sm">+ ثبت‌نام</button>
      </div>
      {showReg && <div className="mb-6"><RegisterForm type="driver" /></div>}
      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              filter === f.value ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}>{f.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((d) => <DriverCard key={d.id} driver={d} onReveal={handleReveal} />)}
      </div>
      {filtered.length === 0 && <div className="text-center py-20"><Car size={40} className="text-gray-300 mx-auto mb-3" /><p className="text-sm font-bold text-gray-500">راننده‌ای یافت نشد</p></div>}
      <PaymentModal ad={selectedDriver} isOpen={Boolean(selectedDriver)} onClose={() => setSelectedDriver(null)} />
    </div>
  )
}
