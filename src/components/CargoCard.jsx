import { Phone, Star } from 'lucide-react'

const vehicleIcons = { وانت: '🛻', نیسان: '🚚', کامیون: '🚛', تریلی: '🚜' }

export default function CargoCard({ cargo, onReveal }) {
  return (
    <div className="bg-white rounded-[20px] border border-gray-100/80 overflow-hidden animate-fade-up hover:shadow-xl hover:border-gray-200 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{vehicleIcons[cargo.vehicleType] || '🚛'}</span>
            <div>
              <h3 className="font-bold text-gray-900 text-[14px] tracking-tight">{cargo.name}</h3>
              <p className="text-[12px] text-gray-400 font-medium">{cargo.vehicleType} · {cargo.capacity}</p>
            </div>
          </div>
          <span className={`text-[11px] font-semibold px-3 py-1 rounded-xl ${cargo.active ? 'bg-gray-50 text-gray-700 border border-gray-200' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>
            {cargo.active ? '● فعال' : '● غیرفعال'}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-semibold bg-gray-50 text-gray-600 px-3 py-1 rounded-xl border border-gray-200">{cargo.cargoType}</span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(cargo.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
            ))}
            <span className="text-[12px] text-gray-400 mr-1 font-medium">{cargo.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {cargo.routes.map((r, i) => (
            <span key={i} className="text-[11px] text-gray-500 bg-gray-50 px-3 py-1 rounded-xl border border-gray-100 font-medium">{r}</span>
          ))}
        </div>

        <button onClick={() => onReveal(cargo)}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-2xl font-bold text-[13px] hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm">
          <Phone size={14} /> مشاهده شماره تماس
        </button>
      </div>
    </div>
  )
}
