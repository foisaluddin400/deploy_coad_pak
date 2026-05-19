import React, { Suspense } from 'react'

import NewPassword from './UpdatePassword'

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
        <NewPassword></NewPassword>
      </Suspense>
    </div>
  )
}

export default Page