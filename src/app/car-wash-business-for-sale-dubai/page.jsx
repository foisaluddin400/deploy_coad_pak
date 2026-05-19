import React, { Suspense } from 'react'
import ProfitBusiness from './CarWashBusinessForSaleDubai';
import Carwash from './CarWashBusinessForSaleDubai';



export const metadata = {
  title: "Best Car Wash Business for Sale in Dubai ",
  description:
    "Invest in a car wash business for sale in Dubai with modern equipment and loyal customers. Start earning with a ready-to-operate setup today.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/car-wash-business-for-sale-dubai"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <Carwash></Carwash>
      </Suspense>
    </div>
  )
}

export default Page