import { useState } from 'react'
import { X, Phone, MapPin } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const FREE_CATEGORIES = ['رایگان', 'گمشده', 'پیداشده']

function formatPrice(price) {
  if (!price || price === 'توافقی') return 'توافقی'
  return `${Number(price).toLocaleString('fa-IR')} تومان`
}

function timeAgo(date) {
  if (!date) return ''
  const now = Date.now()
  const diff = now - (date.seconds ? date.seconds * 1000 : new Date(date).getTime())
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'همین الان'
  if (mins < 60) return `${mins} دقیقه پیش`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} ساعت پیش`
  const days = Math.floor(hrs / 24)
  return `${days} روز پیش`
}

export default function AdDetailModal({ ad, isOpen, onClose }) {
  const [showPhone, setShowPhone] = useState(false)
  const { user } = useAuth()

  if (!isOpen || !ad) return null

  const isFree = FREE_CATEGORIES.includes(ad.category)

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto animate-fade-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <span className="text-[12px] bg-[#FDF2F3] text-[#A13D4C] px-2.5 py-0.5 rounded-full font-medium">{ad.category}</span>
            <span className="text-[12px] text-gray-400 flex items-center gap-1"><MapPin size={11} /> {ad.city}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
        </div>

        <div className="p-5">
          <h2 className="font-bold text-[17px] text-gray-900 mb-2 leading-[1.6]">{ad.title}</h2>
          <p className="font-bold text-[18px] text-[#A13D4C] mb-3">{formatPrice(ad.price)}</p>
          <p className="text-[13px] text-gray-500 leading-[2] mb-5">{ad.description}</p>

          <div className="text-[11px] text-gray-400 mb-4">{timeAgo(ad.createdAt)}</div>

          <div className="bg-gray-50 rounded-xl p-4 text-center">
            {showPhone || isFree ? (
              <>
                <a href={`tel:${ad.phone}`} className="font-mono text-xl font-bold text-gray-900 block mb-3" dir="ltr">{ad.phone}</a>
                <p className="text-[11px] text-gray-400">با کلیک روی شماره تماس بگیرید</p>
              </>
            ) : (
              <>
                <div className="font-mono text-[19px] font-bold text-gray-300 mb-3 tracking-widest" dir="ltr">۰۹۱۲ ••• ••••</div>
                <button onClick={() => setShowPhone(true)}
                  className="w-full btn-primary py-3 text-[13px] flex items-center justify-center gap-2">
                  <Phone size={14} /> مشاهده شماره تماس
                </button>
                <p className="text-[11px] text-gray-400 mt-2">شماره تماس رایگان نمایش داده میشود</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
