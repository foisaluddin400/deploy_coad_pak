'use client'
import Header from "@/components/shared/Header";
import { useGetPrivecyQuery } from "@/redux/Api/metaApi";
import { Typography } from "antd";
import { useEffect } from "react";

const { Text } = Typography;

const Privecy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: privecy } = useGetPrivecyQuery();

  return (
    <div className="text-[#000000]">
      <Header
        title="Privacy Policy"
        description="Please read these terms and conditions carefully before using our services."
      />

      <div className="container mx-auto px-5 pt-20 pb-10 ">
        <div>
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

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
  );
};

export default Privecy;
