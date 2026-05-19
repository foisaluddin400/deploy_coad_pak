'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export const Navigate = ({ title }) => {
  const router = useRouter();

  return (
    <div className="">
      <div className="bg-white shadow py-3 px-3 my-2">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            onClick={() => router.back()} 
            className="flex gap-4 cursor-pointer"
          >
            <button className="text-[#EF4849]">
              <FaArrowLeft />
            </button>
            <span className="text-lg font-semibold">{title}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
