import { Link } from 'react-router-dom'

export default function CategoryCard({ icon, title, count, link, color = 'blue' }) {
  const colorMap = {
    blue: 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200',
    green: 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-200',
    orange: 'from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border-orange-200',
    purple: 'from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-purple-200',
    red: 'from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border-red-200',
    teal: 'from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 border-teal-200',
  }

  return (
    <Link
      to={link}
      className={`bg-gradient-to-br ${colorMap[color] || colorMap.blue} border rounded-2xl p-5 text-center transition-all hover:shadow-lg hover:scale-105`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-bold text-gray-800 text-lg mb-1">{title}</h3>
      <span className="inline-block bg-white/70 text-gray-600 text-xs px-3 py-1 rounded-full">
        {count} آگهی
      </span>
    </Link>
  )
}
