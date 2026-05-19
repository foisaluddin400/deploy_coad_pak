import React, { Suspense } from 'react'
import ContactUs from './ContactUs'




export const metadata = {
  title: "Contact Us | Profitable Business For Sale (PBFS) ",
  description:
    "Reach PBFS via our contact page — we’re here to guide your franchise and business purchase journey with personalized support and fast responses. ",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/contact-us"
   },
};

const Page = () => {
  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
      <ContactUs></ContactUs>
      </Suspense>
    </div>
  )
}

export default Page