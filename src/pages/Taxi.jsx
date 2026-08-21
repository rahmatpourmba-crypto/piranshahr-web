import { useState } from 'react'
import { Phone } from 'lucide-react'
import drivers from '../data/drivers.json'
import DriverCard from '../components/DriverCard'
import PaymentModal from '../components/PaymentModal'

const taxiFeatures = [
  { icon: '🗺️', title: 'مسیرهای مشخص', desc: 'مسیرهای پرتقاضا و پرتردد' },
  { icon: '⏱️', title: 'سرعت بالا', desc: 'تحویل سریع بار در مقصد' },
  { icon: '🛡️', title: 'امنیت کامل', desc: 'پوشش بیمه و تضمین سلامت بار' },
  { icon: '💰', title: 'قیمت مناسب', desc: 'نرخ‌های رقابتی و منصفانه' },
]

export default function Taxi() {
  const [selected, setSelected] = useState(null)
  const taxiDrivers = drivers.filter(d => d.serviceType === 'taxi' || d.serviceType === 'both')

  return (
    <div className="container py-8">
      <h1 className="font-bold text-[20px] text-gray-900 mb-6">تاکسی بار</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
        {taxiFeatures.map((f, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 text-center border border-gray-100">
            <span className="text-2xl block mb-2">{f.icon}</span>
            <h3 className="font-semibold text-gray-900 text-[13px] mb-1">{f.title}</h3>
            <p className="text-[12px] text-gray-400 leading-[1.8]">{f.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-[16px] text-gray-900 mb-4">رانندگان تاکسی</h2>
      {taxiDrivers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {taxiDrivers.map(d => <DriverCard key={d.id} driver={d} onReveal={driver => setSelected({ title: driver.name, phone: driver.phone, city: 'پیرانشهر' })} />)}
        </div>
      ) : (
        <div className="text-center py-24"><Phone size={32} className="text-gray-200 mx-auto mb-3" /><p className="text-gray-400 text-[14px]">راننده‌ای ثبت‌نام نکرده</p></div>
      )}
      <PaymentModal ad={selected} isOpen={Boolean(selected)} onClose={() => setSelected(null)} />
    </div>
  )
}
