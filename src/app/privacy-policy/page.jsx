import React, { Suspense } from "react";

import Privecy from "./Privecy";


export const metadata = {
  title: "Privacy Policy — Profitable Business For Sale (PBFS) ",
  description:
    "PBFS values your trust. Read our Privacy Policy to learn how we protect, use, and safeguard your data while exploring business opportunities.",
  alternates: {  canonical:  "https://profitablebusinessesforsale.com/privacy-policy"
  },
};

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <Privecy></Privecy>
      </Suspense>
    </div>
  );
};

export default Page;
