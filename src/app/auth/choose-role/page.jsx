import React, { Suspense } from "react";
import ChooseRole from "./ChooseRole";

// ✅ Add SEO metadata here
export const metadata = {
  title: "Choose Your Role to Start a Business - PBFS ",
  description:
    "Connect with top business brokers in Dubai through PBFS. List, buy, or sell profitable businesses with confidence and ease today. ",
    alternates: {  canonical: "https://profitablebusinessesforsale.com/auth/choose-role"
    },
};

const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
        <ChooseRole />
      </Suspense>
    </div>
  );
};

export default Page;
