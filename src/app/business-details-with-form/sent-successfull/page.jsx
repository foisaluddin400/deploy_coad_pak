'use client';
import React from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const SuccessPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full border rounded-2xl overflow-hidden">

        {/* Success indicator header */}
        <div className="bg-green-600 px-8 py-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-md">
            <CheckCircle className="w-10 h-10 text-green-600" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Thank You
          </h1>
        </div>

        {/* Main content */}
        <div className="p-8 md:p-12 space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            Thank you for getting in touch with <strong>ProfitableBusinessesForSale.com (PBFS)</strong>.
          </p>
          <p>
            We appreciate your interest and are delighted to assist you with buying or selling a business or
            franchise.
          </p>
          <p>
            One of our dedicated representatives will review your inquiry and contact you shortly with the next
            steps.
          </p>

          <p>
            If your matter is urgent, please feel free to reach out to us directly via email
            <Link
              href="mailto:info@profitablebusinessesforsale.com"
              className="text-green-600 hover:text-green-700 font-medium mx-1 break-all"
            >
              info@profitablebusinessesforsale.com
            </Link>
            or WhatsApp
            <Link
              href="https://wa.me/971522294008"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-medium mx-1"
            >
              +971 52 229 4008
            </Link>.
          </p>

          <p>
            We look forward to supporting you on your business journey.
          </p>

          <p>
            Regards,<br />
            Team- PBFS
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="bg-gray-50 px-8 py-8 border-t flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm text-center"
          >
            Back to Home
          </Link>

          <button
          onClick={() => router.back()} 
            className="bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 rounded-lg font-medium transition-colors text-center"
          >
            Previous page
          </button>
        </div>

        {/* Footer */}
        <div className="text-center py-5 text-sm text-gray-500 bg-white border-t">
          © {new Date().getFullYear()} ProfitableBusinessesForSale.com
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
