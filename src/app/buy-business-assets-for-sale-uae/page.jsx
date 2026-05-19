

import React, { Suspense } from 'react'
import AssetsSale from './BuyBusinessAssetsForSaleUae';



export const metadata = {
  title: "Buy Business Assets for Sale UAE | PBFS Marketplace  ",
  description:
    "Buy business assets for sale UAE including equipment, vehicles & digital assets. Explore verified listings on PBFS and reduce startup costs today.",
   alternates: {  canonical: "https://profitablebusinessesforsale.com/buy-business-assets-for-sale-uae/"
   },
};

const Page = () => {

  return (
    <div>
       <Suspense fallback={<p>loading..</p>}>
      <AssetsSale></AssetsSale>
      </Suspense>
    </div>
  )
}

export default Page