

import React, { Suspense } from 'react'


import BusinessSale from './BusinessSaleForDubai'



export const metadata = {
  title: "Business for Sale in Dubai | Buy Profitable Business Dubai ",
  description:
    " Explore top business for sale in Dubai - find small & profitable business opportunities, buy a business in Dubai, and invest in thriving ventures today.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/businesses-for-sale-dubai"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <BusinessSale></BusinessSale>
      </Suspense>
    </div>
  )
}

export default Page