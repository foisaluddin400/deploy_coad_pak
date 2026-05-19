

import React, { Suspense } from 'react'


import BusinessSale from './BusinessesForSaleAustralia'
import BusinessAus from './BusinessesForSaleAustralia';



export const metadata = {
  title: "Businesses for Sale Australia | Buy Profitable & Small Businesses ",
  description:
    "Explore verified businesses for sale in Australia with Profitable Businesses for Sale (PBFS). Find small, profitable, and growth-ready opportunities across industries. Compare listings and invest with confidence today.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/businesses-for-sale-australia"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <BusinessAus></BusinessAus>
      </Suspense>
    </div>
  )
}

export default Page