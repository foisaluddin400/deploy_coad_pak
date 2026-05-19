'use client';

import React, { useEffect } from "react";
import card from "../../../../public/Home/card1.png";
import backCard from "../../../../public/Home/ii.png";
import Link from "next/link"; // Replace react-router-dom Link

import { message, Popconfirm } from "antd";
import { useDeleteBusinessMutation, useGetAllBusinessQuery } from "@/redux/Api/businessApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { Navigate } from "@/components/shared/Navigate";
import Image from "next/image"; // Import Image from next/image
import { useGetProfileQuery } from "@/redux/Api/userApi";
import { toast } from "react-toastify";
import { useCountry } from "@/hooks/useCountry";

const MyBusiness = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { country, pushWithCountry } = useCountry();
  const handleNavClick = (path, e) => {
    e.preventDefault();
    pushWithCountry(path);
  };
  const [deleteBusinesss] = useDeleteBusinessMutation();
  const { data: businessData, isLoading } = useGetAllBusinessQuery();
  console.log(businessData)
  const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";
  const hasAccessToken = isBrowser && localStorage.getItem("accessToken");
  const user = isBrowser ? JSON.parse(localStorage.getItem("user")) : null;
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
  const role = profileData?.data?.role;
let currentTitle = "Current for sale";
let soldTitle = "Previous that have been sold";

if (role === "Seller") {
  currentTitle = "Current Business(es) Listed for Sale";
  soldTitle = "Previous Business(es) that have been Sold";
} else if (role === "Asset Seller") {
  currentTitle = "Current Asset(s) Listed for Sale";
  soldTitle = "Previous Asset(s) that have been Sold";
} else if (role === "Business Idea Lister") {
  currentTitle = "Current Business Ideas Listed";
  soldTitle = "Past Business Idea Listings";
} else if (role === "Francise Seller") {
  currentTitle = "Current Franchise(es) Listed for Sale";
  soldTitle = "Previous Franchise(es) that have been Sold";
}
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const {
    interestedBusiness = [],
    interestedBusinessAsset = [],
    interestedFranchise = [],
    interestedBusinessIdeas = [],
    myBusiness = [],
    mySoldBusiness = [],
  } = businessData?.data || {};

  const handleDeletebusiness = async (businessId) => {
    try {
      const res = await deleteBusinesss({ businessId, role }).unwrap();
      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  const renderCard = (item) => {
    // Check if the item is a business card (has businessId) or a sold card
    const isBusinessCard = item?.businessId;

    // For Broker: Render both business and sold cards based on item structure
    if (role === "Broker") {
      if (isBusinessCard) {
        // Business card for Broker
        return (
          <div
            key={item?._id}
            className="border border-[#0091FF] bg-cover bg-center rounded"
            style={{ backgroundImage: `url(${backCard.src})` }} // Use .src for static import
          >
            <div className="">
              <Image
                src={`${imageUrl}/Uploads/business-image/${item?.businessId?.image}`}
                alt={item?.businessId?.title}
                width={300} // Estimated width based on card size
                height={200} // Estimated height based on card size
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
            <div className="p-4">
              <h1 className="text-xl font-semibold text-gray-800 mb-2">
                {item?.businessId?.title}
              </h1>
              <p className="text-gray-600 mb-2">{item?.businessId?.location}</p>
              <div className="mb-2">
                <span className="text-blue-500">
                  {item?.businessId?.category?.categoryName}
                </span>{" "}
                ||{" "}
                <span className="text-[#D97706]">
                  {item?.businessId?.subCategory?.name}
                </span>
              </div>
              <p className="text-gray-800 mb-4">
                Asking Price :{" "}
                <span className="font-semibold">
                  {item?.businessId?.askingPrice}
                </span>
              </p>

<p className="text-gray-800 mb-4">
               Price :{" "}
                <span className="font-semibold">
                  ${item?.businessId?.price}
                </span>
              </p>

              <Link
  href={
    country === "international"
      ? `/${item?.businessId?.category?.slug}/${item?.businessId?.subCategory?.slug}/${item?.businessId?.slug}`
      : `/${country}/${item?.businessId?.category?.slug}/${item?.businessId?.subCategory?.slug}/${item?.businessId?.slug}`
  }
  onClick={(e) =>
    handleNavClick(
      `/${item?.businessId?.category?.slug}/${item?.businessId?.subCategory?.slug}/${item?.businessId?.slug}`,
      e
    )
  }
>
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
    View Details
  </button>
</Link>
              <Popconfirm
                title="Are you sure you want to delete this Business?"
                onConfirm={() => handleDeletebusiness(item?._id)}
                okText="Yes"
                cancelText="No"
                okType="danger"
              >
                <button className="bg-red-600 ml-5 text-white px-4 py-2 rounded-md transition-colors">
                  Delete
                </button>
              </Popconfirm>
            </div>
          </div>
        );
      } else {
        // Sold card for Broker
        return (
          <div
            key={item?._id}
            className="border border-[#0091FF] bg-cover bg-center rounded"
            style={{ backgroundImage: `url(${backCard.src})` }} // Use .src for static import
          >
            <div className="">
              <Image
                src={`${imageUrl}/Uploads/business-image/${item?.image || card.src}`} // Use .src for fallback
                alt={item?.title}
                width={300} // Estimated width
                height={200} // Estimated height
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
            <div className="p-4">
              <h1 className="text-xl font-semibold text-gray-800 mb-2">
                {item?.title}
              </h1>
              <p className="text-gray-600 mb-2">{item?.location}</p>
              <div className="mb-2">
                <span className="text-blue-500">{item?.category?.categoryName}</span> ||{" "}
                <span className="text-[#D97706]">{item?.subCategory?.name}</span>
              </div>
              <p className="text-gray-800 mb-4">
                Asking Price :{" "}
                <span className="font-semibold">{item?.askingPrice}</span>
              </p>

               <p className="text-gray-800 mb-4">
                Price :{" "}
                <span className="font-semibold">${item?.price}</span>
              </p>
            <Link
  href={
    country === "international"
      ? `/${item?.category?.slug}/${item?.subCategory?.slug}/${item?.slug}`
      : `/${country}/${item?.category?.slug}/${item?.subCategory?.slug}/${item?.slug}`
  }
  onClick={(e) =>
    handleNavClick(
      `/${item?.category?.slug}/${item?.subCategory?.slug}/${item?.slug}`,
      e
    )
  }
>
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
    View Details
  </button>
</Link>
              <Popconfirm
                title="Are you sure you want to delete this Business?"
                onConfirm={() => handleDeletebusiness(item?._id)}
                okText="Yes"
                cancelText="No"
                okType="danger"
              >
                <button className="bg-red-600 ml-5 text-white px-4 py-2 rounded-md transition-colors">
                  Delete
                </button>
              </Popconfirm>
            </div>
          </div>
        );
      }
    }

    // For Buyer or Investor: Render only business card
    if (role === "Buyer" || role === "Investor") {
      if (isBusinessCard) {
        // Business card
        return (
          <div
            key={item?._id}
            className="border border-[#0091FF] bg-cover bg-center rounded"
            style={{ backgroundImage: `url(${backCard.src})` }} // Use .src for static import
          >
            <div className="">
              <Image
                src={`${imageUrl}/Uploads/business-image/${item?.businessId?.image}`}
                alt={item?.businessId?.title}
                width={300} // Estimated width
                height={200} // Estimated height
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
            <div className="p-4">
              <h1 className="text-xl font-semibold text-gray-800 mb-2">
                {item?.businessId?.title}
              </h1>
              <p className="text-gray-600 mb-2">{item?.businessId?.location}</p>
              <div className="mb-2">
                <span className="text-blue-500">
                  {item?.businessId?.category?.categoryName}
                </span>{" "}
                ||{" "}
                <span className="text-[#D97706]">
                  {item?.businessId?.subCategory?.name}
                </span>
              </div>
              <p className="text-gray-800 mb-4">
                Asking Price :{" "}
                <span className="font-semibold">
                  {item?.businessId?.askingPrice}
                </span>
              </p>

 <p className="text-gray-800 mb-4">
                Price :{" "}
                <span className="font-semibold">
                  ${item?.businessId?.price}
                </span>
              </p>


              <Link
  href={
    country === "international"
      ? `/${item?.businessId?.category?.slug}/${item?.businessId?.subCategory?.slug}/${item?.businessId?.slug}`
      : `/${country}/${item?.businessId?.category?.slug}/${item?.businessId?.subCategory?.slug}/${item?.businessId?.slug}`
  }
  onClick={(e) =>
    handleNavClick(
      `/${item?.businessId?.category?.slug}/${item?.businessId?.subCategory?.slug}/${item?.businessId?.slug}`,
      e
    )
  }
>
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
    View Details
  </button>
</Link>
              <Popconfirm
                title="Are you sure you want to delete this Business?"
                onConfirm={() => handleDeletebusiness(item?._id)}
                okText="Yes"
                cancelText="No"
                okType="danger"
              >
                <button className="bg-red-600 ml-5 text-white px-4 py-2 rounded-md transition-colors">
                  Delete
                </button>
              </Popconfirm>
            </div>
          </div>
        );
      }
      return null; // Don't render sold cards for Buyer/Investor
    }

    // For all other roles: Render only sold card
    
    if (!isBusinessCard) {
      return (
        <div
          key={item._id}
          className="border border-[#0091FF] bg-cover bg-center rounded"
          style={{ backgroundImage: `url(${backCard.src})` }} // Use .src for static import
        >
          <div className="">
            <Image
              src={`${imageUrl}/Uploads/business-image/${item?.image || card.src}`} // Use .src for fallback
              alt={item?.title}
              width={300} // Estimated width
              height={200} // Estimated height
              className="w-full h-full object-cover"
              priority={false}
            />
          </div>
          <div className="p-4">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              {item?.title}
            </h1>
            <p className="text-gray-600 mb-2">{item?.location}</p>
            <div className="mb-2">
              <span className="text-blue-500">{item?.category?.categoryName}</span> ||{" "}
              <span className="text-[#D97706]">{item?.subCategory?.name}</span>
            </div>
             <p className="text-gray-800 mb-4">
                Asking Price :{" "}
                <span className="font-semibold">{item?.askingPrice}</span>
              </p>

               <p className="text-gray-800 mb-4">
                Price :{" "}
                <span className="font-semibold">${item?.price}</span>
              </p>
           <div className="grid grid-cols-2 gap-4">
             <Link
  href={
    country === "international"
      ? `/${item?.category?.slug}/${item?.subCategory?.slug}/${item?.slug}`
      : `/${country}/${item?.category?.slug}/${item?.subCategory?.slug}/${item?.slug}`
  }
  onClick={(e) =>
    handleNavClick(
      `/${item?.category?.slug}/${item?.subCategory?.slug}/${item?.slug}`,
      e
    )
  }
>
  <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md transition-colors">
    View Details
  </button>
</Link>
          <Popconfirm
              title="Are you sure you want to delete this Business?"
              onConfirm={() => handleDeletebusiness(item?._id)}
              okText="Yes"
              cancelText="No"
              okType="danger"
            >
              <button className="bg-red-600  text-white w-full  py-2 rounded-md transition-colors">
                Delete
              </button>
            </Popconfirm>
            
           </div>
             
          </div>
        </div>
      );
    }

    return null; // Don't render business cards for other roles
  };

  return (
    <div className="container m-auto pb-20 mt-20 md:mt-11 px-4">
      <Navigate title={"My Business"} />

      {role === "Investor" ? (
        <>
          <Section
            title="Interested Business Ideas"
            data={interestedBusinessIdeas}
            renderCard={renderCard}
          />
          <Section
            title="Interested Business"
            data={interestedBusiness}
            renderCard={renderCard}
          />
          <Section
            title="Interested Business Assets"
            data={interestedBusinessAsset}
            renderCard={renderCard}
          />
          <Section
            title="Interested Franchises"
            data={interestedFranchise}
            renderCard={renderCard}
          />
        </>
      ) : role === "Buyer" ? (
        <>
          <Section
            title="Interested Business"
            data={interestedBusiness}
            renderCard={renderCard}
          />
          <Section
            title="Interested Business Assets"
            data={interestedBusinessAsset}
            renderCard={renderCard}
          />
          <Section
            title="Interested Franchises"
            data={interestedFranchise}
            renderCard={renderCard}
          />
        </>
      ) : role === "Broker" ? (
        <>
          {role !== "Investor" && hasAccessToken && (
            <div className="flex justify-end mt-4">
              <Link href={"/addnewbusiness"}>
                <button className="bg-blue-400 px-4 py-2 text-white rounded hover:underline">
                  List a New One
                </button>
              </Link>
            </div>
          )}
          <Section
            title={`Current Business(es) Listed for Sale`}
            data={myBusiness}
            renderCard={renderCard}
          />
          <Section
            title={`Previous Business(es) that have been Sold `}
            data={mySoldBusiness}
            renderCard={renderCard}
          />
          <Section
            title="Interested Business"
            data={interestedBusiness}
            renderCard={renderCard}
          />
          <Section
            title="Interested Business Assets"
            data={interestedBusinessAsset}
            renderCard={renderCard}
          />
          <Section
            title="Interested Franchises"
            data={interestedFranchise}
            renderCard={renderCard}
          />
        </>
      ) : (
        <>
          {role !== "Investor" && hasAccessToken && (
            <div className="flex justify-end mt-4">
              <Link href={"/addnewbusiness"}>
                <button className="bg-blue-400 px-4 py-2 text-white rounded hover:underline">
                  List a New One
                </button>
              </Link>
            </div>
          )}
          <Section
            title={currentTitle}
            data={myBusiness}
            renderCard={renderCard}
          />
          
          <Section
  title={
    <span>
      {soldTitle}<br />
      <span className="text-gray-500 text-sm font-normal">
        Note : Sold business will be deleted after 30 days
      </span>
    </span>
  }
  data={mySoldBusiness}
  renderCard={renderCard}
/>
        </>
      )}
    </div>
  );
};

const Section = ({ title, data, renderCard }) => (
  <div className="pt-16">
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-[5px] h-12 rounded-r bg-green-500 mr-4"></div>
          <h2 className="text-2xl font-bold text-blue-500">{title}</h2>
        </div>
      </div>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map(renderCard)}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">No data found</p>
      )}
    </div>
  </div>
);

export default MyBusiness;



