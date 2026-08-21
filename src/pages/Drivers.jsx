import { useState } from 'react'
import { UserPlus, Users, X } from 'lucide-react'
import DriverCard from '../components/DriverCard'
import RegisterForm from '../components/RegisterForm'
import driversData from '../data/drivers.json'

const FILTERS = [
  { key: 'all', label: 'همه' },
  { key: 'taxi', label: 'تاکسی' },
  { key: 'cargo', label: 'حمل بار' },
  { key: 'both', label: 'هر دو' },
]

export default function Drivers() {
  const [filter, setFilter] = useState('all')
  const [showRegister, setShowRegister] = useState(false)

  const filteredDrivers =
    filter === 'all'
      ? driversData
      : driversData.filter((driver) => driver.serviceType === filter)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Users className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-bold">رانندگان پیرانشهر</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowRegister(true)}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-xl px-4 py-2.5 text-sm font-medium transition"
        >
          <UserPlus className="w-4 h-4" />
          ثبت‌نام راننده
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === item.key
                ? 'bg-primary text-white shadow'
                : 'bg-card text-text-light border border-border hover:border-primary hover:text-primary'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filteredDrivers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <Users className="w-14 h-14 text-text-light/50" />
          <p className="text-lg font-semibold">راننده‌ای یافت نشد</p>
          <p className="text-sm text-text-light">
            دسته‌بندی دیگری را انتخاب کنید.
          </p>
        </div>
      )}

      {showRegister && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowRegister(false)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowRegister(false)}
              aria-label="بستن"
              className="absolute top-3 left-3 w-8 h-8 rounded-full bg-bg text-text-light hover:text-danger flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            <RegisterForm type="driver" />
          </div>
        </div>
      )}
    </div>
  )
}
