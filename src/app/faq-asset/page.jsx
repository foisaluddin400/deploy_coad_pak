import React, { Suspense } from "react";

import FaqAssetSeller from "./FaqAssest";

export const metadata = {
  title: "Business Asset Lister FAQs | Questions About Listing Business Assets ",
  description:
    "Find answers to common questions about listing and selling business assets, managing listings, subscriptions, visibility boosts, and connecting with buyers on PBFS. ",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/FaqAsset"
   },
};

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <FaqAssetSeller></FaqAssetSeller>
      </Suspense>
    </div>
  );
};

export default Page;
