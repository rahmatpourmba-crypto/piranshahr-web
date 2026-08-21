import { Phone, Star } from 'lucide-react'

const vehicleIcons = { وانت: '🛻', نیسان: '🚚', کامیون: '🚛', تریلی: '🚜' }
const cargoColors = {
  سبک: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  سنگین: 'bg-red-500/15 text-red-400 border-red-500/20',
  یخچالی: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
}

export default function CargoCard({ cargo }) {
  return (
    <div className="glass rounded-xl overflow-hidden glow-card animate-fade-in-up">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{vehicleIcons[cargo.vehicleType] || '🚛'}</span>
            <div>
              <h3 className="font-bold text-white text-sm">{cargo.name}</h3>
              <p className="text-[11px] text-gray-500">{cargo.vehicleType} · {cargo.capacity}</p>
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${
            cargo.active ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/15 text-red-400 border border-red-500/20'
          }`}>
            {cargo.active ? '● فعال' : '● غیرفعال'}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2.5">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-lg border ${cargoColors[cargo.cargoType] || 'bg-gray-500/15 text-gray-400 border-gray-500/20'}`}>
            {cargo.cargoType}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className={i < Math.floor(cargo.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'} />
            ))}
            <span className="text-[11px] text-gray-500 mr-1">{cargo.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {cargo.routes.map((route, i) => (
            <span key={i} className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
              {route}
            </span>
          ))}
        </div>

        <a href={`tel:${cargo.phone}`}
          className="flex items-center justify-center gap-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2.5 rounded-lg font-bold text-xs hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98] transition-all">
          <Phone size={13} />
          تماس
        </a>
      </div>
    </div>
  )
}
