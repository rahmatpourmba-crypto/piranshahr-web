import { Link } from 'react-router-dom'

const colorMap = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-emerald-500 to-emerald-600',
  orange: 'from-orange-500 to-orange-600',
  purple: 'from-purple-500 to-purple-600',
  red: 'from-red-500 to-red-600',
  teal: 'from-teal-500 to-teal-600',
  emerald: 'from-emerald-500 to-emerald-600',
  amber: 'from-amber-500 to-amber-600',
  indigo: 'from-indigo-500 to-indigo-600',
}

export default function CategoryCard({ icon: Icon, title, count, link, color = 'blue' }) {
  return (
    <Link to={link} className="bg-white rounded-[18px] border border-gray-100/80 p-4 flex items-center gap-3.5 group hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-300">
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.blue} flex items-center justify-center text-white shadow-lg shadow-gray-200/50 flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
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
