import React, { Suspense } from 'react'
import CategoryPage from './CategoryPage'

const page = () => {
  return (
    <Suspense fallback={<p>loading..</p>}>
         <CategoryPage></CategoryPage>
         </Suspense>
  )
}

export default page