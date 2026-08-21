import { Info, ListChecks, AlertTriangle, Phone, MapPin, CreditCard } from 'lucide-react'

const steps = [
  'دسته‌بندی مورد نظر را انتخاب کنید.',
  'آگهی‌ها را مرور کرده و مناسب را باز کنید.',
  'با شماره تماس مستقیماً ارتباط بگیرید.',
  'برای ثبت آگهی از بخش ثبت آگهی استفاده کنید.',
]

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center gap-2">
        <Info size={18} className="text-blue-500" />
        <h1 className="font-extrabold text-lg text-gray-900">درباره بازارچه</h1>
      </div>

      <section className="card p-5 text-sm leading-relaxed text-gray-600 space-y-3">
        <p>بازارچه محلی پیرانشهر یک پلتفرم رایگان برای همشهریان عزیز است تا کالاها و خدمات خود را به سادگی معامله کنند.</p>
        <p>این پروژه با تکیه بر مشارکت مردمی اداره میشود و تمام آگهی‌ها توسط همشهریان ثبت میشود.</p>
      </section>

      <section className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <ListChecks size={16} className="text-blue-500" />
          <h2 className="font-bold text-sm text-gray-900">راهنمای استفاده</h2>
        </div>
        <ol className="space-y-2.5">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center border border-blue-200">{i + 1}</span>
              <span className="text-xs text-gray-600 pt-0.5 leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="card p-5 border border-red-200 bg-red-50/50">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} className="text-red-500" />
          <h2 className="font-bold text-sm text-red-600">سلب مسئولیت</h2>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">این وب‌سایت صرفاً بستر اطلاع‌رسانی محلی است و مسئولیتی در قبال معاملات ندارد.</p>
      </section>

      <section className="card p-5 space-y-2">
        <h2 className="font-bold text-sm text-gray-900">ارتباط با ما</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
            <Phone size={14} className="text-blue-500 shrink-0" />
            <span dir="ltr" className="text-xs font-bold text-gray-700">09143456700</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
            <MapPin size={14} className="text-blue-500 shrink-0" />
            <span className="text-xs font-bold text-gray-700">پیرانشهر</span>
          </div>
        </div>
      </section>

      <section className="card p-5 bg-gradient-to-br from-blue-500 to-orange-500 text-white">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard size={16} />
          <h2 className="font-bold text-sm">حمایت مالی</h2>
        </div>
        <div className="text-xs space-y-1 opacity-90">
          <p>💳 <span dir="ltr" className="font-mono font-bold">6037701616939556</span></p>
          <p>عبدالباسط رحمت پور · بانک صادرات</p>
        </div>
      </section>
    </div>
  )
}
