"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetDetailsSingleIterestUserQuery } from "@/redux/Api/businessApi";
import { imageUrl } from "@/redux/Api/baseApi";
import img from "../../../../../../../public/Home/user.png";
const InterestBuyerDetailss = () => {
  const { businessId, interestedId } = useParams();

  const { data, isLoading } = useGetDetailsSingleIterestUserQuery({
    businessId,
    interestedId,
  });
console.log(data)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto lg:mt-8 mt-16 lg:px-0 px-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
        <div className="md:flex items-center gap-4">
          {data?.data?.interestedUser?.userId?.image ? (
            <Image
              src={`${imageUrl}/uploads/profile-image/${data?.data?.interestedUser?.userId?.image}`}
              alt="user"
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <Image
              src={img}
              alt="User avatar"
              className="w-[80px] h-[80px] rounded-full object-cover"
              width={100}
              height={100}
              priority={true}
            />
          )}

          <div>
            <h2 className="text-lg font-semibold">
              {data?.data?.interestedUser?.name}
            </h2>
            <p className="text-sm text-gray-500">
              {data?.data?.interestedUser?.email}
            </p>
          </div>
          <span className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-1 rounded md:ml-2">
            {data?.data?.interestedUser?.userRole}
          </span>
        </div>
        <Link
          href={`/buyer-contact-info/${data?.data?.interestedUser?.userId?._id}`}
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Send Message
          </button>
        </Link>
      </div>

      {/* Interested Section */}
      <div className="bg-white border rounded-xl shadow-sm flex flex-col md:flex-row overflow-hidden mt-4">
        <Image
          src={`${imageUrl}/uploads/business-image/${data?.data?.business?.image}`}
          alt="interested"
          width={400}
          height={330}
          className="w-full md:w-1/3 object-cover h-[330px]"
        />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {data?.data?.business?.title}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              {data?.data?.business?.countryName}, {data?.data?.business?.state}
              , {data?.data?.business?.city}
            </p>
            <p className="text-sm text-blue-600 inline-block mr-2">
              {data?.data?.business?.category || "none"}
            </p>
            <span className="text-sm text-orange-500">
              || {data?.data?.business?.subCategory}
            </span>
            <p className="text-sm mt-2">
              Asking Price :{" "}
              <span className="font-semibold">
                {data?.data?.business?.askingPrice}
              </span>
            </p>

            <p className="text-sm mt-2">
              Price :{" "}
              <span className="font-semibold">
                ${data?.data?.business?.price}
              </span>
            </p>
          </div>
          <Link href={`/${data?.data?.business?.slug}`}>
            <button className="mt-4 w-max bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600">
              View Details
            </button>
          </Link>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div>
          <h4 className="text-sm text-gray-500 font-medium mb-1">
            — Full Name:
          </h4>
          <p className="text-base">{data?.data?.interestedUser?.name}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500 font-medium mb-1">
            — Mobile number:
          </h4>
          <p className="text-base">
            {data?.data?.interestedUser?.countryCode}{" "}
            {data?.data?.interestedUser?.mobile}
          </p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500 font-medium mb-1">— Sector:</h4>
          <p className="text-base">{data?.data?.interestedUser?.sector}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500 font-medium mb-1">
            — Willing to Execute within:
          </h4>
          <p className="text-base">{data?.data?.interestedUser?.serviceZone}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500 font-medium mb-1">— Email:</h4>
          <p className="text-base">{data?.data?.interestedUser?.email}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500 font-medium mb-1">
            — Intended Offer:
          </h4>
          <p className="text-base">{data?.data?.interestedUser?.activity}</p>
        </div>
      </div>

      {/* Message Section */}
      <div className="p-6">
        <h4 className="text-sm text-gray-500 font-medium mb-1">— Message:</h4>
        <h4 className="text-sm font-medium mb-2">
          — {data?.data?.interestedUser?.message}
        </h4>
      </div>
    </div>
  );
};

export default InterestBuyerDetailss;
