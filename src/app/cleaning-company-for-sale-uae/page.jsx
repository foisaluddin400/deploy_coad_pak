import React, { Suspense } from 'react'
import CleaningCompany from './CleaningCompanyForSaleUAE'

export const metadata = {
  title: "Cleaning Company for Sale in UAE",
  description:
    "Explore profitable cleaning company for sale in UAE. Established business, strong client base, and growth potential. Enquire today for details!",
  alternates: {
    canonical: "https://profitablebusinessesforsale.com/cleaning-company-for-sale-UAE"
  },
};

const Page = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the average cost of a cleaning company for sale in UAE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The price of a cleaning company for sale in UAE depends on contracts, staff size, vehicles, equipment, and revenue."
        }
      },
      {
        "@type": "Question",
        "name": "Is a cleaning company profitable in the UAE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, a well-managed cleaning company can be profitable because homes, offices, and businesses need regular cleaning services throughout the year."
        }
      },
      {
        "@type": "Question",
        "name": "Why buy an existing cleaning company instead of starting new?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Buying an existing company may include staff, clients, systems, equipment, and contracts."
        }
      }
      // 👉 baki questions bhi yahin add kar dena (same format)
    ]
  };

  return (
    <>
      {/* ✅ FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div>
        <Suspense fallback={<p>loading..</p>}>
          <CleaningCompany />
        </Suspense>
      </div>
    </>
  )
}

export default Page