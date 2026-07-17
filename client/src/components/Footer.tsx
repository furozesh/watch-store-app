import { Clock } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white pt-10 pb-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2 col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-semibold">CHRONEX</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                مرجع ساعت‌های لوکس در ایران. ارائه بهترین برندهای جهانی با ضمانت اصالت.
              </p>
              <div className="flex gap-3 mt-6">
                
              </div>
            </div>

            <div>
              <div className="text-sm text-white mb-4">محصـولات</div>
              <div className="flex flex-col gap-3">
                {["مردانه", "زنانه", "یونیسکس",].map((item) => (
                  <a key={item} href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-white mb-4">خدمـات</div>
              <div className="flex flex-col gap-3">
                {["محصولات", "درباره‌ما", "برندها"].map((item) => (
                  <a key={item} href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-white mb-4">برندهـا</div>
              <div className="flex flex-col gap-3">
                {["Rolex", "Casio", "Omega"].map((item) => (
                  <a key={item} href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        
        
          <div className="border-t border-white/10 pt-8 flex flex-col justify-center sm:flex-row items-center gap-4">
            <p className="text-sm">
              Developed with 🩷 by Zahar using Express.js and Next.js
            </p>
          </div>
        </div>
      </footer>
  )
}
