'use client'

import { Collapse, ConfigProvider } from 'antd';
import React from 'react';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import Header from '@/components/shared/Header';
import { useGetFaqQuery } from '@/redux/Api/faqApi';


const FaqBuyer = () => {
  const { data: faq, isLoading } = useGetFaqQuery({ userRole: 'Buyer' });

  const items =
    faq?.data?.map((item, index) => ({
      key: String(index + 1),
      label: item.question,
      children: <p>{item.answer}</p>,
    })) || [];

  return (
    <div>
      <Header
        title="Frequently Asked Questions"
        description="Answers to common questions about buying, selling, and using our platform."
      />

      <div className="container m-auto py-11">
        <h1 className="text-3xl mb-4 font-bold">
          FAQ for <span className="text-[#22C55E]">Buyer</span>
        </h1>

        {isLoading ? (
          <p>Loading FAQs...</p>
        ) : items.length > 0 ? (
          <ConfigProvider
            theme={{
              components: {
                Collapse: {
                  fontHeight: 32,
                  fontSize: 20,
                  fontHeightLG: 20,
                  fontSizeIcon: 20,
                },
              },
            }}
          >
            <Collapse
              defaultActiveKey={['1']}
              items={items}
              style={{ border: 'none' }}
              expandIconPosition="right"
              expandIcon={({ isActive }) =>
                isActive ? (
                  <FaMinusCircle style={{ fontSize: '16px', color: 'black' }} />
                ) : (
                  <FaPlusCircle style={{ fontSize: '16px', color: 'black' }} />
                )
              }
            />
          </ConfigProvider>
        ) : (
          <p>No FAQs available.</p>
        )}
      </div>
    </div>
  );
};

export default FaqBuyer;
