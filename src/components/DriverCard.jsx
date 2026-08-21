import { Phone, Star } from 'lucide-react'

const serviceLabels = { taxi: 'تاکسی', cargo: 'حمل بار', both: 'تاکسی + بار' }
const vehicleIcons = { پراید: '🚗', پژو: '🚙', ون: '🚐', کامیون: '🚛' }

export default function DriverCard({ driver }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{vehicleIcons[driver.vehicleType] || '🚗'}</span>
            <div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{driver.name}</h3>
              <p className="text-[11px] text-gray-400">{driver.vehicleType} · {driver.plate}</p>
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${driver.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
            {driver.active ? '● فعال' : '● غیرفعال'}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="bg-blue-50 text-blue-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-blue-200">
            {serviceLabels[driver.serviceType]}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className={i < Math.floor(driver.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
            ))}
            <span className="text-[11px] text-gray-400 mr-0.5">{driver.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {driver.routes.map((route, i) => (
            <span key={i} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">
              {route}
            </span>
          ))}
        </div>

        <a
          href={`tel:${driver.phone}`}
          className="flex items-center justify-center gap-1.5 w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold text-xs hover:bg-emerald-700 active:scale-[0.98] transition-all"
        >
          <Phone size={13} />
          تماس
        </a>
      </div>
    </div>
  )
}
