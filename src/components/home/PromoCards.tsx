import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

export function DealCard({
  category,
  maxDiscount,
  image,
}: {
  category: string;
  maxDiscount: number;
  image: string;
}) {
  const href = `/search?category=${encodeURIComponent(category)}`;
  return (
    <div className="flex h-full min-h-[420px] w-full flex-col gap-3 bg-white p-5">
      <p className="text-[18px] font-bold text-foreground">
        Up to {maxDiscount}% off | {category} clearance store
      </p>
      <Link href={href} className="relative min-h-[180px] flex-1 overflow-hidden bg-gray-50">
        <Image src={image} alt="" fill sizes="330px" className="object-cover" />
      </Link>
      <Link href={href} className="text-[12px] font-medium text-link hover:underline">
        See more
      </Link>
    </div>
  );
}

export function AppPromoCard({ image }: { image: string }) {
  return (
    <div className="flex h-full min-h-[420px] w-full flex-col gap-3 bg-white">
      <div className="flex flex-col gap-2 p-5 pb-0">
        <p className="text-[18px] font-bold text-foreground">Shop on Amazon Clone</p>
        <p className="text-[13px] text-foreground">
          Fast, convenient, and built for this demo, everything in one place.
        </p>
        <Link href="/" className="text-[12px] font-medium text-link hover:underline">
          Continue shopping
        </Link>
      </div>
      <div className="relative min-h-[140px] flex-1 overflow-hidden">
        <Image src={image} alt="" fill sizes="330px" className="object-cover" />
      </div>
    </div>
  );
}

export function PrimeVideoCard({ image }: { image: string }) {
  return (
    <Link
      href="/"
      className="relative flex h-full min-h-[420px] w-full flex-col justify-between overflow-hidden bg-white p-8 text-white"
    >
      <Image src={image} alt="" fill sizes="700px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <p className="relative z-10 text-[21px] font-bold">
        Prime Video Recommendation for you
      </p>
      <p className="relative z-10 text-[13px] text-gray-200">
        Start watching on Prime
      </p>
    </Link>
  );
}

export function HomeGridCard({
  heading,
  href,
  products,
}: {
  heading: string;
  href: string;
  products: Product[];
}) {
  const tiles = products.slice(0, 4);
  return (
    <div className="flex h-full min-h-[420px] w-full flex-col gap-3 bg-white p-5">
      <p className="text-[18px] font-bold text-foreground">{heading}</p>
      <div className="grid grid-cols-2 gap-2.5">
        {tiles.map((p) => (
          <Link key={p.id} href={href} className="flex flex-col gap-2">
            <div className="relative aspect-[150/118] w-full overflow-hidden bg-gray-50">
              <Image src={p.images[0]} alt="" fill sizes="150px" className="object-cover" />
            </div>
            <span className="text-[13px] text-foreground">{p.name}</span>
          </Link>
        ))}
      </div>
      <Link href={href} className="mt-auto text-[12px] font-medium text-link hover:underline">
        See more
      </Link>
    </div>
  );
}
