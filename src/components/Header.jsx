import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Car, Truck, Phone, List, PlusCircle } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'خانه', icon: Home },
  { to: '/ads', label: 'آگهی‌ها', icon: List },
  { to: '/submit', label: 'ثبت آگهی', icon: PlusCircle, accent: true },
  { to: '/drivers', label: 'رانندگان', icon: Car },
  { to: '/cargo', label: 'حمل بار', icon: Truck },
  { to: '/taxi', label: 'تاکسی', icon: Phone },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-gray-100/80">
      <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white text-sm shadow-lg shadow-gray-300/30">
            🏠
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-[15px] text-gray-900 tracking-tight block leading-tight">بازارچه</span>
            <span className="font-bold text-[11px] text-gray-400 tracking-wide">پیرانشهر</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => {
            const active = loc.pathname === l.to
            return (
              <Link key={l.to} to={l.to}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  active ? 'bg-gray-900 text-white shadow-md shadow-gray-300/30' :
                  l.accent ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' :
                  'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}>
                <l.icon size={15} strokeWidth={2.2} /> {l.label}
              </Link>
            )
          })}
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-3 shadow-2xl animate-fade-up">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl text-[14px] font-semibold transition-all ${
                loc.pathname === l.to ? 'bg-gray-900 text-white' :
                l.accent ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:bg-gray-50'
              }`}>
              <l.icon size={18} strokeWidth={2.2} /> {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
