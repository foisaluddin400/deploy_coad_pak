import React, { Suspense } from 'react'

import FaqBroker from './FaqBrokers'



export const metadata = {
  title: "Broker FAQs | Common Questions About Broker Plans & Listings",
  description:
    "Get answers to broker questions about listing multiple businesses, managing leads, subscription plans, upgrades, and PBFS platform features for professional brokers. ",
      alternates: {  canonical:"https://profitablebusinessesforsale.com/FaqBrokers"
      },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <FaqBroker></FaqBroker>
      </Suspense>
    </div>
  )
}

export default Page