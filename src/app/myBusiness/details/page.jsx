import React, { Suspense } from 'react'
import MyBusiness from './MyBusinessDetails'
import ProtectedRoute from '@/components/ProtectedRoute'



const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
     <ProtectedRoute><MyBusiness></MyBusiness></ProtectedRoute>
      </Suspense>
    </div>
  )
}

export default Page