'use client';

import Image from "next/image";
import Header from "@/components/shared/Header";
import React from 'react';

const AboutPage = () => {
  return (
    <div>
      <Header
        title="About Us"
        description="Discover who we are, what we do, and why we're passionate about connecting buyers and sellers around the world."
      />

      <section className="overflow-hidden md:pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Side Image */}
            <div>
              <Image
                src="/about.png"
                alt="About Us"
                width={600}
                height={400}
                className="w-full rounded-2xl object-cover"
              />
            </div>

            {/* Right Side Text */}
            <div>
              <span className=" mb-4 md:text-3xl text-2xl font-semibold text-[#0091FF]">
                About Us ProfitableBusinessesForSale.com (PBFS)
              </span>

              <h2 className="mb-5 md:text-3xl font-bold text-dark text-xl">
                Your Trusted Partner in <span className="text-[#22C55E]">Buying</span> & <span className="text-[#22C55E]">Selling Businesses Online</span>
              </h2>

              <p className="mb-5 text-base text-[#000000]">
                At PBFS <span className="font-semibold">(Profitable Businesses For Sale)</span>, we make it easier than ever for aspiring entrepreneurs, seasoned investors, and business owners to connect in a safe, transparent, and reliable online marketplace. Whether you’re planning to <span className="font-semibold">buy a business, sell your existing business</span>, or explore fresh investment opportunities, PBFS is your step-by-step guide to business success.
              </p>

              <p className="text-[#000000]">
                We understand that buying or selling a business is a big decision. That’s why our platform is designed to simplify the entire process—helping you find the right buyer, the right seller, and the right deal with confidence.
              </p>

              {/* Mission Section */}
              <div className="mt-8 flex items-start gap-5">
                <Image
                  src="/rocket.png"
                  alt="Mission"
                  width={80}
                  height={80}
                  className="rounded-2xl"
                />
                <div>
                  <h3 className="text-2xl font-bold text-[#000000]">Our Mission</h3>
                  <p className="text-base text-[#000000]">
                    Our mission is simple: to <span className="font-semibold">empower entrepreneurs, investors, and business owners</span> by creating a smarter, streamlined way to explore new business opportunities or exit successfully. At PBFS, we believe business ownership should be more <span className="font-semibold">accessible, profitable, and rewarding</span> for everyone.
                  </p>
                </div>
              </div>

              {/* What We Do Section */}
              <div className="mt-8 flex items-start gap-5">
                <Image
                  src="/light.png"
                  alt="What We Do"
                  width={100}
                  height={100}
                  className="rounded-2xl"
                />
                <div>
                  <h3 className="text-2xl font-bold text-[#000000]">What We Do</h3>
                  <p className="text-[#000000]">
                    At ProfitableBusinessesForSale.com, we provide more than just listings—we provide opportunities. Our platform allows:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-[#000000]">
                    <li>Entrepreneurs to <span className="font-semibold">start fresh with the right business.</span></li>
                    <li>Buyers and Investors to <span className="font-semibold">scale their portfolios with profitable businesses.</span></li>
                    <li>Business owners to <span className="font-semibold">successfully sell and maximize returns.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
