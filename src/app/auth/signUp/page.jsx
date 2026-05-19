import React, { Suspense } from "react";
import SignUp from "./SignUp";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <SignUp></SignUp>
      </Suspense>
    </div>
  );
};

export default Page;
