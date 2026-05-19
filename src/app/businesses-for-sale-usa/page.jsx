

import React, { Suspense } from 'react'
import BusinessUSA from './BusinessesForSaleUsa';



export const metadata = {
  title: "Businesses for Sale USA | Buy Profitable Opportunities in USA ",
  description:
    "Explore verified businesses for sale across the United States with Profitable Businesses for Sale (PBFS). Discover profitable companies, small businesses, and investment opportunities across industries. Compare listings and start your journey to business ownership today.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/businesses-for-sale-usa"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <BusinessUSA></BusinessUSA>
      </Suspense>
    </div>
  )
}

export default Page