import type { Product, Review } from "./types";

const AUTHORS = [
  "Jordan M.",
  "Casey R.",
  "Amina K.",
  "Priya S.",
  "Liam T.",
  "Sofia G.",
  "Noah B.",
  "Emma L.",
  "Daniel V.",
  "Grace H.",
];

const REVIEW_TEMPLATES: Record<number, { title: string; body: string }[]> = {
  5: [
    {
      title: "Exceeded expectations",
      body: "This is exactly what I was looking for, and the quality is even better than the photos suggest. Would buy again without hesitation.",
    },
    {
      title: "Worth every penny",
      body: "Arrived quickly and works perfectly. I've been using it regularly and haven't had a single issue.",
    },
    {
      title: "Couldn't be happier",
      body: "Packaging was solid, setup was painless, and it performs exactly as described. Highly recommend.",
    },
  ],
  4: [
    {
      title: "Really solid, minor nitpicks",
      body: "Does what it's supposed to do well. A couple of small design choices I'd change, but overall very satisfied.",
    },
    {
      title: "Good value for the price",
      body: "Not perfect, but for what it costs it's hard to complain. Would recommend to a friend.",
    },
    {
      title: "Happy with this purchase",
      body: "Works as expected. Only took off a star because delivery took a bit longer than estimated.",
    },
  ],
  3: [
    {
      title: "Does the job, nothing special",
      body: "It's fine. Gets the job done but I was expecting a bit more given the description.",
    },
    {
      title: "Mixed feelings",
      body: "Some things about it are great, others feel like an afterthought. Middle of the road overall.",
    },
  ],
  2: [
    {
      title: "Below expectations",
      body: "Had some quality control issues out of the box. Customer support was responsive at least.",
    },
  ],
};

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function relativeDate(daysAgo: number): string {
  if (daysAgo < 30) return `${daysAgo} days ago`;
  const months = Math.round(daysAgo / 30);
  return months <= 1 ? "1 month ago" : `${months} months ago`;
}

export function getReviewsForProduct(product: Product, count = 3): Review[] {
  const seed = hashString(product.id);
  const baseRating = Math.min(5, Math.max(2, Math.round(product.rating)));
  const jitterOptions = [0, -1, 0, 1];
  const usedTitles = new Set<string>();

  return Array.from({ length: count }, (_, i) => {
    const offsetSeed = seed + i * 17;
    const jitter = i === 0 ? 0 : jitterOptions[offsetSeed % jitterOptions.length];
    const rating = Math.min(5, Math.max(2, baseRating + jitter));
    const templates = REVIEW_TEMPLATES[rating] ?? REVIEW_TEMPLATES[3];

    let template = templates[(offsetSeed + i) % templates.length];
    for (let attempt = 1; usedTitles.has(template.title) && attempt < templates.length; attempt++) {
      template = templates[(offsetSeed + i + attempt) % templates.length];
    }
    usedTitles.add(template.title);

    const author = AUTHORS[(offsetSeed + i * 7) % AUTHORS.length];
    const daysAgo = 5 + ((offsetSeed + i * 13) % 180);

    return {
      id: `${product.id}-review-${i}`,
      author,
      rating,
      date: relativeDate(daysAgo),
      title: template.title,
      body: template.body,
    };
  });
}
