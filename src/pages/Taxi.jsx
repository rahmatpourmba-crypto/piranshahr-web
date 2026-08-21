import { Zap, ShieldCheck, Banknote, CarFront } from 'lucide-react'
import TaxiForm from '../components/TaxiForm'
import DriverCard from '../components/DriverCard'
import driversData from '../data/drivers.json'

const features = [
  { icon: Zap, title: 'سریع', desc: 'نزدیک‌ترین راننده در چند دقیقه' },
  { icon: ShieldCheck, title: 'امن', desc: 'رانندگان مجوزدار' },
  { icon: Banknote, title: 'ارزان', desc: 'تعرفه شفاف' },
]

export default function Taxi() {
  const activeDrivers = driversData.filter((d) => d.active && (d.serviceType === 'taxi' || d.serviceType === 'both'))

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 noise-bg">
      <div>
        <h1 className="font-extrabold text-lg text-white flex items-center gap-2">
          <CarFront size={20} className="text-yellow-400" /> تاکسی پیرانشهر
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">{activeDrivers.length} راننده فعال</p>
      </div>

      <TaxiForm />

      <div className="grid grid-cols-3 gap-2">
        {features.map((f) => (
          <div key={f.title} className="glass rounded-xl p-3 text-center glow-card">
            <div className="w-10 h-10 bg-indigo-500/15 rounded-xl flex items-center justify-center mx-auto mb-2">
              <f.icon size={18} className="text-indigo-400" />
            </div>
            <h3 className="font-bold text-xs text-white mb-0.5">{f.title}</h3>
            <p className="text-[10px] text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>

      {activeDrivers.length > 0 && (
        <div>
          <h2 className="font-bold text-sm text-white mb-3">رانندگان فعال</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeDrivers.map((d) => <DriverCard key={d.id} driver={d} />)}
          </div>
        </div>
      )}
    </div>
  )
}
