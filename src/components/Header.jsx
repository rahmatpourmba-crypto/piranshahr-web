import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Car, Truck, Phone, List, PlusCircle, CreditCard } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'خانه', icon: Home },
  { to: '/ads', label: 'آگهی‌ها', icon: List },
  { to: '/submit', label: 'ثبت آگهی', icon: PlusCircle, accent: true },
  { to: '/drivers', label: 'رانندگان', icon: Car },
  { to: '/cargo', label: 'حمل بار', icon: Truck },
  { to: '/taxi', label: 'تاکسی', icon: Phone },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm shadow-lg shadow-indigo-500/30">
            🏠
          </div>
          <span className="font-extrabold text-sm text-white hidden sm:block">
            بازارچه <span className="gradient-text">پیرانشهر</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30'
                    : link.accent
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon size={14} />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden glass border-t border-white/5 px-3 py-2 animate-fade-in-up">
          {navLinks.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
                  active ? 'bg-indigo-500/15 text-indigo-400' : link.accent ? 'text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>
                <link.icon size={15} />
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
