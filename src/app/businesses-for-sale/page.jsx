import { Suspense } from "react";
import Business from "./Business";


export const metadata = {
  title: "Most Trusted Platform to Buy or Sell a Business in UAE | PBFS ",
  description:
    "Buy or Sell Profitable businesses in UAE with PBFS. Explore verified businesses for sale, connect with trusted brokers, and close deals confidently.  ",
  keywords: [
    "Best website to sell a business",
    "Profitable Business For Sale Dubai",
    "Business for sale UAE",
    "Buy business in Dubai",
  ],
  alternates: {  canonical: "https://profitablebusinessesforsale.com/"
  },
};
export default function Home() {
  return (
  <Suspense fallback={<p>loading..</p>}>
    <Business/>
  </Suspense>
  );
}
