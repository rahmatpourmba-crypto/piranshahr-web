import { Link } from 'react-router-dom'

const colorMap = {
  blue: 'from-blue-500 to-blue-600 shadow-blue-200',
  green: 'from-emerald-500 to-emerald-600 shadow-emerald-200',
  orange: 'from-orange-500 to-orange-600 shadow-orange-200',
  purple: 'from-purple-500 to-purple-600 shadow-purple-200',
  red: 'from-red-500 to-red-600 shadow-red-200',
  teal: 'from-teal-500 to-teal-600 shadow-teal-200',
}

export default function CategoryCard({ icon: Icon, title, count, link, color = 'blue' }) {
  return (
    <Link
      to={link}
      className="group flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorMap[color] || colorMap.blue} flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform`}>
        {Icon ? <Icon size={20} /> : <span className="text-lg">{title[0]}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-sm truncate">{title}</h3>
        <span className="text-[11px] text-gray-400">{count} آگهی فعال</span>
      </div>
      <span className="text-gray-300 group-hover:text-gray-500 transition-colors">←</span>
    </Link>
  )
}
