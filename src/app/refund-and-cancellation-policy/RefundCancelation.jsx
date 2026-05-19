'use client'
import Header from '@/components/shared/Header';
import { useGetRefundPolicyQuery } from '@/redux/Api/refundPolicyApi';

import { Typography } from 'antd';
import { useEffect } from 'react';

const { Text } = Typography;
const Refund = () => {
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
      const { data: privecy } = useGetRefundPolicyQuery();
  return (
     <div className="text-[#000000]">
            <Header
                title="Refund and Cancellation Policy"
                description="Please read our Refund and Cancellation terms carefully before using our services."
            />

            <div className="container mx-auto px-5 pt-20 pb-10 ">
        <div>
          

          <div className="mt-5">
            {privecy?.data?.description ? (
              <div
                dangerouslySetInnerHTML={{ __html: privecy?.data?.description }}
              />
            ) : (
              <p>No Data</p>
            )}
          </div>
        </div>
      </div>
        </div>
  )
}

export default Refund