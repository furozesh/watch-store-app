import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
  since?: string;
}

export default function BrandCard({title, image, since }: Props) {
  return (
    <Link href={`/products/brand/${title}`} className="group">
      <div className="bg-[#FFFFFF] border border-border p-6 flex flex-col items-center justify-center gap-2 group hover:border-[#C4A35A] hover:shadow-sm transition-all duration-200 cursor-pointer">
        <div className="text-base tracking-widest text-foreground uppercase group-hover:text-[#C4A35A] transition-colors">{title}</div>
        <div className="text-xs text-muted-foreground">از {since}</div>
      </div>
    </Link>
  );
}