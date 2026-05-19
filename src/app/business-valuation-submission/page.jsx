import React, { Suspense } from 'react'

import BusinessValuationSubmission from './BusinessValiation'

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
   <BusinessValuationSubmission></BusinessValuationSubmission>
      </Suspense>
    </div>
  )
}

export default Page