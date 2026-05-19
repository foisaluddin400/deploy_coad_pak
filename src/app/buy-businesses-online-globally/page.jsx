

import React, { Suspense } from 'react'
import BusinessGloble from './BuyBusinessesOnlineGlobally';



export const metadata = {
  title: "Buy Businesses Online Globally | Global Business Marketplace",
  description:
    "Explore global business opportunities. Buy businesses, franchises, and startups worldwide on a trusted international marketplace for investors.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/buy-businesses-online-globally"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <BusinessGloble></BusinessGloble>
      </Suspense>
    </div>
  )
}

export default Page