
import AllBusinessFilterAnt from '@/components/AllBusinessFilter/AllBusinessFilter'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
    {/* <CategoryBanner></CategoryBanner> */}
        <AllBusinessFilterAnt></AllBusinessFilterAnt>
    </Suspense>
  )
}

export default page