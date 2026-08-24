import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function AuthModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, login } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password || (isRegister && !name)) { setError('لطفاً همه فیلدها را پر کنید.'); return }
    if (password.length < 6) { setError('رمز عبور حداقل ۶ کاراکتر باشد.'); return }
    setLoading(true)
    try {
      if (isRegister) { await register(email, password, name) }
      else { await login(email, password) }
      onClose()
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError('این ایمیل قبلاً ثبت شده.')
      else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') setError('ایمیل یا رمز اشتباه است.')
      else if (err.code === 'auth/invalid-email') setError('ایمیل معتبر نیست.')
      else setError('خطایی رخ داد. دوباره تلاش کنید.')
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm animate-fade-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-[14px] text-gray-900">{isRegister ? 'ثبت‌نام' : 'ورود'}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          {isRegister && (
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="نام" className="input-field" />
          )}
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ایمیل" dir="ltr" className="input-field text-left" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="رمز عبور" dir="ltr" className="input-field text-left" />
          {error && <p className="text-[12px] text-red-500">{error}</p>}
          <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-[13px] disabled:opacity-50">
            {loading ? '...' : isRegister ? 'ثبت‌نام' : 'ورود'}
          </button>
          <p className="text-center text-[12px] text-gray-400">
            {isRegister ? 'قبلاً ثبت‌نام کرده‌اید؟' : 'حساب ندارید؟'}
            <button type="button" onClick={() => { setIsRegister(!isRegister); setError('') }} className="text-[#A13D4C] font-semibold mr-1">{isRegister ? 'ورود' : 'ثبت‌نام'}</button>
          </p>
        </form>
      </div>
    </div>
  )
}
