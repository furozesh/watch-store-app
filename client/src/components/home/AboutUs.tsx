import React from 'react'

export default function AboutUs() {
  return (
    <section className="py-24 bg-[#0D1B2A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">

            {/* Text */}
            <div>
                <span className="text-[#C4A35A] text-sm font-medium"> دربــاره مــا </span>
                <h2 className="text-3xl lg:text-4xl font-bold mt-3 mb-6 leading-tight">
                    جایی برای انتخاب <br />
                   بهتــرین ساعــت‌ها
                </h2>
                <p className="text-white/60 text-sm text-justify mb-6">
                    Chronex مجموعه‌ای از ساعت‌های کلاسیک، هوشمند و اسپرت را گرد هم آورده تا
                    بتوانید بدون سردرگمی، ساعت مناسب سبک زندگی خود را پیدا کنید.
                </p>
                <p className="text-white/60 text-sm  text-justify mb-10">
                    ما باور داریم ساعت فقط وسیله‌ای برای نمایش زمان نیست؛
                    بخشی از استایل و شخصیت هر فرد است.
                    به همین دلیل تلاش کرده‌ایم تجربه‌ای ساده، سریع و لذت‌بخش برای انتخاب
                    ساعت فراهم کنیم.
                </p>
                <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
                    {[
                        {
                            value: "۵۰۰+",
                            label: "محصول متنوع",
                        },
                        {
                            value: "۱۰",
                            label: "برند معتبر",
                        },
                        {
                            value: "۲۴/۷",
                            label: "پشتیبانی",
                        },
                    ].map((item) => (
                    <div key={item.label} className="flex flex-col justify-between items-center">
                        <div className="text-xl font-bold text-[#C4A35A]">
                        {item.value}
                        </div>

                        <div className="text-white/50 text-xs mt-1">
                        {item.label}
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* Image */}
            <div className="relative">
                <div className="bg-white/5 border border-white/10 p-1">
                    <img
                        src="/Image/aboutus.png"
                        alt="Chronex"
                        className="w-full h-80 lg:h-96 object-cover opacity-70"
                    />
                </div>
            </div>

        </div>
    </section>
  )
}
