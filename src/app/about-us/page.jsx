

import React, { Suspense } from 'react'


import AboutPage from './AboutUsPage'



export const metadata = {
  title: "About Us - PBFS | Buy & Sell Businesses Online ",
  description:
    " Learn about PBFS, the trusted online marketplace for buying, selling, and investing in profitable businesses. Discover our mission to empower entrepreneurs and business owners worldwide. ",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/about-us"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <AboutPage></AboutPage>
      </Suspense>
    </div>
  )
}

export default Page