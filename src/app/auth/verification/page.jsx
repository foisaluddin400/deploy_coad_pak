import React, { Suspense } from 'react'
import Verification from './Verification'

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
        <Verification></Verification>
      </Suspense>
    </div>
  )
}

export default Page