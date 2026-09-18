import { HeroCarousel, type Slide } from "./HeroCarousel";
import { PersonalizedCard } from "./PersonalizedCard";
import { DealCard, AppPromoCard, PrimeVideoCard, HomeGridCard } from "./PromoCards";
import type { Product } from "@/lib/types";

interface CategoryGroup {
  category: string;
  products: Product[];
}

// Real amazon.com uses 3 slides, each with its own background tint suited
// to that slide's product photo (purple, green, warm/multicolor — sampled
// live from the real site), not one fixed gradient reused for every slide.
const SLIDE_TINTS = ["#d9b8ec", "#b9e3cc", "#f2ddc4"];

export function HeroBanner({
  productsByCategory,
}: {
  productsByCategory: CategoryGroup[];
}) {
  const allProducts = productsByCategory.flatMap((g) => g.products);
  const discounted = allProducts.filter((p) => p.discountPercent);
  const dealProduct =
    discounted.length > 0
      ? discounted.reduce((max, p) =>
          (p.discountPercent ?? 0) > (max.discountPercent ?? 0) ? p : max
        )
      : allProducts[0];

  const homeGroup =
    productsByCategory.find((g) => g.category === "Home & Kitchen") ??
    productsByCategory[0];

  const personalizedTiles = productsByCategory
    .filter((g) => g.category !== dealProduct.category && g.category !== homeGroup.category)
    .slice(0, 3)
    .map((g) => g.products[0]);

  const appPromoGroup =
    productsByCategory.find((g) => g.category === "Sports & Outdoors") ??
    productsByCategory[productsByCategory.length - 1];
  const primeVideoGroup =
    productsByCategory.find((g) => g.category === "Toys & Games") ??
    productsByCategory[productsByCategory.length - 2];

  const slides: Slide[] = productsByCategory.slice(0, 3).map((group, i) => {
    const best = [...group.products].sort(
      (a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0)
    )[0];
    return {
      title: `${group.category} shopping spree`,
      subtitle: best.discountPercent ? `Up to ${best.discountPercent}% off` : "New arrivals",
      detail: "Top brands. Wide selection. While supplies last.",
      image: best.images[0],
      gradientFrom: SLIDE_TINTS[i % SLIDE_TINTS.length],
    };
  });

  return (
    <section className="flex flex-col bg-[#eaeded]">
      <HeroCarousel slides={slides} />

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-6 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <PersonalizedCard tileProducts={personalizedTiles} />
          <DealCard
            category={dealProduct.category}
            maxDiscount={dealProduct.discountPercent ?? 10}
            image={dealProduct.images[0]}
          />
          <AppPromoCard image={appPromoGroup.products[1]?.images[0] ?? appPromoGroup.products[0].images[0]} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-8 sm:px-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
          <PrimeVideoCard
            image={primeVideoGroup.products[2]?.images[0] ?? primeVideoGroup.products[0].images[0]}
          />
          <HomeGridCard
            heading={`Revamp your space | ${homeGroup.category}`}
            href={`/search?category=${encodeURIComponent(homeGroup.category)}`}
            products={homeGroup.products}
          />
        </div>
      </div>
    </section>
  );
}
