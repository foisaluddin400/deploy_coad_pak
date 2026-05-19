import React, { Suspense } from 'react'

import FaqBusinessIdea from './FaqBusiness'

export const metadata = {
  title: "Business Idea Lister FAQs | Questions About Listing Business Ideas ",
  description:
    "Get answers to common questions about listing business ideas, editing listings, investor visibility, privacy, subscriptions, and showcasing startup ideas on PBFS. ",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/FaqBusiness"
   },
};



const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
        <FaqBusinessIdea></FaqBusinessIdea>
      </Suspense>
    </div>
  )
}

export default Page