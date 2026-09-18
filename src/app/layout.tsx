import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import { LocationProvider, LanguageProvider } from "@/lib/preferences";
import "./globals.css";

// Amazon Ember is a proprietary Amazon brand font with no licensed web
// distribution available to this project — Roboto is used as the closest
// self-hosted, guaranteed-to-render substitute (both are neutral humanist
// grotesks with similar x-height/proportions), rather than naming
// "Amazon Ember" in CSS and silently falling back to whatever the
// viewer's OS happens to have installed.
const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Amazon Clone",
  description: "A 24-hour take-home clone of the Amazon.com shopping experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${roboto.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <AuthProvider>
          <LanguageProvider>
            <LocationProvider>
              <CartProvider>
                <Header />
                <CategoryNav />
                <div className="flex flex-1 flex-col">{children}</div>
                <Footer />
              </CartProvider>
            </LocationProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
