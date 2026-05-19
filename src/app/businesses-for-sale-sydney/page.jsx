

import React, { Suspense } from 'react'
import BusinessSaleSydney from './BusinessesForSaleSydney';



export const metadata = {
  title: "Businesses for Sale Sydney | Buy Business Australia ",
  description:
    "Discover businesses for sale in Sydney. Explore verified listings, franchises & profitable opportunities across Australia on PBFS's global marketplace. ",
   alternates: {  canonical: " https://profitablebusinessesforsale.com/businesses-for-sale-sydney"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
     <BusinessSaleSydney></BusinessSaleSydney>
      </Suspense>
    </div>
  )
}

export default Page