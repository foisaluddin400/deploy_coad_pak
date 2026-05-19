"use client";

import React, { useEffect } from "react";
import { message, Spin } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { useGetProfileQuery } from "@/redux/Api/userApi";



const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
  console.log(profileData)
  const role = profileData?.data?.role;
  console.log(role)
  const isSubscribed = profileData?.data?.subscriptionPlan;

  const privateRoutes = ["/chat"];
  const planeRoutes = ["/plane"];
  const business = ["/myBusiness/details"];
  const seller = ["/Seller"];
  const faqs = ["/faqs"];
  const profiles = ["/profilePage"];
  const adds = ["/addnewbusiness"];
  const subscription = ["/subscription"];
  const contacts = ["/buyer-contact-info"];
  const forms = ["/business-details-with-form/:id"];

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const isPrivate =
    privateRoutes.includes(pathname) ||
    planeRoutes.includes(pathname) ||
    business.includes(pathname) ||
    faqs.includes(pathname) ||
    seller.includes(pathname) ||
    profiles.includes(pathname) ||
    adds.includes(pathname) ||
    subscription.includes(pathname) ||
    contacts.includes(pathname)

    //  ||
    // forms.some((path) => {
    //   const regex = new RegExp(`^${path.replace(":id", "[^/]+")}$`);
    //   return regex.test(pathname);
    // });

  useEffect(() => {
    if (profileLoading) return;

    if (
      (isPrivate) &&
      !token
    ) {
   
      router.push("/auth/login");
      return;
    }

    if (adds.includes(pathname) && role === "Investor") {
      
      router.push("/auth/login");
      return;
    }

    const subscriptionRequiredRoutes = [
      "/addnewbusiness",
      "/chat",
      "/subscription",
      "/business-details-with-form/:id",
    ];

    const needsSubscription = subscriptionRequiredRoutes.some((path) => {
      const regex = new RegExp(`^${path.replace(":id", "[^/]+")}$`);
      return regex.test(pathname);
    });

    if (needsSubscription && !isSubscribed) {
      message.info("You need a subscription to access this page");
      router.push("/plane");
      return;
    }
  }, [pathname, token, role, isSubscribed, profileLoading, router]);

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
