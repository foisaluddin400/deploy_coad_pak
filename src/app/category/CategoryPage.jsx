"use client";

import Link from "next/link";
import Image from "next/image";
import banner from "../../../public/category/07.jpg";

import { imageUrl } from "@/redux/Api/baseApi";
import { IoIosArrowForward } from "react-icons/io";
import { useCountry } from "@/hooks/useCountry";
import { Skeleton } from "antd";

import { useGetCategtoryQuery } from "@/redux/Api/categoryApi";
import { useGetCategoryBannerQuery } from "@/redux/Api/bannerApi";
import NoDatafound from "@/components/Nodatafound";

/* ── Skeleton card — matches exact card shape ── */
function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* image area h-40 */}
      <Skeleton.Image
        active
        className="w-full"
        style={{ display: "block" }}
      />
      {/* text + button */}
      <div className="p-4">
        <Skeleton active title={{ width: "100%" }} paragraph={false} />
        <div
          style={{
            marginTop: 16,
            height: 46,
            borderRadius: 8,
            background: "#e2e8f0",
          }}
        />
      </div>
    </div>
  );
}

export default function CategoryPage() {
  const { country, pushWithCountry } = useCountry();
  const handleNavClick = (path, e) => {
    e.preventDefault();
    pushWithCountry(path);
  };
  const { data: bannerData } = useGetCategoryBannerQuery("Category");
  console.log(bannerData);
  const { data, isLoading, isError } = useGetCategtoryQuery();

  console.log(data);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* TOP BANNER */}
      <div className="relative h-[360px] flex items-center justify-center overflow-hidden">
        <Image
          src={banner}
          alt="banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative text-center text-white z-10">
          <div>
            <h1 className="text-6xl font-bold">Categories</h1>
          </div>
          <p className="flex justify-center gap-1 mt-4 items-center text-xl font-semibold">
            {" "}
            Home <IoIosArrowForward className="mt-1" /> Category
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        ) : !data?.data?.length ? (
          <NoDatafound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.data?.map((cat) => (
              <div
                key={cat._id || cat.slug}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={`${imageUrl}/uploads/category-image/${cat.categoryImage}`}
                    alt={cat.categoryName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold">{cat.categoryName}</h2>

                  <Link
                    href={
                      country === "international"
                        ? `/category/${cat.slug}`
                        : `/${country}/category/${cat.slug}`
                    }
                    onClick={(e) => handleNavClick(`/category/${cat.slug}`, e)}
                  >
                    <button className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg">
                      View Listing ({cat.totalBusinessCount || 0})
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}