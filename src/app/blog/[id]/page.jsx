import React, { Suspense } from "react";

import BlogDetails from "./BlogDetails";

const Page = () => {
  return (
    <>
      <div>
        <Suspense fallback={<p>loading..</p>}>
          <BlogDetails></BlogDetails>
        </Suspense>
      </div>
    </>
  );
};

export default Page;
