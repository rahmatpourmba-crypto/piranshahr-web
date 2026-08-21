import { Phone, Star } from 'lucide-react'

const serviceLabels = { taxi: 'تاکسی', cargo: 'حمل بار', both: 'تاکسی + بار' }
const vehicleIcons = { پراید: '🚗', پژو: '🚙', ون: '🚐', کامیون: '🚛' }

export default function DriverCard({ driver, onReveal }) {
  return (
    <div className="bg-white rounded-[20px] border border-gray-100/80 overflow-hidden animate-fade-up hover:shadow-xl hover:border-gray-200 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{vehicleIcons[driver.vehicleType] || '🚗'}</span>
            <div>
              <h3 className="font-bold text-gray-900 text-[14px] tracking-tight">{driver.name}</h3>
              <p className="text-[12px] text-gray-400 font-medium">{driver.vehicleType} · {driver.plate}</p>
            </div>
          </div>
          <span className={`text-[11px] font-semibold px-3 py-1 rounded-xl ${driver.active ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-500 border border-red-100'}`}>
            {driver.active ? '● فعال' : '● غیرفعال'}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-xl border border-blue-100">{serviceLabels[driver.serviceType]}</span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(driver.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
            ))}
            <span className="text-[12px] text-gray-400 mr-1 font-medium">{driver.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {driver.routes.map((r, i) => (
            <span key={i} className="text-[11px] text-gray-500 bg-gray-50 px-3 py-1 rounded-xl border border-gray-100 font-medium">{r}</span>
          ))}
        </div>

        <button onClick={() => onReveal(driver)}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-2xl font-bold text-[13px] hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm">
          <Phone size={14} /> مشاهده شماره تماس
        </button>
      </div>
    </div>
  )
}
