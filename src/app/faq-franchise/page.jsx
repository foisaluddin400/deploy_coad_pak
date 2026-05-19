import React, { Suspense } from 'react'


import FaqSeller from './FaqFranchise'

export const metadata = {
  title: "Franchise Owner FAQs | Questions About Listing Franchise Opportunities ",
  description:
    "Get answers to common questions about listing and promoting franchise opportunities, managing listings, tracking performance, upgrades, and franchise support on PBFS. ",
    canonical: "https://profitablebusinessesforsale.com/FaqFranchise"
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