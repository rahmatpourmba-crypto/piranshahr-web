import { Phone, Star } from 'lucide-react'

const vehicleIcons = { وانت: '🛻', نیسان: '🚚', کامیون: '🚛', تریلی: '🚜' }
const cargoColors = {
  سبک: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  سنگین: 'bg-red-50 text-red-600 border-red-200',
  یخچالی: 'bg-purple-50 text-purple-600 border-purple-200',
}

export default function CargoCard({ cargo }) {
  return (
    <div className="card overflow-hidden animate-fade-up">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{vehicleIcons[cargo.vehicleType] || '🚛'}</span>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{cargo.name}</h3>
              <p className="text-[11px] text-gray-400 font-medium">{cargo.vehicleType} · {cargo.capacity}</p>
            </div>
          </div>
          <span className={`badge ${cargo.active ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-500 border border-red-200'}`}>
            {cargo.active ? '● فعال' : '● غیرفعال'}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2.5">
          <span className={`badge border ${cargoColors[cargo.cargoType] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>{cargo.cargoType}</span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className={i < Math.floor(cargo.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
            ))}
            <span className="text-[11px] text-gray-400 mr-0.5">{cargo.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {cargo.routes.map((r, i) => (
            <span key={i} className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100 font-medium">{r}</span>
          ))}
        </div>

        <a href={`tel:${cargo.phone}`} className="w-full flex items-center justify-center gap-1.5 bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-md shadow-emerald-200">
          <Phone size={13} /> تماس
        </a>
      </div>
    </div>
  )
}
