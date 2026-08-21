import { Phone, Star } from 'lucide-react'

const serviceLabels = { taxi: 'تاکسی', cargo: 'حمل بار', both: 'تاکسی + بار' }
const vehicleIcons = { پراید: '🚗', پژو: '🚙', ون: '🚐', کامیون: '🚛' }

export default function DriverCard({ driver }) {
  return (
    <div className="card overflow-hidden animate-fade-up">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{vehicleIcons[driver.vehicleType] || '🚗'}</span>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{driver.name}</h3>
              <p className="text-[11px] text-gray-400 font-medium">{driver.vehicleType} · {driver.plate}</p>
            </div>
          </div>
          <span className={`badge ${driver.active ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-500 border border-red-200'}`}>
            {driver.active ? '● فعال' : '● غیرفعال'}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-2.5">
          <span className="badge bg-blue-50 text-blue-600 border border-blue-200">{serviceLabels[driver.serviceType]}</span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className={i < Math.floor(driver.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
            ))}
            <span className="text-[11px] text-gray-400 mr-0.5">{driver.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {driver.routes.map((r, i) => (
            <span key={i} className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100 font-medium">{r}</span>
          ))}
        </div>

        <a href={`tel:${driver.phone}`} className="w-full flex items-center justify-center gap-1.5 bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-md shadow-emerald-200">
          <Phone size={13} /> تماس
        </a>
      </div>
    </div>
  )
}
