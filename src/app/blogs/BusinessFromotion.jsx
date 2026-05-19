'use client';

import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";

import Link from "next/link";
import { imageUrl } from "@/redux/Api/baseApi";
import Image from "next/image";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useCountry } from "@/hooks/useCountry";
import { Skeleton } from "antd";

import { useGetAllFormateQuery } from "@/redux/Api/blogsApi";
import NoDatafound from "@/components/Nodatafound";

/* ── Skeleton Card ── */
function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 h-full flex flex-col">
      <Skeleton.Image
        active
        style={{ width: "100%", height: "240px", display: "block" }}
      />
      <div className="p-6 flex-1 flex flex-col gap-3">
        <Skeleton active title={{ width: "80%" }} paragraph={{ rows: 1 }} />
        <div
          style={{
            marginTop: "auto",
            height: 46,
            borderRadius: 8,
            background: "#e2e8f0",
          }}
        />
      </div>
    </div>
  );
}

const LIMIT = 10;

const BusinessFormationPage = () => {
  const { country, pushWithCountry } = useCountry();

  const handleNavClick = (path, e) => {
    e.preventDefault();
    pushWithCountry(path);
  };

  const selectedCountry =
    Cookies.get("selectedCountry") || "international";

  const [page, setPage] = React.useState(1);
  const [allData, setAllData] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const loaderRef = React.useRef(null);

  const { data, isLoading, isError } = useGetAllFormateQuery({
    page,
    limit: LIMIT,
  });

  // merge data
  useEffect(() => {
    if (!data?.data) return;

    if (page === 1) {
      setAllData(data.data);
    } else {
      setAllData((prev) => [...prev, ...data.data]);
    }

    if (data.data.length < LIMIT) {
      setHasMore(false);
    }
  }, [data, page]);

  // infinite scroll observer
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMore]);

  const createSlug = (title) => {
    return title
      ?.toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  if (isError)
    return <p>Failed to load business formation data.</p>;

  return (
    <div className="container mx-auto px-5 pt-20 pb-10">

      {/* Header */}
      <div className="relative flex flex-col items-start gap-5 pl-5 mb-5">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#22C55E] rounded-r-full"></div>
        <div className="ml-5">
          <h1 className="text-3xl font-bold text-[#0091FF] mb-4">
            Explore Expert Business Insights
          </h1>
          <p className="text-lg text-black">
            Read blogs about business growth, buying & selling.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10">

        {allData.length === 0 && isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : allData.length === 0 ? (
          <NoDatafound />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {allData.map((service) => (
                <div
                  key={service?._id}
                  className="group bg-white rounded-xl overflow-hidden border hover:shadow-xl transition-all flex flex-col"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={`${imageUrl}/Uploads/formation-image/${service?.image}`}
                      alt={service?.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-xl font-bold line-clamp-2">
                      {service?.title}
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                      {dayjs(service?.createdAt).format(
                        "MMMM D, YYYY h:mm A"
                      )}
                    </p>

                    <Link
                      href={
                        country === "international"
                          ? `/blog/${service?.slug}`
                          : `/${country}/blog/${service?.slug}`
                      }
                      onClick={(e) =>
                        handleNavClick(`/blog/${service?.slug}`, e)
                      }
                      className="mt-auto"
                    >
                      <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg flex justify-center gap-2">
                        View Details
                        <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}

            </div>

            {/* Loader trigger */}
            {hasMore && (
              <div
                ref={loaderRef}
                className="h-10 flex justify-center items-center mt-5"
              >
                {isLoading && <p>Loading more...</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessFormationPage;