import React, { Suspense } from 'react'

import BusinessFromationppage from './BusinessFromotion'
export const metadata = {
  title: "Expert Insights & Global Trends | Profitable Businesses for Sale",
  description:
    "Explore expert insights, trends and advice on buying, selling and valuing businesses globally at Profitable Businesses for Sale. Stay ahead with actionable strategies, franchise updates and real-world success stories.",
};
const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
        <BusinessFromationppage></BusinessFromationppage>
      </Suspense>
    </div>
  )
}

export default Page