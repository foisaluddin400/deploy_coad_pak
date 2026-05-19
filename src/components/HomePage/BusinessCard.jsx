"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import backCard from "../../../public/Home/ii.png";
import {
  useGetAllBusinessHomeQuery,
  useGetAllBusinessMostViewQuery,
  useGetAllFeturesBusinessQuery,
  useGetMostViewBusinessIdeaQuery,
} from "@/redux/Api/businessApi";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import { imageUrl } from "@/redux/Api/baseApi";

// Splide Slider Import
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useCountry } from "@/hooks/useCountry";
import Cookies from "js-cookie";

// Ant Design Skeleton
import { Skeleton } from "antd";

/* ─────────────────────────────────────────────
   Skeleton Card — matches existing card layout
───────────────────────────────────────────── */
function CardSkeleton() {
  return (
    <div
      className="border border-[#0091FF] rounded overflow-hidden"
      style={{ background: "#f9fafb" }}
    >
      {/* Image placeholder — same h-48 as real cards */}
      <Skeleton.Image
        active
        style={{ width: "100%", height: "192px", display: "block" }}
      />
      {/* Content placeholder */}
      <div className="p-4">
        <Skeleton active paragraph={{ rows: 3 }} />
        <div
          style={{
            marginTop: 16,
            height: 36,
            width: 110,
            borderRadius: 6,
            background: "#e2e8f0",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Skeleton slide set — renders N placeholder
   slides inside the existing Splide slider
───────────────────────────────────────────── */
function SkeletonSlides({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SplideSlide key={i}>
          <CardSkeleton />
        </SplideSlide>
      ))}
    </>
  );
}

const BusinessCard = () => {
  const selectedCountry = Cookies.get("selectedCountry") || "international";
  const searchParams = useSearchParams();

  const { country, pushWithCountry } = useCountry();
  const handleNavClick = (path, e) => {
    e.preventDefault();
    pushWithCountry(path);
  };
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
  const role = profileData?.data?.role;
  const id = profileData?.data?._id;

  const { data: interestData, isLoading: loadingInterest } =
    useGetAllFeturesBusinessQuery({
      businessRole: "Seller",
      country: selectedCountry,
    });

  const { data: interestDataa, isLoading: loadingInterestA } =
    useGetAllFeturesBusinessQuery({
      businessRole: "Asset Seller",
      country: selectedCountry,
    });
  console.log(interestDataa);

  const { data: interestDataaa, isLoading: loadingInterestAA } =
    useGetAllFeturesBusinessQuery({
      businessRole: "Francise Seller",
      country: selectedCountry,
    });

  const { data: interestDataaaa, isLoading: loadingInterestAAA } =
    useGetMostViewBusinessIdeaQuery({
      country: selectedCountry,
    });
  console.log(interestDataaaa);

  const {
    data: businessData,
    isLoading,
    isError,
  } = useGetAllBusinessHomeQuery();

  const { data: MostbusinessData, isLoading: loadingMost } =
    useGetAllBusinessMostViewQuery({
      userId: id,
      role: role,
      country: selectedCountry,
    });

  const mostBusiness = MostbusinessData?.data || [];
  console.log(mostBusiness);
  const isBrowser =
    typeof window !== "undefined" && typeof localStorage !== "undefined";
  const hasAccessToken = isBrowser ? localStorage.getItem("accessToken") : null;

 
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load businesses
      </p>
    );

  const business = businessData?.data || [];

  // Common Splide options for all sections
  const splideOptions = {
    type: "slide",
    perPage: 4,
    perMove: 1,
    gap: "1.5rem",
    pagination: false,
    arrows: true,
    breakpoints: {
      1280: { perPage: 3 },
      1024: { perPage: 3 },
      768: { perPage: 2 },
      640: { perPage: 1 },
    },
  };
  console.log(interestData);
  return (
    <>
      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-box">
            <h3 className="stat-number">3000+</h3>
            <p className="stat-text">active buyers</p>
          </div>

          <div className="stat-box">
            <h3 className="stat-number">35+</h3>
            <p className="stat-text">countries covered</p>
          </div>

          <div className="stat-box">
            <h3 className="stat-number">120+</h3>
            <p className="stat-text">deals facilitated</p>
          </div>
        </div>
      </div>

      <div className="lg:mt-16 mt-11">
        {/*================ Popular Businesses Section ================*/}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-[5px] h-12 rounded-r bg-[#22C55E] mr-4"></div>
              <div>
                <h2 className="md:text-2xl text-lg font-bold text-blue-500">
                  Popular Businesses
                </h2>
                <p className="text-gray-600 text-sm md:max-w-3xl">
                  Buy a business that&apos;s built for success. Explore the most
                  profitable and popular businesses for sale in the UAE, USA,
                  UK, Australia, India, and beyond.
                </p>
              </div>
            </div>
            <Link
              href={
                country === "international"
                  ? "/business/business-for-sale"
                  : `/ ${country}/business/business-for-sale`
              }
              className="text-blue-500 hover:underline text-sm md:text-lg"
              onClick={(e) => handleNavClick("/business/business-for-sale", e)}
            >
              Explore More
            </Link>
          </div>

          <Splide
            options={splideOptions}
            aria-label="Popular Businesses Slider"
          >
            {loadingMost ? (
              <SkeletonSlides count={4} />
            ) : mostBusiness?.length > 0 ? (
              mostBusiness.map((business) => (
                <SplideSlide
                  className="border border-[#0091FF] bg-cover bg-center rounded"
                  key={business._id}
                  style={{ backgroundImage: `url(${backCard.src})` }}
                >
                  <div className=" ">
                    <div className="h-48 relative">
                      <Image
                        src={
                          business?.image?.length > 0
                            ? `${imageUrl}/Uploads/business-image/${business?.image}`
                            : "/fallback-image.jpg"
                        }
                        alt={business?.title}
                        className="w-full h-full object-cover rounded-t"
                        width={400}
                        height={192}
                        priority={false}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {business?.title}
                      </h3>
                      <div className="mt-2 bg-[#2b9de9ef] text-sm inline-block rounded px-2 py-0.5 text-white">
  <span>{business?.countryName}</span>

  {business?.city && business.city !== "undefined" && (
    <>
      <span className="mx-1">,</span>
      <span>{business.city}</span>
    </>
  )}
</div>
                      <p className="text-gray-600 mb-2">{business?.location}</p>
                      <div className="mb-2">
                        <span className="text-blue-500">
                          {business?.category?.categoryName}
                        </span>{" "}
                        ||{" "}
                        <span className="text-[#D97706]">
                          {business?.subCategory?.name}
                        </span>
                      </div>





                      <p className="text-gray-800 mb-4">
                        Asking Price :{" "}
                        <span className="font-semibold">
                          {business?.askingPrice}
                        </span>
                      </p>
                      <p className="text-gray-800 mb-4">
                        Price :{" "}
                        <span className="font-semibold">
                          ${business?.price}
                        </span>
                      </p>
                      <Link
                        href={
                          country === "international"
                            ? `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
                            : `/${country}/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
                        }
                        onClick={(e) =>
                          handleNavClick(
                            `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`,
                            e,
                          )
                        }
                      >
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </SplideSlide>
              ))
            ) : (
              <SplideSlide>
                <p className="text-center text-gray-500 py-10">No data found</p>
              </SplideSlide>
            )}
          </Splide>
        </div>

        {/*================ Featured Businesses Section ================*/}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-[5px] h-12 rounded-r bg-[#22C55E] mr-4"></div>
              <div>
                <h2 className="md:text-2xl text-lg font-bold text-blue-500">
                  Featured Businesses
                </h2>
                <p className="text-gray-600 text-sm max-w-3xl">
                  Discover verified and high-performing businesses for sale
                  across multiple industries.
                </p>
              </div>
            </div>
            <Link
              href={
                country === "international"
                  ? "/business/featured-businessess-for-sale"
                  : `/ ${country}/business/featured-businessess-for-sale`
              }
              className="text-blue-500 hover:underline text-sm md:text-lg"
              onClick={(e) =>
                handleNavClick("/business/featured-businessess-for-sale", e)
              }
            >
              Explore More
            </Link>
          </div>

          <Splide
            options={splideOptions}
            aria-label="Featured Businesses Slider"
          >
            {loadingInterest ? (
              <SkeletonSlides count={4} />
            ) : interestData?.data?.length > 0 ? (
              interestData.data.map((business) => (
                <SplideSlide
                  className="border border-[#0091FF] bg-cover bg-center rounded"
                  style={{ backgroundImage: `url(${backCard.src})` }}
                  key={business._id}
                >
                  <div>
                    <div className="h-48 relative">
                      <Image
                        src={`${imageUrl}/Uploads/business-image/${business?.image}`}
                        alt={business?.title}
                        className="w-full h-full object-cover rounded-t"
                        width={400}
                        height={192}
                        priority={false}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {business?.title}
                      </h3>
                    <div className="mt-2 bg-[#2b9de9ef] text-sm inline-block rounded px-2 py-0.5 text-white">
  <span>{business?.countryName}</span>

  {business?.city && business.city !== "undefined" && (
    <>
      <span className="mx-1">,</span>
      <span>{business.city}</span>
    </>
  )}
</div>
                      <p className="text-gray-600 mb-2">{business?.location}</p>
                      <div className="mb-2">
                        <span className="text-blue-500">
                          {business?.category?.categoryName}
                        </span>{" "}
                        ||{" "}
                        <span className="text-[#D97706]">
                          {business?.subCategory?.name}
                        </span>
                      </div>



                      <p className="text-gray-800 mb-4">
                        Asking Price :{" "}
                        <span className="font-semibold">
                          {business?.askingPrice}
                        </span>
                      </p>
                      <p className="text-gray-800 mb-4">
                        Price :{" "}
                        <span className="font-semibold">
                          ${business?.price}
                        </span>
                      </p>

                      <Link
                        href={
                          country === "international"
                            ? `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
                            : `/${country}/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
                        }
                        onClick={(e) =>
                          handleNavClick(
                            `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`,
                            e,
                          )
                        }
                      >
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </SplideSlide>
              ))
            ) : (
              <SplideSlide>
                <p className="text-center text-gray-500 py-10">No data found</p>
              </SplideSlide>
            )}
          </Splide>
        </div>

        {/*================ Featured Business Assets Section ================*/}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-[5px] h-12 rounded-r bg-[#22C55E] mr-4"></div>
              <div>
                <h2 className="md:text-2xl text-lg font-bold text-blue-500">
                  Featured Business Assets
                </h2>
                <p className="text-gray-600 text-sm max-w-3xl">
                  Find business assets for sale including equipment, licenses,
                  brands, and intellectual property.
                </p>
              </div>
            </div>
            <Link
              href={
                country === "international"
                  ? "/business/featured-business-assets-for-sale"
                  : `/ ${country}/business/featured-business-assets-for-sale`
              }
              className="text-blue-500 hover:underline text-sm md:text-lg"
              onClick={(e) =>
                handleNavClick("/business/featured-business-assets-for-sale", e)
              }
            >
              Explore More
            </Link>
          </div>

          <Splide options={splideOptions} aria-label="Business Assets Slider">
            {loadingInterestA ? (
              <SkeletonSlides count={4} />
            ) : interestDataa?.data?.length > 0 ? (
              interestDataa.data.map((business) => (
                <SplideSlide
                  className="border border-[#0091FF] bg-cover bg-center rounded"
                  style={{ backgroundImage: `url(${backCard.src})` }}
                  key={business._id}
                >
                  <div>
                    <div className="h-48 relative">
                      <Image
                        src={`${imageUrl}/Uploads/business-image/${business?.image}`}
                        alt={business?.title}
                        className="w-full h-full object-cover rounded-t"
                        width={400}
                        height={192}
                        priority={false}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {business?.title}
                      </h3>

                  <div className="mt-2 bg-[#2b9de9ef] text-sm inline-block rounded px-2 py-0.5 text-white">
  <span>{business?.countryName}</span>

  {business?.city && business.city !== "undefined" && (
    <>
      <span className="mx-1">,</span>
      <span>{business.city}</span>
    </>
  )}
</div>
                      <p className="text-gray-600 mb-2">{business?.location}</p>
                      <div className="mb-2">
                        <span className="text-blue-500">
                          {business?.category?.categoryName}
                        </span>{" "}
                        ||{" "}
                        <span className="text-[#D97706]">
                          {business?.subCategory?.name}
                        </span>
                      </div>






                      <p className="text-gray-800 mb-4">
                        Asking Price :{" "}
                        <span className="font-semibold">
                          {business?.askingPrice}
                        </span>
                      </p>
                      <p className="text-gray-800 mb-4">
                        Price :{" "}
                        <span className="font-semibold">
                          ${business?.price}
                        </span>
                      </p>
                      <Link
                        href={
                          country === "international"
                            ? `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
                            : `/${country}/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
                        }
                        onClick={(e) =>
                          handleNavClick(
                            `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`,
                            e,
                          )
                        }
                      >
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </SplideSlide>
              ))
            ) : (
              <SplideSlide>
                <p className="text-center text-gray-500 py-10">No data found</p>
              </SplideSlide>
            )}
          </Splide>
        </div>

        {/*================ Featured Franchises Section ================*/}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-[5px] h-12 rounded-r bg-[#22C55E] mr-4"></div>
              <div>
                <h2 className="md:text-2xl text-lg font-bold text-blue-500">
                  Featured Franchises
                </h2>
                <p className="text-gray-600 text-sm max-w-3xl">
                  Explore franchise opportunities from trusted global brands.
                </p>
              </div>
            </div>
            <Link
              href={
                country === "international"
                  ? "/business/featured-franchises-for-sale"
                  : `/ ${country}/business/featured-franchises-for-sale`
              }
              className="text-blue-500 hover:underline text-sm md:text-lg"
              onClick={(e) =>
                handleNavClick("/business/featured-franchises-for-sale", e)
              }
            >
              Explore More
            </Link>
          </div>

          <Splide options={splideOptions} aria-label="Franchises Slider">
            {loadingInterestAA ? (
              <SkeletonSlides count={4} />
            ) : interestDataaa?.data?.length > 0 ? (
              interestDataaa.data.map((business) => (
                <SplideSlide
                  className="border border-[#0091FF] bg-cover bg-center rounded"
                  style={{ backgroundImage: `url(${backCard.src})` }}
                  key={business._id}
                >
                  <div>
                    <div className="h-48 relative">
                      <Image
                        src={`${imageUrl}/Uploads/business-image/${business?.image}`}
                        alt={business?.title}
                        className="w-full h-full object-cover rounded-t"
                        width={400}
                        height={192}
                        priority={false}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {business?.title}
                      </h3>
                    <div className="mt-2 bg-[#2b9de9ef] text-sm inline-block rounded px-2 py-0.5 text-white">
  <span>{business?.countryName}</span>

  {business?.city && business.city !== "undefined" && (
    <>
      <span className="mx-1">,</span>
      <span>{business.city}</span>
    </>
  )}
</div>
                      <p className="text-gray-600 mb-2">{business?.location}</p>
                      <div className="mb-2">
                        <span className="text-blue-500">
                          {business?.category?.categoryName}
                        </span>{" "}
                        ||{" "}
                        <span className="text-[#D97706]">
                          {business?.subCategory?.name}
                        </span>
                      </div>






                      <p className="text-gray-800 mb-4">
                        Asking Price :{" "}
                        <span className="font-semibold">
                          {business?.askingPrice}
                        </span>
                      </p>
                      <p className="text-gray-800 mb-4">
                        Price :{" "}
                        <span className="font-semibold">
                          ${business?.price}
                        </span>
                      </p>
                      <Link
                        href={
                          country === "international"
                            ? `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
                            : `/${country}/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
                        }
                        onClick={(e) =>
                          handleNavClick(
                            `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`,
                            e,
                          )
                        }
                      >
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </SplideSlide>
              ))
            ) : (
              <SplideSlide>
                <p className="text-center text-gray-500 py-10">No data found</p>
              </SplideSlide>
            )}
          </Splide>
        </div>

        {/*================ Business Ideas (Investor Only) Section ================*/}
        {(!hasAccessToken || (hasAccessToken && role === "Investor")) && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-[5px] h-12 rounded-r bg-[#22C55E] mr-4"></div>
                <div>
                  <h2 className="md:text-2xl text-lg font-bold text-blue-500">
                    Business Ideas (Investor - Only Listings)
                  </h2>
                  <p className="text-gray-600 text-sm max-w-3xl">
                    Browse innovative business ideas and startup concepts
                    submitted by aspiring entrepreneurs.
                  </p>
                </div>
              </div>
              <Link
                href={
                  country === "international"
                    ? "/business/featured-business-ideas-for-sale"
                    : `/ ${country}/business/featured-business-ideas-for-sale`
                }
                className="text-blue-500 hover:underline text-sm md:text-lg"
                onClick={(e) =>
                  handleNavClick(
                    "/business/featured-business-ideas-for-sale",
                    e,
                  )
                }
              >
                Explore More
              </Link>
            </div>

            <Splide options={splideOptions} aria-label="Business Ideas Slider">
              {loadingInterestAAA ? (
                <SkeletonSlides count={4} />
              ) : interestDataaaa?.data?.length > 0 ? (
                interestDataaaa.data.map((business) => (
                  <SplideSlide
                    className="border border-[#0091FF] bg-cover bg-center rounded"
                    style={{ backgroundImage: `url(${backCard.src})` }}
                    key={business._id}
                  >
                    <div>
                      <div className="h-48 relative">
                        <Image
                          src={`${imageUrl}/Uploads/business-image/${business?.image}`}
                          alt={business?.title}
                          className="w-full h-full object-cover rounded-t"
                          width={400}
                          height={192}
                          priority={false}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {business?.title}
                        </h3>
                     <div className="mt-2 bg-[#2b9de9ef] text-sm inline-block rounded px-2 py-0.5 text-white">
  <span>{business?.countryName}</span>

  {business?.city && business.city !== "undefined" && (
    <>
      <span className="mx-1">,</span>
      <span>{business.city}</span>
    </>
  )}
</div>       
<p className="text-gray-600 mb-2">
                          {business?.location}
                        </p>
                        <div className="mb-2">
                          <span className="text-blue-500">
                            {business?.category?.categoryName}
                          </span>{" "}
                          ||{" "}
                          <span className="text-[#D97706]">
                            {business?.subCategory?.name}
                          </span>
                        </div>






                        <p className="text-gray-800 mb-4">
                          Asking Price :{" "}
                          <span className="font-semibold">
                            {business?.askingPrice}
                          </span>
                        </p>
                        <p className="text-gray-800 mb-4">
                          Price :{" "}
                          <span className="font-semibold">
                            ${business?.price}
                          </span>
                        </p>
                        <Link
                          href={
                            country === "international"
                              ? `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
                              : `/${country}/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
                          }
                          onClick={(e) =>
                            handleNavClick(
                              `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`,
                              e,
                            )
                          }
                        >
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </SplideSlide>
                ))
              ) : (
                <SplideSlide>
                  <p className="text-center text-gray-500 py-10">
                    No data found
                  </p>
                </SplideSlide>
              )}
            </Splide>
          </div>
        )}
      </div>
    </>
  );
};

export default BusinessCard;