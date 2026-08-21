import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

export default function PayIrCallback() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const st = searchParams.get('status')
    const id = searchParams.get('id')
    const mobile = searchParams.get('mobile')

    if (st === 'ok' && id) {
      setStatus('success')
      setMessage(`پرداخت با شماره پیگیر ${id} تأیید شد.`)
    } else {
      setStatus('error')
      setMessage('پرداخت تأیید نشد. دوباره تلاش کنید.')
    }
  }, [searchParams])

  return (
    <div className="container max-w-md py-24 text-center">
      {status === 'loading' && <p className="text-gray-400 text-[14px]">در حال بررسی پرداخت...</p>}
      {status === 'success' && (
        <>
          <div className="text-3xl mb-4">✓</div>
          <h1 className="font-bold text-[18px] text-gray-900 mb-2">پرداخت موفق</h1>
          <p className="text-[13px] text-gray-400 mb-6">{message}</p>
        </>
      )}
      {status === 'error' && (
        <>
          <div className="text-3xl mb-4">✕</div>
          <h1 className="font-bold text-[18px] text-gray-900 mb-2">خطا</h1>
          <p className="text-[13px] text-gray-400 mb-6">{message}</p>
        </>
      )}
      <Link to="/" className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-800 transition-colors">
        بازگشت به خانه
      </Link>
    </div>
  )
}
