import React, { Suspense } from "react";

import TermsAndConditionsPage from "./TermsAndCondition";

export const metadata = {
  title: "Terms and Conditions | Profitable Business For Sale (PBFS) ",
  description:
    "Review PBFS’s Terms & Conditions — understand your rights, obligations, and guidelines when using our platform for franchise and business listings. ",
     alternates: {  canonical:"https://profitablebusinessesforsale.com/terms-and-conditions"
     },
};

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <TermsAndConditionsPage></TermsAndConditionsPage>
      </Suspense>
    </div>
  );
};

export default Page;
