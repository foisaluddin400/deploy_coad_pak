import React, { Suspense } from 'react'
import LaundryBusiness from './LaundryBusinessForSaleInDubai'

export const metadata = {
  title: "Laundry Business for Sale in Dubai",
  description:
    "Explore profitable laundry business for sale in Dubai. Great investment opportunity with steady income, prime location, and growth potential.",
  alternates: {
    canonical: "https://profitablebusinessesforsale.com/laundry-business-for-sale-in-dubai"
  },
};

const Page = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the average cost of a salon business for sale in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The price of a salon business for sale in Dubai depends on location, setup quality, equipment, staff, and revenue. Small salons cost less than premium salons."
        }
      },
      {
        "@type": "Question",
        "name": "Is a salon business profitable in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, a well-managed salon can be profitable because customers return regularly for grooming, haircare, beauty treatments, and memberships throughout the year."
        }
      },
      {
        "@type": "Question",
        "name": "Why buy an existing salon instead of starting new?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Buying an existing salon may include equipment, interiors, staff, and active clients. This can save time, reduce setup delays, and help income start faster."
        }
      },
      {
        "@type": "Question",
        "name": "What should I check before buying a salon business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Check monthly sales, expenses, rent contract, staff agreements, customer retention, online reviews, equipment condition, and booking records before making a decision."
        }
      },
      {
        "@type": "Question",
        "name": "Can foreigners buy a salon business in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, foreign investors can buy a salon business in Dubai, subject to ownership rules, legal requirements, licensing approvals, and transfer procedures."
        }
      },
      {
        "@type": "Question",
        "name": "Do salon businesses need trained staff?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, salons usually depend on skilled staff such as stylists, beauticians, nail technicians, and reception teams to maintain service quality and customer satisfaction."
        }
      },
      {
        "@type": "Question",
        "name": "Can I grow a small salon after purchase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, many owners grow by adding memberships, new treatments, stronger marketing, retail products, referral programs, and improved online booking systems."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I find an existing business for sale in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Platforms like PBFS can help you find an existing business for sale in Dubai by connecting buyers with genuine business opportunities."
        }
      },
      {
        "@type": "Question",
        "name": "How can I sell business in Dubai later?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can sell business in Dubai more effectively by maintaining clean records, stable revenue, loyal clients, and listing on trusted business marketplaces like PBFS."
        }
      },
      {
        "@type": "Question",
        "name": "Is demand for salon services strong in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, demand is strong because Dubai has residents, tourists, professionals, and event clients who regularly spend on grooming and beauty services."
        }
      }
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
         <LaundryBusiness></LaundryBusiness>
        </Suspense>
      </div>
    </>
  )
}

export default Page