import React, { Suspense } from "react";


import Notification from "./Notification";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <Notification></Notification>
      </Suspense>
    </div>
  );
};

export default Page;
