import { Link } from 'react-router-dom'

export default function CategoryCard({ icon: Icon, title, count, link }) {
  return (
    <Link to={link} className="bg-white rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all duration-200 group border border-gray-100">
      <div className="w-11 h-11 rounded-xl bg-[#FDF2F3] flex items-center justify-center flex-shrink-0 group-hover:bg-[#F5E6E8] transition-colors">
        {Icon ? <Icon size={18} className="text-[#A13D4C]" strokeWidth={1.8} /> : <span className="text-sm font-bold text-[#A13D4C]">{title[0]}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-[13px] truncate">{title}</h3>
        <span className="text-[12px] text-gray-400">{count} آگهی</span>
      </div>
    </Link>
  )
}
