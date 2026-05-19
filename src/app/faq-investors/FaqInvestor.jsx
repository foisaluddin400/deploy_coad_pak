'use client';

import { Collapse, ConfigProvider } from 'antd';
import React, { Suspense } from 'react';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import Header from '@/components/shared/Header';
import { useGetFaqQuery } from '@/redux/Api/faqApi';


const FaqContent = () => {
  const { data: faq, isLoading } = useGetFaqQuery({ userRole: 'Investor' });

  const items =
    faq?.data?.map((item, index) => ({
      key: String(index + 1),
      label: item.question,
      children: <p>{item.answer}</p>,
    })) || [];

  return (
    <div className="container mx-auto py-11">
      <h1 className="text-3xl mb-4 font-bold">
        FAQ for <span className="text-[#22C55E]">Investors</span>
      </h1>

      {isLoading ? (
        <p>Loading...</p>
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
                <FaMinusCircle
                  style={{ fontSize: '16px', color: 'black' }}
                />
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
  );
};

const FaqInvestors = () => {

  
  return (
    <div>
      <Header
        title="Frequently Asked Questions"
        description="Answers to common questions about buying, selling, and using our platform."
      />

      <Suspense fallback={<p>Loading FAQs...</p>}>
        <FaqContent />
      </Suspense>
    </div>
  );
};

export default FaqInvestors;
