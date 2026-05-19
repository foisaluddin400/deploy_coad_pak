"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import { imageUrl } from "@/redux/Api/baseApi";
import { useCountry } from "@/hooks/useCountry";
import { Skeleton } from "antd";
import { useGetTopCategtoryQuery } from "@/redux/Api/categoryApi";
0
/* ── Skeleton card — matches the exact h-[280px] card shape ── */
function CategoryCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg" style={{ height: 280 }}>
      <Skeleton.Image
        active
        style={{ width: "100%", height: "280px", display: "block" }}
      />
      {/* bottom text lines overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "24px",
          background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
        }}
      >
        <Skeleton
          active
          title={{ width: "60%", style: { marginBottom: 8, background: "#ffffff55" } }}
          paragraph={{ rows: 1, width: "40%", style: { background: "#ffffff33" } }}
          style={{ marginBottom: 0 }}
        />
      </div>
    </div>
  );
}

const Category = () => {
  const { country, pushWithCountry } = useCountry();
  console.log(country);
  const handleNavClick = (path, e) => {
    e.preventDefault();
    pushWithCountry(path);
  };
  const { data: categorie, isLoading, isError } = useGetTopCategtoryQuery();

  if (isError) return <p>Failed to load categories.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mt-20">
        <div className="flex items-center">
          <div className="w-[5px] h-12 rounded-r bg-[#22C55E] mr-4"></div>

          <div>
            <h2 className="md:text-2xl text-lg font-bold text-blue-500">
              Top Rated Category
            </h2>

            <p className="text-gray-600 text-sm max-w-3xl">
              Buy a business that&apos;s built for success.
            </p>
          </div>
        </div>

        <Link
          href={
            country === "international" ? "/category" : `/${country}/category`
          }
          onClick={(e) => handleNavClick("/category", e)}
          className="text-blue-500 hover:underline text-sm md:text-lg"
        >
          Explore More
        </Link>
      </div>

      <div className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))
            : categorie?.data?.map((item) => (
                <div
                  key={item?.category?._id}
                  className="block group relative overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
                >
                  <div className="relative h-[280px] w-full">
                    <Image
                      src={`${imageUrl}/uploads/category-image/${item?.category?.image}`}
                      alt={item?.category?.categoryName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      25vw"
                      priority
                    />

                    <div className="absolute inset-0 bg-black/40"></div>

                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white transition-all duration-500 transform translate-y-16 group-hover:translate-y-0">
                      <h3 className="text-2xl font-bold mb-1">
                        {item?.category?.categoryName}
                      </h3>

                      <p className="text-sm font-medium mb-3">
                        {item?.totalBusinesses} Business Available
                      </p>

                      <p className="text-sm opacity-90">
                        Explore profitable listings and business opportunities in
                        this category.
                      </p>

                      <Link
                        href={
                          country === "international"
                            ? `/category/${item?.category?.slug}`
                            : `/${country}/category/${item?.category?.slug}`
                        }
                        onClick={(e) =>
                          handleNavClick(`/category/${item?.category?.slug}`, e)
                        }
                      >
                        <button className="bg-[#2766FF] w-9 flex justify-center h-9 items-center rounded-full mt-2">
                          <FaArrowRight />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Category;