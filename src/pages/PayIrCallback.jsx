import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

const PAYIR_API_KEY = '' // فردا توکن را اینجا قرار دهید

export default function PayIrCallback() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    const statusParam = searchParams.get('status')

    if (!token) {
      setStatus('error')
      setMessage('توکن پرداخت یافت نشد')
      return
    }

    if (statusParam !== 'OK') {
      setStatus('error')
      setMessage('پرداخت انجام نشد یا لغو شد')
      return
    }

    if (!PAYIR_API_KEY) {
      setStatus('success')
      setMessage('پرداخت با موفقیت انجام شد (درگاه هنوز فعال نشده)')
      return
    }

    const verify = async () => {
      try {
        const res = await fetch('https://pay.ir/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api: PAYIR_API_KEY, token }),
        })
        const data = await res.json()
        if (data.status === 1) {
          setStatus('success')
          setMessage(`پرداخت موفق! شماره پیگیر: ${data.refId}`)
        } else {
          setStatus('error')
          setMessage('خطا در تأیید پرداخت')
        }
      } catch {
        setStatus('error')
        setMessage('خطا در اتصال به سرور')
      }
    }

    verify()
  }, [searchParams])

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center noise-bg">
      {status === 'loading' && (
        <>
          <Loader2 size={48} className="text-indigo-400 animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-400">در حال تأیید پرداخت...</p>
        </>
      )}
      {status === 'success' && (
        <>
          <div className="text-6xl mb-4 animate-float">✅</div>
          <h1 className="font-extrabold text-xl text-emerald-400 mb-2">پرداخت موفق!</h1>
          <p className="text-sm text-gray-400 mb-6">{message}</p>
          <Link to="/" className="btn-primary text-sm px-6 py-2.5">بازگشت به خانه</Link>
        </>
      )}
      {status === 'error' && (
        <>
          <div className="text-6xl mb-4">❌</div>
          <h1 className="font-extrabold text-xl text-red-400 mb-2">خطا در پرداخت</h1>
          <p className="text-sm text-gray-400 mb-6">{message}</p>
          <Link to="/" className="btn-primary text-sm px-6 py-2.5">بازگشت به خانه</Link>
        </>
      )}
    </div>
  )
}
