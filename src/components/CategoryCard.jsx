import { Link } from 'react-router-dom'

const colorMap = {
  blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
  green: 'from-emerald-500 to-emerald-600 shadow-emerald-500/25',
  orange: 'from-orange-500 to-orange-600 shadow-orange-500/25',
  purple: 'from-purple-500 to-purple-600 shadow-purple-500/25',
  red: 'from-red-500 to-red-600 shadow-red-500/25',
  teal: 'from-teal-500 to-teal-600 shadow-teal-500/25',
}

export default function CategoryCard({ icon: Icon, title, count, link, color = 'blue' }) {
  return (
    <Link to={link} className="group glass rounded-xl p-3 glow-card flex items-center gap-3 animate-slide-in" style={{ animationDelay: '0.05s' }}>
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[color] || colorMap.blue} flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
        {Icon ? <Icon size={18} /> : <span className="text-base">{title[0]}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-white text-sm truncate">{title}</h3>
        <span className="text-[11px] text-gray-500">{count} آگهی فعال</span>
      </div>
      <span className="text-gray-600 group-hover:text-indigo-400 transition-colors text-xs">←</span>
    </Link>
  )
}
