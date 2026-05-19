import React, { Suspense } from 'react'

import AdvanceSearch from './AdvanceSearch'

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
  
  <AdvanceSearch></AdvanceSearch>
      </Suspense>
    </div>
  )
}

export default Page