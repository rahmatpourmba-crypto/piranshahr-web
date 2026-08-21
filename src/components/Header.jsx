import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Car, Truck, Phone, Info, List, PlusCircle } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'خانه', icon: Home },
  { to: '/ads', label: 'آگهی‌ها', icon: List },
  { to: '/submit', label: 'ثبت آگهی', icon: PlusCircle },
  { to: '/drivers', label: 'رانندگان', icon: Car },
  { to: '/cargo', label: 'حمل بار', icon: Truck },
  { to: '/taxi', label: 'تاکسی', icon: Phone },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-lg shadow-sm">🏠</span>
          <span className="font-extrabold text-base text-gray-900 hidden sm:block">بازارچه پیرانشهر</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <link.icon size={15} />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-3 py-2 shadow-lg">
          {navLinks.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium ${
                  active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
