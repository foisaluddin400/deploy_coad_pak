import AllBusinessFilterAnt from '@/components/AllBusinessFilter/AllBusinessFilter'
import CategoryBanner from '@/components/AllBusinessFilter/CategoryBanner'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
      
        <AllBusinessFilterAnt></AllBusinessFilterAnt>
    </Suspense>
  )
}

export default page