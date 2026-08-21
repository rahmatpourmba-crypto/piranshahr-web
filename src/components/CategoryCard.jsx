import { Link } from 'react-router-dom'

export default function CategoryCard({ icon: Icon, title, count, link }) {
  return (
    <Link to={link} className="bg-white rounded-[18px] border border-gray-100/80 p-4 flex items-center gap-3.5 group hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-300">
      <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-lg shadow-gray-300/30 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
        {Icon ? <Icon size={20} strokeWidth={2} /> : <span className="text-lg font-bold">{title[0]}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-[14px] truncate tracking-tight">{title}</h3>
        <span className="text-[12px] text-gray-400 font-medium">{count} آگهی فعال</span>
      </div>
      <span className="text-gray-200 group-hover:text-gray-900 group-hover:translate-x-[-2px] transition-all duration-300 text-sm font-bold">‹</span>
    </Link>
  )
}
