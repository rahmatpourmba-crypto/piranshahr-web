import { useState } from 'react'
import { Truck } from 'lucide-react'
import cargo from '../data/cargo.json'
import CargoCard from '../components/CargoCard'
import RegisterForm from '../components/RegisterForm'
import PaymentModal from '../components/PaymentModal'

const filters = [{ value: 'all', label: 'همه' }, { value: 'wanton', label: 'وانت' }, { value: 'nissan', label: 'نیسان' }, { value: 'truck', label: 'کامیون' }, { value: 'trailer', label: 'تریلی' }]

export default function CargoTransport() {
  const [filter, setFilter] = useState('all')
  const [showReg, setShowReg] = useState(false)
  const [selectedCargo, setSelectedCargo] = useState(null)
  const filtered = cargo.filter(c => filter === 'all' || c.vehicleType === filter)

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-[20px] text-gray-900">حمل بار</h1>
        <button onClick={() => setShowReg(!showReg)} className="btn-primary px-4 py-2 text-[13px]">+ ثبت‌نام</button>
      </div>
      {showReg && <div className="mb-6"><RegisterForm type="cargo" /></div>}
      <div className="flex gap-2 mb-6">
        {filters.map(f => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
              filter === f.value ? 'bg-[#A13D4C] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}>{f.label}</button>
        ))}
      </div>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(c => <CargoCard key={c.id} cargo={c} onReveal={item => setSelectedCargo({ title: item.name, phone: item.phone, city: 'پیرانشهر' })} />)}
        </div>
      ) : (
        <div className="text-center py-24"><Truck size={32} className="text-gray-200 mx-auto mb-3" /><p className="text-gray-400 text-[14px]">باربری یافت نشد</p></div>
      )}
      <PaymentModal ad={selectedCargo} isOpen={Boolean(selectedCargo)} onClose={() => setSelectedCargo(null)} />
    </div>
  )
}
