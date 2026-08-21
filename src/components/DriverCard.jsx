import { Phone, Star } from 'lucide-react'

const serviceLabels = {
  taxi: 'تاکسی',
  cargo: 'حمل بار',
  both: 'تاکسی و حمل بار',
}

const vehicleIcons = {
  پراید: '🚗',
  پژو: '🚙',
  ون: '🚐',
  کامیون: '🚛',
}

export default function DriverCard({ driver }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{vehicleIcons[driver.vehicleType] || '🚗'}</span>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">{driver.name}</h3>
            <p className="text-xs text-gray-500">{driver.vehicleType}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${driver.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {driver.active ? 'فعال' : 'غیرفعال'}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
            {serviceLabels[driver.serviceType]}
          </span>
          <span className="text-xs text-gray-400">{driver.plate}</span>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(driver.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
            />
          ))}
          <span className="text-xs text-gray-500 mr-1">{driver.rating}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {driver.routes.map((route, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {route}
            </span>
          ))}
        </div>
      </div>

      <a
        href={`tel:${driver.phone}`}
        className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors text-sm"
      >
        <Phone size={16} />
        تماس
      </a>
    </div>
  )
}
