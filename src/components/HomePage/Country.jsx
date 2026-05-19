'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { message } from "antd";



import backImg from "../../../public/Home/aaa.png";
import { toast } from "react-toastify";
import { usePostSubscriberMutation } from "@/redux/Api/subscriberApi";
import { useGetTopCountryQuery } from "@/redux/Api/countryApi";


const Country = () => {
  const [addSubscriber] = usePostSubscriberMutation();
  const [email, setEmail] = useState("");
  const { data: countryData } = useGetTopCountryQuery();

  const handleSubscribe = async () => {
    if (!email) {
      return toast.warning("Please enter an email.");
    }

    try {
      const res = await addSubscriber({ email }).unwrap();
      toast.success(res?.message || "Subscribed successfully!");
      setEmail(""); // clear input
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Subscription failed");
    }
  };

  return (
    <div>
      {/* 🔹 Header Section */}
      <div className="flex justify-between items-center mt-20">
        <div className="flex items-center">
          <div className="w-[5px] h-12 rounded-r bg-[#22C55E] mr-4 "></div>
          <div>
            <h2 className="md:text-2xl text-lg font-bold text-blue-500">
              Trending Countries
            </h2>
            <p className="text-gray-600 text-sm max-w-3xl">
              Discover businesses for sale in top global markets including the
              UAE, USA, UK, India, and Australia. Find franchises, startups, and
              investment-ready opportunities in fast-growing economies around
              the world.
            </p>
          </div>
        </div>
        <Link
          href="/search"
          className="text-blue-500 hover:underline text-sm md:text-lg"
        >
          Explore More
        </Link>
      </div>

      {/* 🔹 Country Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-10">
        {countryData?.data?.slice(0, 5).map((country) => (
          <Link key={country?.id} href={`/search?country=${country?.country}`}>
            <div className="relative group overflow-hidden rounded-lg shadow-md">
              <Image
                alt={country?.country}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country?.country}.svg`}
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 shadow-4xl opacity-0 translate-y-32 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <div className="text-center">
                  <p className="text-white font-semibold text-4xl">
                    {country?.totalBusinesses}
                  </p>
                  <p className="text-white text-2xl">Business Available</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 🔹 Subscribe Section */}
      <div
        className="bg-[#0A0D53] lg:text-white mt-20 bg-cover bg-center h-[60vh] flex items-center"
        style={{
          backgroundImage: `url(${backImg.src})`,
        }}
      >
        <div className="w-full">
          <div className="md:grid grid-cols-2">
            <div className="md:pl-20 pl-4">
              <h2 className="md:text-5xl text-3xl pb-4 font-bold text-black">
                Profitable Businesses for{" "}
                <br className="hidden md:block" /> Sale – Buy or Sell with
                Confidence
              </h2>
              <p className="text-black">
                Discover profitable businesses for sale worldwide. Our platform
                connects serious buyers and motivated sellers, offering
                transparent listings and high-return investment opportunities.
                Start building your future with the most trusted business
                marketplace.
              </p>
            </div>

            <div className="md:flex pl-4 md:pl-0 md:pt-0 pt-4 justify-end">
              <div>
                <h5 className="md:text-4xl text-xl font-bold pb-4 text-black">
                  Subscribe Now
                </h5>
                <div className="flex gap-3">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-3 text-black border-black w-full rounded"
                    placeholder="Enter Your Email"
                    type="email"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="bg-[#D97706] px-4 py-2 rounded text-white"
                  >
                    Submit
                  </button>
                </div>
                <p className="text-xl pt-3 text-black">
                  You will receive every news and pro tips
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
