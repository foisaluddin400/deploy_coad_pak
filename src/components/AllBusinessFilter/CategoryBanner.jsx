"use client";
import { useGetCategoryBannerQuery } from "@/redux/Api/bannerApi";
import { imageUrl } from "@/redux/Api/baseApi";
import Image from "next/image";

import React from "react";

const CategoryBanner = ({ categoryName, banner }) => {
  console.log(categoryName)
  const { data: categoryBannerData } = useGetCategoryBannerQuery("Category");

    const bannerImage = categoryBannerData?.data?.bannerImage;
    console.log(categoryBannerData)
  return (
    <div>
      CategoryBanner
     <div className="relative w-full h-[220px] overflow-hidden border">
  
  <Image
    src={
      bannerImage
        ? `${imageUrl}/uploads/banner-image/${bannerImage}`
        : "/placeholder.png"
    }
    alt="banner"
    fill
    className="object-cover"
    sizes="100vw"
  />

  {/* dark overlay */}
  <div className="absolute inset-0 bg-black/40" />

  {/* text */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
    <h3 className="text-3xl font-bold">{categoryName}</h3>
    <p>{banner}</p>
  </div>
</div>
    </div>
  );
};

export default CategoryBanner;
