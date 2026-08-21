import { Zap, ShieldCheck, Banknote, CarFront } from 'lucide-react'
import TaxiForm from '../components/TaxiForm'
import DriverCard from '../components/DriverCard'
import driversData from '../data/drivers.json'

const features = [
  { icon: Zap, title: 'سریع', desc: 'نزدیک‌ترین راننده در چند دقیقه', color: 'text-orange-500 bg-orange-50 border-orange-200' },
  { icon: ShieldCheck, title: 'امن', desc: 'رانندگان مجوزدار', color: 'text-blue-500 bg-blue-50 border-blue-200' },
  { icon: Banknote, title: 'ارزان', desc: 'تعرفه شفاف', color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
]

export default function Taxi() {
  const activeDrivers = driversData.filter((d) => d.active && (d.serviceType === 'taxi' || d.serviceType === 'both'))

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="font-extrabold text-lg text-gray-900 flex items-center gap-2"><CarFront size={20} className="text-orange-500" /> تاکسی پیرانشهر</h1>
        <p className="text-xs text-gray-400 mt-0.5 font-medium">{activeDrivers.length} راننده فعال</p>
      </div>
      <TaxiForm />
      <div className="grid grid-cols-3 gap-2">
        {features.map((f) => (
          <div key={f.title} className={`card p-3 text-center border ${f.color.split(' ')[2]}`}>
            <div className={`w-10 h-10 ${f.color.split(' ')[1]} rounded-xl flex items-center justify-center mx-auto mb-2 border ${f.color.split(' ')[2]}`}>
              <f.icon size={18} className={f.color.split(' ')[0]} />
            </div>
            <h3 className="font-bold text-xs text-gray-900 mb-0.5">{f.title}</h3>
            <p className="text-[10px] text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
      {activeDrivers.length > 0 && (
        <div>
          <h2 className="font-bold text-sm text-gray-900 mb-3">رانندگان فعال</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeDrivers.map((d) => <DriverCard key={d.id} driver={d} />)}
          </div>
        </div>
      )}
    </div>
  )
}
