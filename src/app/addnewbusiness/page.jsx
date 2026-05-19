

import { Suspense } from "react";
import AddNewBusiness from "./AddNewBusiness";
import ProtectedRoute from "@/components/ProtectedRoute";

const Page = () => {
  return (
    <Suspense>
      <ProtectedRoute>
        <AddNewBusiness />
      </ProtectedRoute>
    </Suspense>
  );
};

export default Page;
