import React, { Suspense } from 'react'

import Verify from './Verify'

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <Verify></Verify>
      </Suspense>
    </div>
  )
}

export default Page