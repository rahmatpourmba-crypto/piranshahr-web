import { Info, ListChecks, AlertTriangle, Phone, MapPin, CreditCard } from 'lucide-react'

const steps = [
  'دسته‌بندی مورد نظر را انتخاب کنید.',
  'آگهی‌ها را مرور کرده و مناسب را باز کنید.',
  'با شماره تماس مستقیماً ارتباط بگیرید.',
  'برای ثبت آگهی از بخش ثبت آگهی استفاده کنید.',
]

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4 noise-bg">
      <div className="flex items-center gap-2">
        <Info size={18} className="text-indigo-400" />
        <h1 className="font-extrabold text-lg text-white">درباره بازارچه</h1>
      </div>

      <section className="glass rounded-xl p-5 leading-relaxed text-sm text-gray-400 space-y-3">
        <p>
          بازارچه محلی پیرانشهر یک پلتفرم رایگان برای همشهریان عزیز است تا
          کالاها و خدمات خود را به سادگی معامله کنند. هدف ما ایجاد فضایی
          امن، سریع و محلی برای خرید و فروش، معاوضه غذا، استخدام و اطلاع‌رسانی است.
        </p>
        <p>
          این پروژه با تکیه بر مشارکت مردمی اداره میشود. رانندگان و حمل‌کنندگان
          بار نیز میتوانند خدمات خود را ثبت کنند.
        </p>
      </section>

      <section className="glass rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <ListChecks size={16} className="text-indigo-400" />
          <h2 className="font-bold text-sm text-white">راهنمای استفاده</h2>
        </div>
        <ol className="space-y-2.5">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-bold flex items-center justify-center border border-indigo-500/20">
                {i + 1}
              </span>
              <span className="text-xs text-gray-400 pt-0.5 leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="glass rounded-xl p-5 border border-red-500/20">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} className="text-red-400" />
          <h2 className="font-bold text-sm text-red-400">سلب مسئولیت</h2>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          این وب‌سایت صرفاً بستر اطلاع‌رسانی محلی است و مسئولیتی در قبال معاملات ندارد.
        </p>
      </section>

      <section className="glass rounded-xl p-5 space-y-2">
        <h2 className="font-bold text-sm text-white">ارتباط با ما</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5">
            <Phone size={14} className="text-indigo-400 shrink-0" />
            <span dir="ltr" className="text-xs font-medium text-gray-300">09143456700</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5">
            <MapPin size={14} className="text-indigo-400 shrink-0" />
            <span className="text-xs font-medium text-gray-300">پیرانشهر</span>
          </div>
        </div>
      </section>

      <section className="glass rounded-xl p-5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard size={16} className="text-indigo-400" />
          <h2 className="font-bold text-sm text-white">حمایت مالی</h2>
        </div>
        <div className="text-xs space-y-1 text-gray-400">
          <p>💳 <span dir="ltr" className="font-mono font-bold text-gray-300">6037701616939556</span></p>
          <p>عبدالباسط رحمت پور · بانک صادرات</p>
        </div>
      </section>
    </div>
  )
}
