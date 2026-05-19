"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetSingleIterestUserQuery } from "@/redux/Api/businessApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { Navigate } from "@/components/shared/Navigate";
import img from "../../../../public/Home/user.png";
const InterestedBuyer = () => {
  const { id: businessId } = useParams();

  const { data: businessDetails, isLoading } = useGetSingleIterestUserQuery({
    businessId,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const businessTitle = businessDetails?.data?.business?.title;
  const interestedUsers = businessDetails?.data?.interestedUsers || [];
console.log(interestedUsers)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:mt-8 mt-16 lg:px-0 px-4 pb-20">
      <Navigate title={`${businessTitle || "Business"} / Interested Buyers`} />

      {interestedUsers.length === 0 ? (
        <p className="text-gray-500 h-[60vh]">No interested buyers yet.</p>
      ) : (
        <div className=" grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {interestedUsers.map((buyer) => (
            <div
              key={buyer?._id}
              className="  p-4 bg-white shadow rounded-xl hover:shadow-md transition-all"
            >
              {/* Left Section */}
              <div className="  ">
                <div className="">
                  {buyer?.userId?.image ? (
                    <Image
                      src={`${imageUrl}/uploads/profile-image/${buyer?.userId?.image}`}
                      alt={buyer?.userId?.name || "User Image"}
                      width={100}
                      height={100}
                      className="object-cover rounded-full"
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
                </div>
                <div className="mt-4 mb-2">
                  <h3 className="text-lg font-semibold">
                    {buyer?.userId?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {buyer?.userId?.email}
                  </p>
                </div>
              </div>
              <span className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-1 rounded ">
                {buyer?.userId?.role || "N/A"}
              </span>
              {/* Middle Section */}
              <div className="my-4 text-sm text-gray-700">
                <p className="font-medium">Interested On</p>
                <p className="text-blue-500">{businessTitle}</p>
              </div>

              {/* Right Section */}
              <Link
                href={`/interestBuyer/details/${buyer?._id}/iterestDetails/${buyer?.businessId}`}
              >
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterestedBuyer;
