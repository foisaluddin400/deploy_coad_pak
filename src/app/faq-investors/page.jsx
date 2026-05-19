import React, { Suspense } from 'react'
import FaqInvestors from './FaqInvestor'


export const metadata = {
  title: "Investor FAQs | Questions About Investor Subscriptions & Opportunities ",
  description:
    "Find answers to investor questions about subscriptions, startup opportunities, business ideas, investor badges, privacy, matchmaking support, and using the PBFS platform. ",
     alternates: {  canonical: "https://profitablebusinessesforsale.com/FaqInvestors"
     },
};

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading..</p>}>
      <FaqInvestors></FaqInvestors></Suspense>
    </div>
  )
}

export default page