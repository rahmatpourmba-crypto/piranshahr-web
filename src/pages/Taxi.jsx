import { useState } from 'react'
import { Zap, ShieldCheck, Banknote, CarFront } from 'lucide-react'
import TaxiForm from '../components/TaxiForm'
import DriverCard from '../components/DriverCard'
import driversData from '../data/drivers.json'
import PaymentModal from '../components/PaymentModal'

const features = [
  { icon: Zap, title: 'سریع', desc: 'نزدیک‌ترین راننده در چند دقیقه' },
  { icon: ShieldCheck, title: 'امن', desc: 'رانندگان مجوزدار' },
  { icon: Banknote, title: 'ارزان', desc: 'تعرفه شفاف' },
]

export default function Taxi() {
  const [selectedDriver, setSelectedDriver] = useState(null)
  const activeDrivers = driversData.filter((d) => d.active && (d.serviceType === 'taxi' || d.serviceType === 'both'))

  const handleReveal = (driver) => {
    setSelectedDriver({ title: driver.name, phone: driver.phone, city: 'پیرانشهر' })
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-6 space-y-8">
      <div>
        <h1 className="font-extrabold text-xl text-gray-900 flex items-center gap-3 tracking-tight">
          <CarFront size={22} className="text-gray-900" /> تاکسی پیرانشهر
        </h1>
        <p className="text-[13px] text-gray-400 mt-1 font-medium">{activeDrivers.length} راننده فعال</p>
      </div>
      <TaxiForm />
      <div className="grid grid-cols-3 gap-3">
        {features.map((f) => (
          <div key={f.title} className="bg-white rounded-[18px] border border-gray-100/80 p-4 text-center hover:shadow-lg hover:border-gray-200 transition-all duration-300">
            <div className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-gray-100">
              <f.icon size={18} className="text-gray-700" />
            </div>
            <h3 className="font-bold text-[13px] text-gray-900 mb-1">{f.title}</h3>
            <p className="text-[11px] text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
      {activeDrivers.length > 0 && (
        <div>
          <h2 className="font-bold text-[15px] text-gray-900 mb-4 tracking-tight">رانندگان فعال</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeDrivers.map((d) => <DriverCard key={d.id} driver={d} onReveal={handleReveal} />)}
          </div>
        </div>
      )}
      <PaymentModal ad={selectedDriver} isOpen={Boolean(selectedDriver)} onClose={() => setSelectedDriver(null)} />
    </div>
  )
}
