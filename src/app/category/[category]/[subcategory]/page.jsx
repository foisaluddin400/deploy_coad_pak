import React, { Suspense } from 'react'
import SubCategoryPage from '../../SubCategoryPage'
import AllBusinessFilterAnt from '@/components/AllBusinessFilter/AllBusinessFilter'

const page = () => {
  return (
    <Suspense>
      
            <AllBusinessFilterAnt></AllBusinessFilterAnt>
        </Suspense>
  )
}

export default page