import React, { Suspense } from 'react'


import SubscriptionPlan from './Plane'
import ProtectedRoute from '@/components/ProtectedRoute'

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
 <ProtectedRoute> <SubscriptionPlan></SubscriptionPlan></ProtectedRoute>

      </Suspense>
    </div>
  )
}

export default Page