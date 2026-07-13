import { categories } from "@/types/categories";
import CategoryCard from "./CategoryCard";

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-[#F6F5F2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="text-sm text-[#C4A35A]">دسته‌بندی</span>
          <h2 className="text-2xl text-[#0D1B2A] font-bold mt-3">بر اساس جنسیت</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.key}
              keyName={category.key}
              label={category.label}
              sub={category.sub}
              url={category.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}