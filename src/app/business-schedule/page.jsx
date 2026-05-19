import React, { Suspense } from 'react'

import SchedualeCall from './SchedualeCall'

export const metadata = {
  title: "Business Schedule Connect and Meet Your Goals - PBFS",
  description:
    "Discover PBFS’s Business Schedule: a structured timeline to guide your journey from business planning to launch, ensuring timely and organized execution",
};

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
        <SchedualeCall></SchedualeCall>
      </Suspense>
    </div>
  )
}

export default Page