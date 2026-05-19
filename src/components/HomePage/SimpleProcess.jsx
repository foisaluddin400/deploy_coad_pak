"use client";

import React from "react";
import backImg from "../../../public/Home/bb.png";
import img from "../../../public/Home/mmm.png";

import Image from "next/image";
import Link from "next/link";

const SimpleProcess = () => {
  const steps = [
    {
      number: 1,
      title: "List in Minutes",
      description:
        "Sign up and create your business, asset, or idea listing in a few simple steps.",
    },
    {
      number: 2,
      title: "Get Matched with Serious Buyers",
      description:
        "Connect with verified global buyers and investors actively looking for business opportunities.",
    },
    {
      number: 3,
      title: "Close Directly",
      description:
        "Negotiate and finalize your deal—without brokers or delays.",
    },
  ];

  return (
    <div>
      <section className="py-16">
        <div>
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-blue-500 font-medium mb-2">
              Our Simple Process
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto mb-4">
              Whether you want to sell a business, buy a business, find
              investors, list business assets, promote a franchise, or share
              your business ideas, our process is designed to make everything
              simple and effective. Here&apos;s how it works:
            </p>

            {/* ✅ NEW LINES ADDED */}
           
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-[#FFFFFF] rounded-2xl p-8 py-11 border-2 border-cyan-200 hover:border-cyan-300 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-xl">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
            
          </div>
            <div className="subcribe_text">
           <p className="text-green-600 font-semibold">
              Subscription-based model. No middlemen. No commission fees.
            </p>

            <p className="text-gray-700 mt-2">
              Sell your business without paying
              10–15% commission.
            </p>
        </div>
        </div>
      </section>

      {/* Bottom Section */}
      <div>
        <div
          className="bg-[#0A0D53] grid lg:grid-cols-2 lg:px-11 px-4 py-11 w-full gap-6 text-white bg-cover bg-center lg:h-[60vh] h-auto"
          style={{ backgroundImage: `url(${backImg.src})` }}
        >
          {/* Left side */}
          <div className="flex justify-center items-center">
            <div className="text-center md:text-left">
              <h3 className="md:text-6xl text-4xl pb-4 text-black font-bold">
                ── Start Your{" "}
                <span className="text-[#22C55E]">Business</span> Journey
              </h3>

              <p className="text-black text-xl pt-4">
                Turn your business idea into a success story! Submit your
                listing with a clear description and image ── and let motivated
                buyers discover your opportunity.
              </p>

              <Link href="/auth/login">
                <button className="bg-[#0091FF] md:mt-11 mt-5 mb-5 py-3 px-4 rounded">
                  Create Listing Now
                </button>
              </Link>
            </div>
          </div>

          {/* Right side image */}
          <div className="w-full flex justify-center items-center mt-6 md:mt-0">
            <div className="relative w-full h-[300px] lg:h-[400px]">
              <Image
                src={img}
                alt="Business illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProcess;