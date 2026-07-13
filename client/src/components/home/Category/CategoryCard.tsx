import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  label: string;
  sub: string;
  keyName: string;
  url: string
}

export default function CategoryCard({
  label,
  sub,
  keyName,
  url
}: Props) {
  return (
    <Link href={`/products/category/${keyName}`}>
      <div className="group relative overflow-hidden h-105 cursor-pointer">
        <Image src={url} fill alt="" className="object-cover"/>
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-8">
          <h3 className="text-2xl font-bold text-white">{label}</h3>
          <div className="flex items-center gap-2 mt-3 text-[#C4A35A] font-normal group-hover:gap-4 transition-all">
            مشاهده مجموعه
            <ArrowLeft size={18}/>
          </div>
        </div>
      </div>
    </Link>
  );
}