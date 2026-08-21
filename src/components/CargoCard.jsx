import { Phone, Star } from 'lucide-react'

const vehicleIcons = { وانت: '🛻', نیسان: '🚚', کامیون: '🚛', تریلی: '🚜' }

export default function CargoCard({ cargo, onReveal }) {
  return (
    <div className="bg-white rounded-2xl p-5 hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">{vehicleIcons[cargo.vehicleType] || '🚛'}</span>
          <div>
            <h3 className="font-semibold text-gray-900 text-[14px]">{cargo.name}</h3>
            <p className="text-[12px] text-gray-400">{cargo.vehicleType} · {cargo.capacity}</p>
          </div>
        </div>
        <span className="text-[11px] text-gray-400">{cargo.active ? 'فعال' : 'غیرفعال'}</span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] text-[#A13D4C] bg-[#FDF2F3] px-2 py-0.5 rounded-full font-medium">{cargo.cargoType}</span>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={11} className={i < Math.floor(cargo.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
          ))}
          <span className="text-[11px] text-gray-400 mr-1">{cargo.rating}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {cargo.routes.map((r, i) => (
          <span key={i} className="text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{r}</span>
        ))}
      </div>

      <button onClick={() => onReveal(cargo)}
        className="w-full flex items-center justify-center gap-2 bg-[#A13D4C] text-white py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#8B2635] transition-colors">
        <Phone size={13} /> مشاهده شماره
      </button>
    </div>
  )
}
