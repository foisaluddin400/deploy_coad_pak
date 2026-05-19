import { Suspense } from "react";

import Hero from "@/components/HomePage/Hero";
import BusinessCard from "@/components/HomePage/BusinessCard";
import Category from "@/components/HomePage/Category";
import Country from "@/components/HomePage/Country";
import Review from "@/components/HomePage/Review";
import SimpleProcess from "@/components/HomePage/SimpleProcess";
export const metadata = {
  title: "Most Trusted Platform to Buy or Sell a Business in UAE | PBFS",
  description:
    "Buy or Sell Profitable businesses in UAE with PBFS. Explore verified businesses for sale, connect with trusted brokers, and close deals confidently. ",
  keywords: [
    "Best website to sell a business, Profitable Business For Sale Dubai",
  ],

  // Canonical
  alternates: {
    canonical: "https://profitablebusinessesforsale.com/",
  },

  // Open Graph (Facebook & LinkedIn)
  openGraph: {
    type: "website",
    url: "https://profitablebusinessesforsale.com/",
    title: "Most Trusted Platform to Buy or Sell a Business in UAE | PBFS",
    description:
      "Buy or Sell Profitable businesses in UAE with PBFS. Explore verified businesses for sale, connect with trusted brokers, and close deals confidently. ",
    images: [
      "https://profitablebusinessesforsale.com/_next/static/media/logo2.e768ec83.png",
    ],
    siteName: "Profitable Businesses For Sale",
  },

  // Twitter Meta Tags
  twitter: {
    card: "summary_large_image",
    domain: "profitablebusinessesforsale.com",
    url: "https://profitablebusinessesforsale.com/",
    title: "Most Trusted Platform to Buy or Sell a Business in UAE | PBFS",
    description:
      "Buy or Sell Profitable businesses in UAE with PBFS. Explore verified businesses for sale, connect with trusted brokers, and close deals confidently. ",
    images:
      "https://profitablebusinessesforsale.com/_next/static/media/logo2.e768ec83.png",
  },

  // Schema Markup (JSON-LD)
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Profitable Businesses For Sale",
      alternateName: "PBFS",
      url: "https://profitablebusinessesforsale.com/",
      logo: "https://profitablebusinessesforsale.com/_next/static/media/logo2.e768ec83.png",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61574246301031",
        "https://www.instagram.com/profitablebusinessesforsale",
      ],
    }),
  },
};

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div />}>
        <Hero />
      </Suspense>

      <div className="container m-auto lg:px-4 px-4">
        <Suspense fallback={<div />}>
          <BusinessCard />
        </Suspense>

        <Suspense fallback={<div />}>
          <Category />
        </Suspense>

        <Suspense fallback={<div />}>
          <Country />
        </Suspense>

        <Suspense fallback={<div />}>
          <SimpleProcess />
        </Suspense>

        <Suspense fallback={<div />}>
          <Review />
        </Suspense>
      </div>
    </main>
  );
}
