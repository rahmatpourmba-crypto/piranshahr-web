import { Link } from 'react-router-dom'

export default function CategoryCard({ icon: Icon, title, count, link }) {
  return (
    <Link to={link} className="bg-white rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-all duration-200 group">
      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 transition-colors">
        {Icon ? <Icon size={18} className="text-gray-600" strokeWidth={1.8} /> : <span className="text-sm font-semibold text-gray-600">{title[0]}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-[13px] truncate">{title}</h3>
        <span className="text-[12px] text-gray-400">{count} آگهی</span>
      </div>
    </Link>
  )
}
