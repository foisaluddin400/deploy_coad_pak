import React, { Suspense } from "react";

import Subscription from "./Subscription";
import ProtectedRoute from "@/components/ProtectedRoute";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <ProtectedRoute>
          <Subscription></Subscription>
        </ProtectedRoute>
      </Suspense>
    </div>
  );
};

export default Page;
