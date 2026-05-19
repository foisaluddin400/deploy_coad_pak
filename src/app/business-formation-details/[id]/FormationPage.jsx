"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { imageUrl } from "@/redux/Api/baseApi";
import dayjs from "dayjs";
import { useGetSingleFormatQuery } from "@/redux/Api/blogsApi";

const FormationPage = () => {
  const { id: formationId } = useParams();

  const {
    data: singleData,
    isLoading,
    isError,
  } = useGetSingleFormatQuery({ formationId });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError || !singleData?.data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Failed to load formation details.</p>
      </div>
    );
  }

  const formation = singleData?.data;

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="">
        {/* Left Side: Image */}
        <div className="w-full h-full rounded-md ">
          <Image
            src={`${imageUrl}/uploads/formation-image/${formation?.image}`}
            alt={formation?.title}
            width={800}
            height={600}
            className="w-full  object-cover"
          />

          {/* Date & Time Display */}
        </div>

        {/* Right Side: Title + Description */}
        <div className="flex flex-col justify-start">
          <p className="text-gray-400 text-sm mb-2 mt-3">
            {dayjs(formation?.createdAt).format("MMMM D, YYYY, h:mm A")}
          </p>
          <h1 className="text-4xl md:text-4xl font-bold text-[#0091FF] mb-6">
            {formation?.title}
          </h1>
         <div
                dangerouslySetInnerHTML={{ __html: formation?.detail }}
              />
        </div>
      </div>
    </div>
  );
};

export default FormationPage;
