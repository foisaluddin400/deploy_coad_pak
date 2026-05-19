

import React, { Suspense } from 'react'
import BakeryBusiness from './BakeryBusinessForSaleInDubai';



export const metadata = {
  title: "Bakery Business for Sale in Dubai",
  description:
    "Explore a profitable bakery business for sale in Dubai. Great location, loyal customers, and ready setup—perfect opportunity for investors or entrepreneurs.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/bakery-business-for-sale-in-dubai"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <BakeryBusiness></BakeryBusiness>
      </Suspense>
    </div>
  )
}

export default Page