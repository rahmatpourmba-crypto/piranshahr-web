import { useState, useEffect } from 'react'
import { X, LogOut, Trash2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getUserAds, deleteAd } from '../lib/ads'

export default function ProfileModal({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  const [myAds, setMyAds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && user) {
      setLoading(true)
      getUserAds(user.uid).then(ads => { setMyAds(ads); setLoading(false) }).catch(() => setLoading(false))
    }
  }, [isOpen, user])

  if (!isOpen) return null

  const handleDelete = async (adId) => {
    if (!confirm('آیا از حذف این آگهی مطمئن هستید؟')) return
    await deleteAd(adId)
    setMyAds(prev => prev.filter(a => a.id !== adId))
  }

  const handleLogout = async () => { await logout(); onClose() }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm max-h-[85vh] overflow-y-auto animate-fade-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h3 className="font-semibold text-[14px] text-gray-900">پروفایل</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
        </div>
        <div className="p-5">
          <div className="text-center mb-5">
            <div className="w-14 h-14 rounded-full bg-[#A13D4C] text-white flex items-center justify-center text-xl font-bold mx-auto mb-2">
              {user?.displayName?.[0] || user?.email?.[0] || '?'}
            </div>
            <p className="font-semibold text-[14px] text-gray-900">{user?.displayName || 'کاربر'}</p>
            <p className="text-[12px] text-gray-400" dir="ltr">{user?.email}</p>
          </div>

          <div className="flex items-center justify-center gap-6 mb-5">
            <div className="text-center">
              <p className="font-bold text-[16px] text-[#A13D4C]">{myAds.length}</p>
              <p className="text-[11px] text-gray-400">آگهی</p>
            </div>
          </div>

          {loading ? (
            <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="skeleton h-12" />)}</div>
          ) : myAds.length > 0 ? (
            <div className="space-y-2 mb-4">
              {myAds.map(ad => (
                <div key={ad.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[13px] text-gray-900 truncate">{ad.title}</p>
                    <p className="text-[11px] text-gray-400">{ad.category} · {ad.city}</p>
                  </div>
                  <button onClick={() => handleDelete(ad.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[13px] text-gray-400 py-4">هنوز آگهی ثبت نکرده‌اید.</p>
          )}

          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <LogOut size={14} /> خروج از حساب
          </button>
        </div>
      </div>
    </div>
  )
}
