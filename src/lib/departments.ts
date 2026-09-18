// Matches real Amazon's department dropdown list. Only the ones that match
// a real mock-catalog category actually filter results — the rest are
// included for visual fidelity and will honestly return zero results
// (empty-results state already handles this), since the mock catalog only
// stocks six categories. Flagged as a deliberate scope tradeoff.
export const DEPARTMENTS = [
  "All Departments",
  "Arts & Crafts",
  "Automotive",
  "Baby",
  "Beauty & Personal Care",
  "Books",
  "Boys' Fashion",
  "Computers",
  "Deals",
  "Digital Music",
  "Electronics",
  "Girls' Fashion",
  "Health & Household",
  "Home & Kitchen",
  "Industrial & Scientific",
  "Kindle Store",
  "Luggage",
  "Men's Fashion",
  "Movies & TV",
  "Music, CDs & Vinyl",
  "Pet Supplies",
  "Software",
  "Sports & Outdoors",
  "Tools & Home Improvement",
  "Toys & Games",
  "Video Games",
  "Women's Fashion",
];
