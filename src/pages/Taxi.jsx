import { Zap, ShieldCheck, Banknote, CarFront } from 'lucide-react'
import TaxiForm from '../components/TaxiForm'
import DriverCard from '../components/DriverCard'
import driversData from '../data/drivers.json'

const features = [
  { icon: Zap, title: 'سریع', desc: 'نزدیک‌ترین راننده در چند دقیقه' },
  { icon: ShieldCheck, title: 'امن', desc: 'رانندگان مجوزدار و بررسی‌شده' },
  { icon: Banknote, title: 'ارزان', desc: 'تعرفه شفاف بدون هزینه پنهان' },
]

export default function Taxi() {
  const activeDrivers = driversData.filter(
    (d) => d.active && (d.serviceType === 'taxi' || d.serviceType === 'both')
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-5 space-y-6">
      <div>
        <h1 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
          <CarFront size={20} className="text-yellow-500" />
          تاکسی پیرانشهر
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">{activeDrivers.length} راننده فعال</p>
      </div>

      <TaxiForm />

      <div className="grid grid-cols-3 gap-2">
        {features.map((f) => (
          <div key={f.title} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-sm">
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <f.icon size={18} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-xs text-gray-900 mb-0.5">{f.title}</h3>
            <p className="text-[10px] text-gray-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {activeDrivers.length > 0 && (
        <div>
          <h2 className="font-bold text-sm text-gray-900 mb-3">رانندگان فعال</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeDrivers.map((driver) => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
