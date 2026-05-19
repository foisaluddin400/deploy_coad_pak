

import React, { Suspense } from 'react'
import EommerceBusiness from './EcommerceBusinessForSaleUae';



export const metadata = {
  title: "Profitable Ecommerce Business for Sale UAE ",
  description:
    "Explore top ecommerce business opportunities for sale in UAE. Invest in ready-made online stores with proven models and scalable growth.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/ecommerce-business-for-sale-uae"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
      <EommerceBusiness></EommerceBusiness>
      </Suspense>
    </div>
  )
}

export default Page