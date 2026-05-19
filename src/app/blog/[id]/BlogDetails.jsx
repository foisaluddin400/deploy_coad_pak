"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { imageUrl } from "@/redux/Api/baseApi";
import dayjs from "dayjs";
import { useGetSingleFormatQuery } from "@/redux/Api/blogsApi";

const BlogDetails = () => {
  const { id: formationId } = useParams();

  const {
    data: singleData,
    isLoading,
    isError,
  } = useGetSingleFormatQuery({ formationId });

  // Update meta tags when data loads
  useEffect(() => {
    if (singleData?.data) {
      const formation = singleData.data;

      // Update document title
      document.title =
        formation.metaTitle || formation.title || "Formation Details";

      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute(
        "content",
        formation.metaDescription ||
          formation.detail?.replace(/<[^>]*>/g, "").substring(0, 160) ||
          "Explore our comprehensive professional formation"
      );

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (formation.metaKeywords) {
        if (!metaKeywords) {
          metaKeywords = document.createElement("meta");
          metaKeywords.name = "keywords";
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute("content", formation.metaKeywords);
      }

      // Update Open Graph tags
      const updateMetaTag = (property, content) => {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.setAttribute("property", property);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute("content", content);
      };

      if (formation.metaTitle || formation.title) {
        updateMetaTag("og:title", formation.metaTitle || formation.title);
        updateMetaTag("twitter:title", formation.metaTitle || formation.title);
      }

      if (formation.metaDescription || formation.detail) {
        const desc =
          formation.metaDescription ||
          formation.detail?.replace(/<[^>]*>/g, "").substring(0, 160);
        updateMetaTag("og:description", desc);
        updateMetaTag("twitter:description", desc);
      }

      if (formation.image) {
        const imageUrlFull = `${imageUrl}/uploads/formation-image/${formation.image}`;
        updateMetaTag("og:image", imageUrlFull);
        updateMetaTag("twitter:image", imageUrlFull);
      }

      updateMetaTag("og:type", "article");
      updateMetaTag("twitter:card", "summary_large_image");

      // ---- ADD CANONICAL URL ----
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      // Use the current page's absolute URL
      canonicalLink.setAttribute("href", window.location.href);
    }
  }, [singleData]);

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
        <div className="w-[70%] h-full rounded-md ">
          <Image
            src={`${imageUrl}/uploads/formation-image/${formation?.image}`}
            alt={formation?.title}
            width={800}
            height={600}
            className="w-full object-cover "
          />
        </div>

        {/* Right Side: Title + Description */}
        <div className="flex flex-col justify-start">
          <p className="text-gray-400 text-sm mb-2 mt-3">
            {dayjs(formation?.createdAt).format("MMMM D, YYYY, h:mm A")}
          </p>
          <h1 className="text-4xl md:text-4xl font-bold text-[#0091FF] mb-6">
            {formation?.title}
          </h1>
          <div dangerouslySetInnerHTML={{ __html: formation?.detail }} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;