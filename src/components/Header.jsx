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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm shadow-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white text-sm shadow-md shadow-blue-200">
            🏠
          </div>
          <span className="font-extrabold text-sm hidden sm:block">
            بازارچه <span className="text-blue-600">پیرانشهر</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((l) => {
            const active = loc.pathname === l.to
            return (
              <Link key={l.to} to={l.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  active ? 'bg-blue-50 text-blue-600' :
                  l.accent ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' :
                  'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}>
                <l.icon size={14} /> {l.label}
              </Link>
            )
          })}
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-3 py-2 shadow-lg animate-fade-up">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium ${
                loc.pathname === l.to ? 'bg-blue-50 text-blue-600' :
                l.accent ? 'text-orange-600' : 'text-gray-500 hover:bg-gray-50'
              }`}>
              <l.icon size={16} /> {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
