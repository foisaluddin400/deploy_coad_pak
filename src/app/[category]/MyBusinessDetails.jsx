"use client";

import React, { useEffect, useState } from "react";
import img1 from "../../../public/Home/mm.png";
import img2 from "../../../public/Home/nn.png";
import img3 from "../../../public/Home/oo.png";

import Link from "next/link";
import { useParams } from "next/navigation";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Lock } from "lucide-react";
import Image from "next/image";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import {
  useGetSingleIterestUserQuery,
  useUpdateSoldMutation,
} from "@/redux/Api/businessApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { Navigate } from "@/components/shared/Navigate";
import { toast } from "react-toastify";
import { Skeleton } from "antd";
import NoDatafound from "@/components/Nodatafound";



const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "300px" };

/* ── Skeleton — mirrors exact page layout ── */
function BusinessDetailSkeleton() {
  return (
    <div>
      {/* stat cards row */}
      <div className="lg:grid grid-cols-3 gap-9 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white shadow p-4 text-center rounded">
            <div className="flex justify-center mb-3">
              <Skeleton.Avatar active size={48} shape="square" style={{ borderRadius: 8 }} />
            </div>
            <Skeleton active title={{ width: "60%", style: { margin: "0 auto 8px" } }} paragraph={{ rows: 1, width: "40%", style: { margin: "0 auto" } }} />
          </div>
        ))}
      </div>

      {/* image + info grid */}
      <div className="lg:grid grid-cols-2 gap-4 pt-11">
        <Skeleton.Image active style={{ width: "100%", height: 400, display: "block" }} />
        <div className="mt-5 lg:mt-0">
          <Skeleton active paragraph={{ rows: 8 }} />
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {[100, 140, 110, 80].map((w, i) => (
              <div key={i} style={{ height: 32, width: w, borderRadius: 6, background: "#e2e8f0" }} />
            ))}
          </div>
        </div>
      </div>

      {/* description */}
      <div className="mt-3">
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>

      {/* map placeholder */}
      <div style={{ marginTop: 36, height: 300, borderRadius: 8, background: "#e8edf5" }} />
    </div>
  );
}

const MyBusinessDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const user =
    typeof window !== "undefined" && typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const hasAccessToken =
    typeof window !== "undefined" && typeof localStorage !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();

  const price = profileData?.data?.subscriptionPlanPrice;
  const role = profileData?.data?.role;

  const { id: businessId } = useParams();

  const { data: businessDetails, isLoading: detailsLoading } = useGetSingleIterestUserQuery({
    businessId,
  });

  const [updateSold] = useUpdateSoldMutation();

  const checkUserId = profileData?.data?._id;
  const checkBusinessId = businessDetails?.data?.business?.user?._id;

  /* =========================
        SEO META TAG UPDATE
  ========================== */

  useEffect(() => {
    if (businessDetails?.data?.business) {
      const business = businessDetails.data.business;

      document.title =
        business.metaTitle || business.title || "Business Details";

      let metaDescription = document.querySelector('meta[name="description"]');

      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }

      metaDescription.setAttribute(
        "content",
        business.metaDescription ||
          business.description?.replace(/<[^>]*>/g, "").substring(0, 160) ||
          "Explore profitable business opportunities"
      );

      if (business.metaKeywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');

        if (!metaKeywords) {
          metaKeywords = document.createElement("meta");
          metaKeywords.name = "keywords";
          document.head.appendChild(metaKeywords);
        }

        metaKeywords.setAttribute(
          "content",
          Array.isArray(business.metaKeywords)
            ? business.metaKeywords.join(", ")
            : business.metaKeywords
        );
      }

      const updateMetaTag = (property, content) => {
        let metaTag = document.querySelector(`meta[property="${property}"]`);

        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.setAttribute("property", property);
          document.head.appendChild(metaTag);
        }

        metaTag.setAttribute("content", content);
      };

      const imageFull = `${imageUrl}/Uploads/business-image/${business.image}`;

      updateMetaTag("og:title", business.metaTitle || business.title);
      updateMetaTag(
        "og:description",
        business.metaDescription ||
          business.description?.replace(/<[^>]*>/g, "").substring(0, 160)
      );
      updateMetaTag("og:image", imageFull);
      updateMetaTag("og:type", "website");

      updateMetaTag("twitter:title", business.metaTitle || business.title);
      updateMetaTag(
        "twitter:description",
        business.metaDescription ||
          business.description?.replace(/<[^>]*>/g, "").substring(0, 160)
      );
      updateMetaTag("twitter:image", imageFull);
      updateMetaTag("twitter:card", "summary_large_image");
    }
  }, [businessDetails]);

  /* =========================
        CANONICAL TAG
  ========================== */
  useEffect(() => {
    // Remove any existing canonical links to avoid duplicates
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Construct the full canonical URL
    let canonicalUrl = "";

    if (typeof window !== "undefined") {
      // Use the current URL as the canonical URL
      canonicalUrl = window.location.href;
    } else {
      // Fallback for SSR (won't run here due to useEffect, but safe)
      canonicalUrl = "";
    }

    if (canonicalUrl) {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }
  }, [businessDetails]); // Re-run when business details change (e.g., slug changes)

  /* =========================
        SOLD BUTTON
  ========================== */

  const handleSoldToggle = async () => {
    try {
      const newStatus = !businessDetails?.data?.business?.isSold;

      const res = await updateSold({
        businessId: businessDetails?.data?.business?._id,
        isSold: newStatus,
      }).unwrap();

      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  /* =========================
        GOOGLE MAP
  ========================== */

  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;

    const city = businessDetails?.data?.business?.city || "";
    const state = businessDetails?.data?.business?.state || "";
    const country = businessDetails?.data?.business?.countryName || "";

    const address = `${city}, ${state}, ${country}`.trim();

    if (!address) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const loc = results[0].geometry.location;

        setCenter({
          lat: loc.lat(),
          lng: loc.lng(),
        });
      }
    });
  }, [businessDetails, isLoaded]);

  if (!isLoaded) return <div>Loading map...</div>;

  const business = businessDetails?.data?.business;

  return (
    <div className="container m-auto pb-20 lg:mt-8 mt-16 lg:px-0 px-4">

      <Navigate title={business?.title}></Navigate>

      {/* ── Skeleton loading ── */}
      {detailsLoading ? (
        <BusinessDetailSkeleton />
      ) : !business ? (
        /* ── No data ── */
        <NoDatafound />
      ) : (
        <>
          {role &&
            role !== "Buyer" &&
            role !== "Investor" &&
            hasAccessToken &&
            checkUserId === checkBusinessId && (
              <div className="lg:grid grid-cols-3 gap-9">

                <div className="bg-white shadow p-4 text-center rounded">
                  <div className="flex justify-center">
                    <Image src={img1} alt="Total Views" width={48} height={48} />
                  </div>
                  <h1 className="font-semibold text-3xl py-3">Total Views</h1>
                  <h2 className="text-[#22C55E] font-semibold text-xl">
                    {businessDetails?.data?.business?.views ?? "0"}
                  </h2>
                </div>

                <div className="bg-white shadow p-4 text-center rounded">
                  <div className="flex justify-center">
                    <Image src={img2} alt="Total Interests" width={48} height={48} />
                  </div>
                  <h1 className="font-semibold text-3xl py-3">Total Interests</h1>
                  <h2 className="text-[#22C55E] font-semibold text-xl">
                    {businessDetails?.data?.interestedUsers?.length ?? "0"}
                  </h2>
                </div>

                <div className="bg-white shadow p-4 text-center rounded">
                  <div className="flex justify-center">
                    <Image src={img3} alt="Inquiries Received" width={48} height={48} />
                  </div>
                  <h1 className="font-semibold text-3xl py-3">
                    Contact Views
                  </h1>
                  <h2 className="text-[#22C55E] font-semibold text-xl">
                    {businessDetails?.data?.business?.buyerViewCount || '0'}
                  </h2>
                </div>

              </div>
            )}

          {/* Image + Info */}
          <div className="lg:grid grid-cols-2 gap-4 pt-11">

            <div>
              <Image
                className="w-full object-cover"
                src={`${imageUrl}/Uploads/business-image/${business?.image}`}
                alt="main business"
                width={600}
                height={400}
                priority
              />
            </div>

            <div className="mt-5 lg:mt-0">

              <button className="bg-[#C1E1FF] border border-[#0091FF] px-2 py-2 rounded">
                {business?.businessRole === "Francise Seller"
                  ? "Franchise Seller"
                  : business?.businessRole}
              </button>

              <h1 className="text-2xl text-[#0091FF]">{business?.title}</h1>

              <div className="mt-2 bg-[#2b9de9ef] text-sm inline-block rounded px-2 py-0.5 text-white">
  <span>{business?.countryName}</span>

  {business?.city && business.city !== "undefined" && (
    <>
      <span className="mx-1">,</span>
      <span>{business.city}</span>
    </>
  )}
</div>

              <div className="space-y-2 my-3">

                <p>
                  <span className="font-semibold">Business Type:</span>{" "}
                  {business?.businessType}
                </p>

                <p>
                  <span className="font-semibold">Price:</span>{" "}
                  ${business?.price}
                </p>

                <p>
                  <span className="font-semibold">Asking Price:</span>{" "}
                  {business?.askingPrice}
                </p>

                <p>
                  <span className="font-semibold">Business Type:</span>{" "}
                  {business?.businessType}
                </p>

                <p>
                  <span className="font-semibold">Country:</span>{" "}
                  {business?.countryName}, {business?.city}, {business?.state}
                </p>

                <p>
                  <span className="font-semibold">Reason:</span>{" "}
                  {business?.reason}
                </p>

                <p>
                  <span className="font-semibold">Ownership Type:</span>{" "}
                  {business?.ownerShipType}
                </p>

              </div>

              {/* Buttons Section */}
              <div className="flex gap-5 flex-wrap">
                {/* Edit Button - for business owner */}
                {role &&
                  role !== "Buyer" &&
                  role !== "Investor" &&
                  hasAccessToken &&
                  checkUserId === checkBusinessId && (
                    <Link
                      href={`/EditNewBusiness/${business?._id}`}
                    >
                      <button className="bg-[#0091FF] px-4 py-1 rounded text-white">
                        Edit {business?.title}
                      </button>
                    </Link>
                  )}

                {/* Interested Buyers/Investors Button - for business owner */}
                {role &&
                  hasAccessToken &&
                  checkUserId === checkBusinessId &&
                  role !== "Buyer" &&
                  role !== "Investor" && (
                    <div className="relative inline-block">
                      {(price === 0 || price === null) &&
                        !(role === "Business Idea Lister" && price === 0) && (
                          <div className="absolute -top-3 -right-3 bg-white rounded-full shadow p-1">
                            <Lock className="w-4 h-4 text-gray-400" />
                          </div>
                        )}

                      <button
                        onClick={() => {
                          if (
                            (price === 0 || price === null) &&
                            !(role === "Business Idea Lister" && price === 0)
                          ) {
                            toast.error("Please buy subscription");
                          } else {
                            window.location.href = `/interestBuyer/${business?.slug}`;
                          }
                        }}
                        className={`px-4 py-1 rounded text-white transition-all ${
                          (price === 0 || price === null) &&
                          !(role === "Business Idea Lister" && price === 0)
                            ? "bg-gray-400 hover:bg-gray-400"
                            : "bg-[#0091FF] hover:bg-[#0091FF]"
                        }`}
                      >
                        {role === "Business Idea Lister"
                          ? "Interested Investor"
                          : "Interested Buyers"}
                      </button>
                    </div>
                  )}

                {/* Interested Button - for buyers/investors viewing business */}
                {role &&
                  hasAccessToken &&
                  checkUserId !== checkBusinessId &&
                  ((role === "Buyer" &&
                    business?.businessRole !== "Business Idea Lister") ||
                    role === "Investor" ||
                    (role === "Broker" &&
                      business?.businessRole !== "Business Idea Lister")) && (
                    <Link
                      href={`/business-details-with-form/${business?.slug}`}
                    >
                      <button className="bg-[#0091FF] hover:bg-[#0091FF] text-white px-5 py-1 rounded">
                        Interested
                      </button>
                    </Link>
                  )}

                {/* Contact Button - for buyers/investors viewing business */}
                {role &&
                  hasAccessToken &&
                  checkUserId !== checkBusinessId &&
                  ((role === "Buyer" &&
                    business?.businessRole !== "Business Idea Lister") ||
                    role === "Investor" ||
                    (role === "Broker" &&
                      business?.businessRole !== "Business Idea Lister")) && (
                  <div className="relative inline-block">
                    {(price === 0 || price === null) && (
                      <div className="absolute -top-3 -right-3 bg-white rounded-full shadow p-1">
                        <Lock className="w-4 h-4 text-gray-400" />
                      </div>
                    )}

                    {price === 0 || price === null ? (
                      <button
                        onClick={() => toast.error("Please buy subscription")}
                        className="px-5 py-1 rounded text-white bg-gray-400 cursor-not-allowed"
                      >
                        Contact
                      </button>
                    ) : (
                      <Link
                        href={`/buyer-contact-info/${business?.user?._id}/${business?._id}`}
                      >
                        <button className="px-5 py-1 rounded text-white bg-[#0091FF] hover:bg-[#0077DD] transition-all">
                          Contact
                        </button>
                      </Link>
                    )}
                  </div>
                )}

                {/* Sold/Unsold Toggle Button - for business owner */}
                {role &&
                  role !== "Buyer" &&
                  role !== "Investor" &&
                  hasAccessToken &&
                  checkUserId === checkBusinessId && (
                    <button
                      onClick={handleSoldToggle}
                      className="bg-[#0091FF] hover:bg-[#0091FF] text-white px-5 py-1 rounded"
                    >
                      {business?.isSold ? "Unsold" : "Sold"}
                    </button>
                  )}
              </div>

            </div>

          </div>

          {/* Description */}
          <div className="mt-3">
            <span className="font-semibold">Description: </span>
            <div
              dangerouslySetInnerHTML={{
                __html: business?.description,
              }}
              className="text-gray-700"
            />
          </div>

          {/* Map */}
          <h2 className="text-[#0091FF] font-bold text-3xl mt-9">Location</h2>

          <p className="mb-4">{business?.countryName}</p>

          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={6}
            center={center || { lat: 23.8103, lng: 90.4125 }}
          >
            {center && <Marker position={center} />}
          </GoogleMap>
        </>
      )}

    </div>
  );
};

export default MyBusinessDetails;