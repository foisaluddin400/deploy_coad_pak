import React, { Suspense } from "react";

import Refund from "./RefundCancelation";

export const metadata = {
  title: " Refund and Cancellation Policy - PBFS",
  description:
    "Understand PBFS’s Refund & Cancellation Policy — clear guidelines for service fees, refunds, and cancellations when using our platform.  ",
     alternates: {  canonical: "https://profitablebusinessesforsale.com/business-schedule"
     },
};

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <Refund></Refund>
      </Suspense>
    </div>
  );
};

export default Page;
