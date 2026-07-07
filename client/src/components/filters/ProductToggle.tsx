'use client'

import useProductFilters from "@/hooks/useProductFilter"
import { Switch } from "../ui/switch"

export default function ProductToggle() {
    const {inStock , discount , updateParam} = useProductFilters()
  return (
    <div className="flex flex-col gap-5 rounded-xl border p-5 bg-white shadow-sm w-72">
      <div className="flex items-center justify-between">
        <span>فقط کالاهای موجود</span>

        <Switch
          dir="ltr"
          checked={inStock === "true"}
          onCheckedChange={(checked) =>
            updateParam(
              "inStock",
              checked ? "true" : ""
            )
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <span>فقط کالاهای تخفیف‌دار</span>

        <Switch
          dir="ltr"
          checked={discount === "true"}
          onCheckedChange={(checked) =>
            updateParam(
              "discount",
              checked ? "true" : ""
            )
          }
        />
      </div>


    </div>
  )
}
