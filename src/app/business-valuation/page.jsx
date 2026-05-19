// src/app/blog/[id]/page.jsx
import React, { Suspense } from 'react'
import BusinessValuationPage from './BusinessValuationPage'


const Page = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <BusinessValuationPage></BusinessValuationPage>
      </Suspense>
    </div>
  )
}

export default Page