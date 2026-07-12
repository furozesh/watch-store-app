import BrandCard from "./BrandCard";
import { brands } from "@/types/brands";

export default function BrandsSection() {
  return (
    <section className="bg-[#EAE8E3] lg:py-24 py-10">
      <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#C4A35A] text-sm font-medium">برندها</span>
            <h2 className="text-2xl font-bold text-[#0D1B2A] mt-2">برندهای معتبر جهانی</h2>
            <p className="text-[#6B7280] text-sm mt-3 max-w-md mx-auto">
              تمامی محصولات دارای گواهی اصالت و ضمانت‌نامه معتبر هستند
            </p>
          </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <BrandCard
              key={brand.title}
              title={brand.title}
              image={brand.image}
              since={brand.since}
            />
          ))}
        </div>
      </div>
    </section>
  );
}