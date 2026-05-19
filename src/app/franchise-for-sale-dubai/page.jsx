
import React, { Suspense } from 'react'


import FranchiseSale from './FranchiseForSaleDubai'



export const metadata = {
  title: "Franchise for Sale Dubai | Franchise Your Business in Dubai ",
  description:
    " Find the best franchise for sale in Dubai - lucrative franchise opportunities, expand or franchise your business in Dubai and grow with proven success models.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/franchise-for-sale-dubai"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <FranchiseSale></FranchiseSale>
      </Suspense>
    </div>
  )
}

export default Page