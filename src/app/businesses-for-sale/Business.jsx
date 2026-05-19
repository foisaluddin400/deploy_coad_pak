"use client";
import Image from "next/image";
import Link from "next/link";

import hero from "../../../public/Home/hero.png";
import Hero from "@/components/HomePage/Hero";
import BusinessCard from "@/components/HomePage/BusinessCard";
import Category from "@/components/HomePage/Category";
import Country from "@/components/HomePage/Country";
import SimpleProcess from "@/components/HomePage/SimpleProcess";
import Review from "@/components/HomePage/Review";
import { Suspense } from "react";

const Business = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pb-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={hero}
            alt="Business meeting background"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 py-20 md:py-32 lg:py-40 container mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Buy, Sell & Invest in{" "}
              <span className="text-[#22C55E]">Business</span>, Franchises,
              Assets & Business Ideas
              <span className="text-[#0091FF]"> Worldwide</span>
            </h1>

            <p className="text-white text-lg mb-8">
              Connect with serious buyers, sellers, brokers, investors,
              franchisors, and business idea listers on{" "}
              <span className="font-semibold">
                ProfitableBusinessesForSale.com
              </span>{" "}
              — the trusted marketplace that helps you grow.
            </p>

            <Link href="/auth/login">
              <button className="bg-[#0091FF] hover:bg-blue-600 text-white px-8 py-3 rounded text-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Suspense fallback={<p>loading..</p>}>
        <Hero></Hero>
      </Suspense>
      <div className="container m-auto lg:px-4 px-4">
        <Suspense fallback={<p>loading..</p>}>
          <BusinessCard></BusinessCard>
          <Category></Category>
          <Country></Country>
          <SimpleProcess></SimpleProcess>
          <Review></Review>
        </Suspense>
      </div>
    </main>
  );
};

export default Business;
