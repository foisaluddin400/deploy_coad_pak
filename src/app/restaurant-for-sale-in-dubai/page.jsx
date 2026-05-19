

import React, { Suspense } from 'react'
import RestaurantSale from './RestaurantForSaleInDubai';



export const metadata = {
  title: "Best Restaurant for Sale in Dubai",
  description:
    "Discover restaurant for sale in Dubai with fully equipped kitchens and premium locations. Start your food business today.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/restaurant-for-sale-in-dubai"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
      <RestaurantSale></RestaurantSale>
      </Suspense>
    </div>
  )
}

export default Page