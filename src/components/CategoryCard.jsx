import { Link } from 'react-router-dom'

const colorMap = {
  blue: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-200',
  green: 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-200',
  orange: 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-200',
  purple: 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-purple-200',
  red: 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-200',
  teal: 'bg-gradient-to-br from-teal-500 to-teal-600 shadow-teal-200',
}

export default function CategoryCard({ icon: Icon, title, count, link, color = 'blue' }) {
  return (
    <Link to={link} className="card p-3 flex items-center gap-3 group animate-fade-up">
      <div className={`w-11 h-11 rounded-xl ${colorMap[color] || colorMap.blue} flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
        {Icon ? <Icon size={18} /> : <span className="text-base font-bold">{title[0]}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-800 text-sm truncate">{title}</h3>
        <span className="text-[11px] text-gray-400 font-medium">{count} آگهی فعال</span>
      </div>
      <span className="text-gray-300 group-hover:text-blue-500 transition-colors text-xs font-bold">←</span>
    </Link>
  )
}
