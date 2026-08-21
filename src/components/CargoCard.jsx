import { Phone, Star, Weight } from 'lucide-react'

const vehicleIcons = {
  وانت: '🛻',
  نیسان: '🚚',
  کامیون: '🚛',
  تریلی: '🚜',
}

export default function CargoCard({ cargo }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{vehicleIcons[cargo.vehicleType] || '🚛'}</span>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">{cargo.name}</h3>
            <p className="text-xs text-gray-500">{cargo.vehicleType}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cargo.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {cargo.active ? 'فعال' : 'غیرفعال'}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-3 text-sm">
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
            {cargo.capacity}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            cargo.cargoType === 'سبک' ? 'bg-green-100 text-green-700' :
            cargo.cargoType === 'سنگین' ? 'bg-red-100 text-red-700' :
            'bg-purple-100 text-purple-700'
          }`}>
            {cargo.cargoType}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(cargo.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
            />
          ))}
          <span className="text-xs text-gray-500 mr-1">{cargo.rating}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {cargo.routes.map((route, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {route}
            </span>
          ))}
        </div>
      </div>

      <a
        href={`tel:${cargo.phone}`}
        className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors text-sm"
      >
        <Phone size={16} />
        تماس
      </a>
    </div>
  )
}
