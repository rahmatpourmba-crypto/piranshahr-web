import { Zap, ShieldCheck, Banknote, CarFront } from 'lucide-react'
import TaxiForm from '../components/TaxiForm'
import DriverCard from '../components/DriverCard'
import driversData from '../data/drivers.json'

const features = [
  {
    icon: Zap,
    title: 'سریع و در دسترس',
    desc: 'در هر ساعت از شبانه‌روز، نزدیک‌ترین راننده فعال در چند دقیقه کنار شماست.',
  },
  {
    icon: ShieldCheck,
    title: 'سفر مطمئن',
    desc: 'همه رانندگان دارای مجوز و سوابق بررسی‌شده هستند تا سفری امن را تجربه کنید.',
  },
  {
    icon: Banknote,
    title: 'قیمت منصفانه',
    desc: 'تعرفه‌ها شفاف و از پیش مشخص است؛ بدون هزینه پنهان و چانه‌زنی اضافه.',
  },
]

export default function Taxi() {
  const activeDrivers = driversData.filter(
    (driver) =>
      driver.active &&
      (driver.serviceType === 'taxi' || driver.serviceType === 'both')
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="flex items-center gap-2">
        <span className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
          <CarFront className="w-5 h-5" />
        </span>
        <h1 className="text-2xl font-bold">تاکسی آنلاین پیرانشهر</h1>
      </div>

      <TaxiForm />

      <section>
        <h2 className="text-xl font-bold mb-6">امکانات سرویس</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-2xl p-6 text-center"
            >
              <span className="inline-flex w-12 h-12 rounded-full bg-primary/10 text-primary items-center justify-center mb-4">
                <feature.icon className="w-6 h-6" />
              </span>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-text-light leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-6">رانندگان فعال</h2>
        {activeDrivers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeDrivers.map((driver) => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-light bg-card border border-border rounded-2xl p-8 text-center">
            در حال حاضر راننده فعالی موجود نیست.
          </p>
        )}
      </section>
    </div>
  )
}
