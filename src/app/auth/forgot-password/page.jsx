import React, { Suspense } from 'react'

import ForgotPassword from './ForgotPass'

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
       <ForgotPassword></ForgotPassword>
      </Suspense>
    </div>
  )
}

export default Page