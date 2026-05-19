'use client'
import Header from "@/components/shared/Header";
import { useGetTermsConditionsQuery } from "@/redux/Api/metaApi";
import { Typography } from "antd";



const TermsAndConditionsPage = () => { // ✅ Capital Letter
  const { data: terms } = useGetTermsConditionsQuery();

  return (
    <div className="text-[#000000]">
      <Header
        title="Terms and Conditions"
        description="Please read these terms and conditions carefully before using our services."
      />

      <div className="container mx-auto px-5 pt-20 pb-10">
        <div>
          <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>

          <div>
            {terms?.data?.description ? (
              <div
                dangerouslySetInnerHTML={{ __html: terms?.data?.description }}
              />
            ) : (
              <p>No Data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
