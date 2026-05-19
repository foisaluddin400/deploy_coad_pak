import React, { Suspense } from 'react'


import EditProfile from './EditProfile'

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
  
<EditProfile></EditProfile>
      </Suspense>
    </div>
  )
}

export default Page