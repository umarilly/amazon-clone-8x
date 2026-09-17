import Image from "next/image";
import { slugify } from "@/components/layout/CategoryNav";
import type { Product } from "@/lib/types";

interface CategoryTeaser {
  category: string;
  product: Product;
}

export function HeroBanner({ teasers }: { teasers: CategoryTeaser[] }) {
  return (
    <section className="flex flex-col gap-4 bg-gray-100 px-4 pb-6 pt-4 sm:px-6">
      <div className="relative mx-auto aspect-[16/6] w-full max-w-6xl overflow-hidden rounded-lg sm:aspect-[16/5]">
        <Image
          src="https://picsum.photos/seed/hero-banner/1600/500"
          alt="Seasonal deals across every category"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1152px"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black/50 via-black/10 to-transparent">
          <div className="max-w-md px-6 text-white sm:px-10">
            <h1 className="text-2xl font-bold sm:text-4xl">
              Deals across every aisle
            </h1>
            <p className="mt-2 text-sm text-gray-200 sm:text-base">
              Fresh picks in electronics, home, books, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
        {teasers.map(({ category, product }) => (
          <a
            key={category}
            href={`#${slugify(category)}`}
            className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="text-base font-bold text-foreground">
              Shop {category}
            </h2>
            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-50">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 640px) 45vw, 220px"
                className="object-cover"
              />
            </div>
            <span className="text-sm text-link hover:underline">
              See more
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
