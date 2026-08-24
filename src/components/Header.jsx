import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Search, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const LOGO_SVG = (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#A13D4C"/>
    <path d="M10 10h12v2.5h-2v7.5c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5V12.5H10V10z" fill="white"/>
  </svg>
)

const NAV_LINKS = [
  ['/ads', 'آگهی‌ها'],
  ['/drivers', 'رانندگان'],
  ['/cargo', 'حمل بار'],
  ['/taxi', 'تاکسی'],
]

export default function Header({ onOpenAuth, onOpenProfile }) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const loc = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/ads?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="container h-14 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          {LOGO_SVG}
          <span className="font-bold text-[14px] text-gray-900 tracking-tight hidden sm:block">پیرانشهرمارکت</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-2 hidden sm:block">
          <div className="relative">
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="جستجوی آگهی..." className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-9 pl-4 py-2 text-[13px] text-gray-700 outline-none focus:border-[#A13D4C] focus:bg-white transition-colors" />
          </div>
        </form>

        <nav className="hidden md:flex items-center gap-1 mr-auto">
          {NAV_LINKS.map(([to, label]) => (
            <Link key={to} to={to} className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${loc.pathname === to ? 'bg-[#A13D4C] text-white' : 'text-gray-500 hover:text-gray-900'}`}>{label}</Link>
          ))}
        </nav>

        <Link to="/submit" className="hidden md:flex items-center bg-[#A13D4C] text-white px-4 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-[#8B2635] transition-colors flex-shrink-0">
          + ثبت آگهی
        </Link>

        <button onClick={() => user ? onOpenProfile?.() : onOpenAuth?.()}
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 border border-gray-200 hover:border-[#A13D4C] transition-colors flex-shrink-0">
          {user ? (
            <span className="text-[13px] font-bold text-[#A13D4C]">{user.displayName?.[0] || user.email?.[0]}</span>
          ) : (
            <User size={16} className="text-gray-400" />
          )}
        </button>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 ml-auto">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2">
          <form onSubmit={handleSearch} className="sm:hidden">
            <div className="relative">
              <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="جستجو..." className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-9 pl-4 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#A13D4C] transition-colors" />
            </div>
          </form>
          {NAV_LINKS.map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              className={`block py-2.5 px-3 rounded-lg text-[14px] font-medium ${loc.pathname === to ? 'bg-[#A13D4C] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>{label}</Link>
          ))}
          <Link to="/submit" onClick={() => setOpen(false)} className="block py-2.5 px-3 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">ثبت آگهی</Link>
          <button onClick={() => { user ? onOpenProfile?.() : onOpenAuth?.(); setOpen(false) }}
            className="block w-full text-right py-2.5 px-3 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
            {user ? `${user.displayName || 'پروفایل'}` : 'ورود / ثبت‌نام'}
          </button>
        </div>
      )}
    </header>
  )
}
