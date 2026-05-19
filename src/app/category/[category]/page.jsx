

import AllBusinessFilterAnt from '@/components/AllBusinessFilter/AllBusinessFilter'
import CategoryBanner from '@/components/AllBusinessFilter/CategoryBanner'

import React, { Suspense } from 'react'
import SubCategoryPage from '../SubCategoryPage'

const page = () => {
 
  return (
    <Suspense>
  
        <SubCategoryPage></SubCategoryPage>
    </Suspense>
  )
}

export default page