import { useState } from 'react'
import { Car } from 'lucide-react'
import drivers from '../data/drivers.json'
import DriverCard from '../components/DriverCard'
import RegisterForm from '../components/RegisterForm'

const filters = [{ value: 'all', label: 'همه' }, { value: 'taxi', label: 'تاکسی' }, { value: 'cargo', label: 'حمل بار' }, { value: 'both', label: 'هر دو' }]

export default function Drivers() {
  const [filter, setFilter] = useState('all')
  const [showReg, setShowReg] = useState(false)
  const filtered = drivers.filter((d) => filter === 'all' || d.serviceType === filter)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-extrabold text-lg text-gray-900">رانندگان پیرانشهر</h1>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">{filtered.length} راننده فعال</p>
        </div>
        <button onClick={() => setShowReg(!showReg)} className="btn-primary text-xs px-4 py-2">+ ثبت‌نام</button>
      </div>
      {showReg && <div className="mb-5"><RegisterForm type="driver" /></div>}
      <div className="flex gap-1.5 mb-5">
        {filters.map((f) => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              filter === f.value ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
            }`}>{f.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((d) => <DriverCard key={d.id} driver={d} />)}
      </div>
      {filtered.length === 0 && <div className="text-center py-16"><Car size={40} className="text-gray-300 mx-auto mb-2" /><p className="text-sm font-bold text-gray-500">راننده‌ای یافت نشد</p></div>}
    </div>
  )
}
