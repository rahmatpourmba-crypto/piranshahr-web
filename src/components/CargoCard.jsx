import { Phone, Star } from 'lucide-react'

const vehicleIcons = { وانت: '🛻', نیسان: '🚚', کامیون: '🚛', تریلی: '🚜' }
const cargoColors = {
  سبک: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  سنگین: 'bg-red-50 text-red-700 border-red-200',
  یخچالی: 'bg-purple-50 text-purple-700 border-purple-200',
}

export default function CargoCard({ cargo }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{vehicleIcons[cargo.vehicleType] || '🚛'}</span>
            <div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{cargo.name}</h3>
              <p className="text-[11px] text-gray-400">{cargo.vehicleType} · {cargo.capacity}</p>
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cargo.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
            {cargo.active ? '● فعال' : '● غیرفعال'}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${cargoColors[cargo.cargoType] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
            {cargo.cargoType}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className={i < Math.floor(cargo.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
            ))}
            <span className="text-[11px] text-gray-400 mr-0.5">{cargo.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {cargo.routes.map((route, i) => (
            <span key={i} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">
              {route}
            </span>
          ))}
        </div>

        <a
          href={`tel:${cargo.phone}`}
          className="flex items-center justify-center gap-1.5 w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold text-xs hover:bg-emerald-700 active:scale-[0.98] transition-all"
        >
          <Phone size={13} />
          تماس
        </a>
      </div>
    </div>
  )
}
