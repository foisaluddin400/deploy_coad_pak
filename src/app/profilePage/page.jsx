import React, { Suspense } from 'react'


import ProfilePage from './ProfilePage'
import ProtectedRoute from '@/components/ProtectedRoute'

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
  
<ProtectedRoute><ProfilePage></ProfilePage></ProtectedRoute>
      </Suspense>
    </div>
  )
}

export default Page