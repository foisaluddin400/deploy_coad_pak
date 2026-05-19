import React, { Suspense } from "react";
import MainChat from "./MainChat";
import ProtectedRoute from "@/components/ProtectedRoute";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <ProtectedRoute><MainChat></MainChat></ProtectedRoute>
      </Suspense>
    </div>
  );
};

export default Page;
