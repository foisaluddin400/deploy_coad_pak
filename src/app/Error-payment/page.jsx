import { Card } from "antd";

import React from "react";

import image from '../../../public/Home/close.png'
import Link from "next/link";
import Image from "next/image";
const ErrorPay = () => {
  return (
 <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg ">
        <div className="flex flex-col items-center">
            <Image
            src={image}
            alt="Payment Error"
            width={150}
            height={150}
            className="w-[150px] h-auto"
            priority={false}
          />
          <h1 className="text-3xl font-bold  text-black mt-4">Payment Error</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Oops! Something went wrong!
          </p>
        </div>
       
        <div className="flex justify-center pt-6">
          <Link
            href={'/plane'}
            
            
          >
          <button
              type="primary"
              htmlType="submit"
              className="px-11 bg-[#0091FF] rounded text-white py-2"
            >
              Try Again
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ErrorPay;
