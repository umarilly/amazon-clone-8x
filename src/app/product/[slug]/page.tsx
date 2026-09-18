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

  const specRows: { label: string; value: string }[] = [
    { label: "Brand", value: product.brand },
    { label: "Color", value: product.color },
    { label: "Material", value: product.material },
    { label: "Connectivity", value: product.connectivity },
    { label: "Item Form", value: product.itemForm },
    { label: "Skin Type", value: product.skinType },
    { label: "Age Range", value: product.ageRange },
    { label: "Format", value: product.format },
    { label: "Language", value: product.language },
    { label: "Genre", value: product.genre },
    { label: "Special Features", value: product.specialFeatures?.join(", ") },
    { label: "Included Components", value: product.includedComponents?.join(", ") },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-6 sm:px-10">
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
            {product.brand && (
              <p className="mt-1 text-sm text-muted">Brand: {product.brand}</p>
            )}
            <div className="mt-2">
              <StarRating
                rating={product.rating}
                reviewCount={product.reviewCount}
                compact={false}
                href="#reviews"
              />
            </div>
          </div>

          {product.discountPercent ? (
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="rounded bg-red-700 px-1.5 py-0.5 text-sm font-bold text-white">
                -{product.discountPercent}%
              </span>
              <p className="text-3xl font-semibold text-foreground">
                {formatPrice(product.price, product.currency)}
              </p>
              <span className="text-sm text-muted line-through">
                {formatPrice(
                  product.price / (1 - product.discountPercent / 100),
                  product.currency
                )}
              </span>
            </div>
          ) : (
            <p className="text-3xl font-semibold text-foreground">
              {formatPrice(product.price, product.currency)}
            </p>
          )}

          <div className="border-t border-gray-200 pt-4">
            <BuyBox product={product} />
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

      {specRows.length > 0 && (
        <section className="max-w-3xl border-t border-gray-200 pt-6">
          <h2 className="mb-3 text-lg font-bold text-foreground">
            Product information
          </h2>
          <dl className="divide-y divide-gray-100 text-sm">
            {specRows.map((row) => (
              <div key={row.label} className="flex gap-4 py-2">
                <dt className="w-40 shrink-0 text-muted">{row.label}</dt>
                <dd className="text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <ReviewsSection reviews={reviews} totalReviewCount={product.reviewCount} />
    </main>
  );
}
