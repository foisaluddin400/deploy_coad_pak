
import React, { Suspense } from 'react'
import ProfitBusiness from './BuyProfitableBusinessinDubai';
export const metadata = {
  title: "Buy Profitable Business in Dubai | Smart Investment",
  description:
    "Looking to buy a profitable business in Dubai? Explore trusted investment options with strong returns and start your business journey today.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/buy-profitable-business-in-dubai"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <ProfitBusiness></ProfitBusiness>
      </Suspense>
    </div>
  )
}

export default Page