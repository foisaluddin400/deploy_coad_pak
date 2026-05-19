import React, { Suspense } from "react";

import Seller from "./SellerPage";
import ProtectedRoute from "@/components/ProtectedRoute";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <ProtectedRoute><Seller></Seller></ProtectedRoute>
      </Suspense>
    </div>
  );
};

export default Page;
