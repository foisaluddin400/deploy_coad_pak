'use client'

import Link from "next/link";
import Image from "next/image";
import banner from "../../../public/category/07.jpg";

import { imageUrl } from "@/redux/Api/baseApi";
import { IoIosArrowForward } from "react-icons/io";
import { useCountry } from "@/hooks/useCountry";
import { useParams } from "next/navigation";
import { useGetCategtoryQuery } from "@/redux/Api/categoryApi";
import { useGetCategoryBannerQuery } from "@/redux/Api/bannerApi";


export default function SubCategoryPage() {
  const {category} = useParams()
  console.log(category)
  const { country, pushWithCountry } = useCountry();
    const handleNavClick = (path, e) => {
      e.preventDefault();
      pushWithCountry(path);
    };
  const {data:bannerData} = useGetCategoryBannerQuery("Category");
  console.log(bannerData)
  const { data, isLoading, isError } = useGetCategtoryQuery();

  console.log(data)

  const selectedCategory = data?.data?.find(
  (cat) => cat?.slug === category
);

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
            <h1 className="text-6xl font-bold">Sub Categories</h1>
          
          </div>
          <p className="flex justify-center gap-1 mt-4 items-center text-xl font-semibold"> Home <IoIosArrowForward className="mt-1"/>Sub Category</p>
        </div>
      </div>

      {/* GRID */}
  <div className="max-w-7xl mx-auto px-6 py-20">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

  {selectedCategory?.subCategories?.map((subCat) => (
    <div
      key={subCat?._id}
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        from-blue-600
        via-sky-500
        to-cyan-400
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-300
        hover:-translate-y-2
        group
      "
    >

      {/* Background Shapes */}
      <div className="absolute -top-10 -right-10 w-32 h-44 bg-white/10 rounded-full" />

      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full" />

      <div className="relative z-10 p-6 flex flex-col justify-between h-[220px]">

        {/* Top */}
        <div>

          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-bold">
            {subCat?.name?.charAt(0)}
          </div>

          <h2 className="text-2xl font-bold text-white mt-5 leading-snug">
            {subCat?.name}
          </h2>

        </div>

        {/* Bottom */}
        <div>

          <p className="text-white/90 text-sm mb-4">
            {subCat?.totalBusinessCount || 0} Listings Available
          </p>

          <Link
            href={
              country === "international"
                ? `/category/${selectedCategory?.slug}/${subCat?.slug}`
                : `/${country}/category/${selectedCategory?.slug}/${subCat?.slug}`
            }
            onClick={(e) =>
              handleNavClick(
                `/category/${selectedCategory?.slug}/${subCat?.slug}`,
                e
              )
            }
          >
            <button
              className="
                w-full
                bg-white
                text-blue-600
                py-3
                rounded-xl
                font-semibold
                transition-all
                duration-300
                hover:bg-gray-100
              "
            >
              View Listing
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
}