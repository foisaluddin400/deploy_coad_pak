import React, { Suspense } from 'react'

import VerifyRegister from './VerifyCreator'

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <VerifyRegister></VerifyRegister>
      </Suspense>
    </div>
  )
}

export default Page