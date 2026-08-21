import { Info, ListChecks, AlertTriangle, Phone, MapPin, CreditCard } from 'lucide-react'

const steps = [
  'دسته‌بندی مورد نظر را انتخاب کنید.',
  'آگهی‌ها را مرور کرده و مناسب را باز کنید.',
  'با شماره تماس مستقیماً ارتباط بگیرید.',
  'برای ثبت آگهی خود، از ربات تلگرام استفاده کنید.',
]

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">
      <div className="flex items-center gap-2">
        <Info size={18} className="text-blue-600" />
        <h1 className="font-extrabold text-lg text-gray-900">درباره بازارچه</h1>
      </div>

      <section className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-sm leading-relaxed text-gray-600 space-y-3">
        <p>
          بازارچه محلی پیرانشهر یک پلتفرم رایگان برای همشهریان عزیز است تا
          کالاها و خدمات خود را به سادگی با یکدیگر معامله کنند. هدف ما ایجاد
          فضایی امن، سریع و محلی برای خرید و فروش، معاوضه غذا، استخدام و اطلاع‌رسانی
          گمشده و پیداشده است.
        </p>
        <p>
          این پروژه با تکیه بر مشارکت مردمی اداره می‌شود و تمام آگهی‌ها توسط
          همشهریان ثبت می‌شود. رانندگان تاکسی و حمل‌کنندگان بار نیز می‌توانند
          خدمات خود را ثبت کنند.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <ListChecks size={16} className="text-blue-600" />
          <h2 className="font-bold text-sm">راهنمای استفاده</h2>
        </div>
        <ol className="space-y-2">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                {i + 1}
              </span>
              <span className="text-xs text-gray-600 pt-0.5 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} className="text-red-600" />
          <h2 className="font-bold text-sm text-red-700">سلب مسئولیت</h2>
        </div>
        <p className="text-xs text-red-600/80 leading-relaxed">
          این وب‌سایت صرفاً یک بستر اطلاع‌رسانی محلی است و مسئولیتی در قبال
          صحت آگهی‌ها یا معاملات ندارد. پیش از هر معامله از هویت طرف مقابل اطمینان حاصل کنید.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-2">
        <h2 className="font-bold text-sm">ارتباط با ما</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5">
            <Phone size={14} className="text-blue-600 shrink-0" />
            <span dir="ltr" className="text-xs font-medium">09143456700</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5">
            <MapPin size={14} className="text-blue-600 shrink-0" />
            <span className="text-xs font-medium">پیرانشهر</span>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard size={16} />
          <h2 className="font-bold text-sm">حمایت مالی</h2>
        </div>
        <div className="text-xs space-y-1 opacity-90">
          <p>💳 <span dir="ltr" className="font-mono font-bold">6037701616939556</span></p>
          <p>عبدالباسط رحمت پور | بانک صادرات</p>
        </div>
      </section>
    </div>
  )
}
