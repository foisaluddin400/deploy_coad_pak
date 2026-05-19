"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Suspense } from "react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();


  const hideFooter =
    pathname === "/chat" || pathname.startsWith("/chat/");

  const hideNavbarFooter =
    pathname === "/signIn" ||
    pathname === "/signUp" ||
    pathname === "/signIn/forgot" ||
    pathname === "/business-schedule/sent-successfull" ||
    pathname === "/addnewbusiness/sent-successfull" ||
      pathname === "/business-details-with-form/sent-successfull" ||
    pathname === "/signIn/verify" ||
    pathname === "/signIn/newpass" ||
    pathname === "/signUp/done" ||
    pathname === "/signUp/seller" ||
    pathname === "/signUp/accountverify";

  return (
    <div className="flex flex-col min-h-screen">

      {!hideNavbarFooter && <Suspense>
        <Navbar />
      </Suspense>}

      <div className="text-black flex-grow bg-[#fbfeff]">{children}</div>


      {!hideNavbarFooter && !hideFooter && <Footer />}
    </div>
  );
}
