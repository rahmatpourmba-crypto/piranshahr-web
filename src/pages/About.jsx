import {
  Info,
  ListChecks,
  AlertTriangle,
  Send,
  Phone,
  MapPin,
  CreditCard,
} from 'lucide-react'

const steps = [
  'دسته‌بندی مورد نظر خود را از صفحه اصلی انتخاب کنید.',
  'آگهی‌ها را مرور کرده و آگهی مناسب را باز کنید.',
  'با شماره تماس آگهی‌دهنده مستقیماً در ارتباط باشید.',
  'برای نمایش کالا یا خدمات خود، آگهی رایگان ثبت کنید.',
]

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center gap-2">
        <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Info className="w-5 h-5" />
        </span>
        <h1 className="text-2xl font-bold">درباره بازارچه محلی پیرانشهر</h1>
      </div>

      <section className="bg-card border border-border rounded-2xl p-6 space-y-4 leading-relaxed">
        <p>
          بازارچه محلی پیرانشهر یک پلتفرم رایگان برای همشهریان عزیز است تا
          کالاها و خدمات خود را به سادگی با یکدیگر معامله کنند. هدف ما ایجاد
          فضایی امن، سریع و محلی برای خرید و فروش، معاوضه غذا، استخدام، اطلاع‌رسانی
          گمشده و پیداشده و اعلام نوبت‌های خالی است.
        </p>
        <p>
          این پروژه با تکیه بر مشارکت مردمی اداره می‌شود؛ تمام آگهی‌ها توسط
          همشهریان ثبت می‌شود و ارتباط خریدار و فروشنده به‌صورت مستقیم و بدون
          واسطه انجام می‌گیرد. همچنین رانندگان تاکسی و حمل‌کننگان بار می‌توانند
          در بخش‌های مربوطه ثبت‌نام کرده و خدمات خود را به شهروندان ارائه دهند.
        </p>
        <p>
          امیدواریم این بازارچه کوچک، گامی برای سهولت زندگی روزمره مردم شریف
          پیرانشهر باشد. نظرات و پیشنهادهای خود را از طریق ربات تلگرام یا راه‌های
          ارتباطی زیر با ما در میان بگذارید.
        </p>
      </section>

      <section className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <ListChecks className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold">راهنمای استفاده</h2>
        </div>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                {(index + 1).toLocaleString('fa-IR')}
              </span>
              <span className="text-sm leading-relaxed pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-danger/5 border border-danger/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-danger" />
          <h2 className="text-lg font-bold text-danger">سلب مسئولیت</h2>
        </div>
        <p className="text-sm leading-relaxed">
          این وب‌سایت تنها یک بستر اطلاع‌رسانی محلی است و هیچ مسئولیتی در قبال
          صحت آگهی‌ها، کیفیت کالا و خدمات، یا معاملات انجام‌شده میان کاربران
          ندارد. لطفاً پیش از هر معامله، از اصالت کالا و هویت طرف مقابل اطمینان
          حاصل کنید و از پرداخت وجه به افراد ناشناس خودداری نمایید.
        </p>
      </section>

      <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold">ارتباط با ما</h2>
        <a
          href="https://t.me/PiranshahrBazaarBot"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl bg-[#229ED9]/10 text-[#1c7fb0] hover:bg-[#229ED9]/20 transition"
        >
          <Send className="w-5 h-5" />
          <span className="text-sm font-medium">
            ربات تلگرام بازارچه: ‎@PiranshahrBazaarBot
          </span>
        </a>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-bg">
            <Phone className="w-5 h-5 text-primary shrink-0" />
            <span dir="ltr" className="text-sm font-medium">
              09143456700
            </span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-bg">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm font-medium">
              پیرانشهر، آذربایجان غربی
            </span>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-l from-primary to-secondary-dark text-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5" />
          <h2 className="text-lg font-bold">حمایت مالی از بازارچه</h2>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            شماره کارت:{' '}
            <span dir="ltr" className="font-bold tracking-widest select-all">
              6037701616939556
            </span>
          </p>
          <p>به نام: عبدالباسط رحمت پور</p>
          <p>بانک صادرات</p>
        </div>
      </section>
    </div>
  )
}
