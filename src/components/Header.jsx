import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="container h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-[15px] text-gray-900 tracking-tight">پیرانشهرمارکت</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link to="/ads" className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${loc.pathname === '/ads' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}>آگهی‌ها</Link>
          <Link to="/drivers" className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${loc.pathname === '/drivers' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}>رانندگان</Link>
          <Link to="/cargo" className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${loc.pathname === '/cargo' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}>حمل بار</Link>
          <Link to="/taxi" className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${loc.pathname === '/taxi' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}>تاکسی</Link>
          <Link to="/submit" className="ml-1 bg-gray-900 text-white px-4 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-gray-800 transition-colors">+ ثبت آگهی</Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {[['/ads','آگهی‌ها'],['/drivers','رانندگان'],['/cargo','حمل بار'],['/taxi','تاکسی'],['/about','درباره ما']].map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              className={`block py-2 px-3 rounded-lg text-[14px] font-medium ${loc.pathname === to ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>{label}</Link>
          ))}
          <Link to="/submit" onClick={() => setOpen(false)} className="block py-2 px-3 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">ثبت آگهی</Link>
        </nav>
      )}
    </header>
  )
}
