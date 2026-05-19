import React, { Suspense } from "react";
import FaqBuyer from "./FaqBuyer";


export const metadata = {
  title: "Business Buying FAQs | Common Questions About Buying & Using PBFS ",
  description:
    "Find answers to common buyer questions on PBFS. Learn how to register, contact sellers, access listings, manage subscriptions, request financials, and buy businesses easily. ",
     alternates: {  canonical: "https://profitablebusinessesforsale.com/FaqBuyer"
     },
};


const Page = () => {

  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <FaqBuyer></FaqBuyer>
      </Suspense>
    </div>
  );
};

export default Page;
