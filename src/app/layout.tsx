import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { getCategories } from "@/lib/products";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amazon Clone",
  description: "A 24-hour take-home clone of the Amazon.com shopping experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const categories = getCategories();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <Header />
        <CategoryNav categories={categories} />
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t border-gray-200 px-4 py-6 text-center text-sm text-muted sm:px-6">
          Amazon Clone — a 24-hour take-home demo. Not affiliated with
          Amazon.com. All products, prices, and reviews are mock data.
        </footer>
      </body>
    </html>
  );
}
