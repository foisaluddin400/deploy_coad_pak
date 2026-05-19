import React, { Suspense } from 'react'
import FaqSeller from './FaqSeller'



export const metadata = {
  title: " Business Selling FAQs | Common Questions About Selling & Using PBFS  ",
  description:
    "Find answers to common questions about selling a business, managing listings, handling buyers, valuations, NDAs, upgrades, and using the PBFS platform. ",
    alternates: {  canonical: "https://profitablebusinessesforsale.com/faqsSeller"
    },
};

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
        <FaqSeller></FaqSeller>
      </Suspense>
    </div>
  )
}

export default Page