import Image from 'next/image'
import HeroSection2 from "../../../public/Image/back2.png"
import Link from 'next/link'
export default function HeroSection() {
  return (
    
    <section className='relative h-[calc(100vh-110px)] overflow-hidden'>
        <Image
            src={HeroSection2}
            alt=""
            fill
            className="object-cover object-left"
        />
        
      <div className='relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center'>
        <div className='max-w-2xl'>
            <span className='text-sm text-gray-300'>مجموعه منتخب ۱۴۰۵</span>
            <h1 className='mt-6 lg:text-5xl md:text-2xl text-lg font-bold text-white'>
              برندهای محبوب
              <br />
              <p className='text-white mt-5'>انتخابی <span className='text-[#C4A35A]'>ماندگــــار</span></p>
            </h1>
            <p className='mt-8 text-base text-gray-200 max-w-xl'>
                چرونکس مجموعه‌ای از ساعت‌های کلاسیک، هوشمند و اسپرت
                از معتبرترین برندهای جهان را با ضمانت اصالت و ارسال سریع
                در اختیار شما قرار می‌دهد.
            </p>
            <div className='flex gap-5 mt-10'>
              <Link href={'/products'} className='px-8 py-4 bg-white text-black font-semibold hover:bg-gray-200 transition'>مشاهده محصولات</Link>
              <Link href={'/about-us'} className='px-8 py-4 border border-white text-white hover:border-[#C4A35A] transition'>درباره ما</Link>
            </div>
        </div>
      </div>
    </section>
  )
}
