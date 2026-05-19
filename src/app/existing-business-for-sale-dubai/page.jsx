

import React, { Suspense } from 'react'
import ExistingDubai from './ExistingBusinessForSaleDubai';



export const metadata = {
  title: "Existing Business for Sale Dubai | Buy Profitable Businesses Dubai ",
  description:
    "Explore existing business for sale Dubai. Find verified opportunities, franchises, and profitable businesses in Dubai’s growing market on PBFS.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/existing-business-for-sale-dubai"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
      <ExistingDubai></ExistingDubai>
      </Suspense>
    </div>
  )
}

export default Page