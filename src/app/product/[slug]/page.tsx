import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ImageGallery } from "@/components/product/ImageGallery";
import { BuyBox } from "@/components/product/BuyBox";
import { StarRating } from "@/components/product/StarRating";
import { ReviewsSection } from "@/components/product/ReviewsSection";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { getReviewsForProduct } from "@/lib/reviews";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Amazon Clone`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = getReviewsForProduct(product);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/" className="hover:text-link hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link
          href={`/search?category=${encodeURIComponent(product.category)}`}
          className="hover:text-link hover:underline"
        >
          {product.category}
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[3fr_2fr]">
        <ImageGallery images={product.images} alt={product.name} />

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl font-medium text-foreground sm:text-2xl">
              {product.name}
            </h1>
            <div className="mt-2">
              <StarRating
                rating={product.rating}
                reviewCount={product.reviewCount}
                compact={false}
                href="#reviews"
              />
            </div>
          </div>

          <p className="text-3xl font-semibold text-foreground">
            {formatPrice(product.price, product.currency)}
          </p>

          <div className="border-t border-gray-200 pt-4">
            <BuyBox stock={product.stock} />
          </div>
        </div>
      </div>

      <section className="max-w-3xl border-t border-gray-200 pt-6">
        <h2 className="mb-2 text-lg font-bold text-foreground">
          About this item
        </h2>
        <p className="text-sm leading-relaxed text-foreground">
          {product.description}
        </p>
      </section>

      <ReviewsSection reviews={reviews} totalReviewCount={product.reviewCount} />
    </main>
  );
}
