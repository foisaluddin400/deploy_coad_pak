"use client";

import React, { useEffect, useState } from "react";
import { Card, Input, Button, Upload, Form, Typography, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";


import { useGetProfileQuery } from "@/redux/Api/userApi";

import Investor from "@/components/nda/Investor";
import Idealister from "@/components/nda/Idealister";
import Franchise from "@/components/nda/Franchise";
import Assest from "@/components/nda/Assest";
import Broker from "@/components/nda/Broker";
import Sell from "@/components/nda/Sell";
import Buyer from "@/components/nda/Buyer";

import Logo from "../../../public/Home/logo2.png";
import sign from "../../../public/country-icons/sign.png";
import { toast } from "react-toastify";
import { useAddNdaMutation } from "@/redux/Api/ndaApi";

const { Title, Paragraph, Text } = Typography;

const Seller = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const MAX_FILE_SIZE = 9 * 1024 * 1024; // 9MB
  const beforeUpload = (file) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) toast.error("Only PDF files are allowed.");
    const isLt9M = file.size < MAX_FILE_SIZE;
    if (!isLt9M) toast.error("File must be smaller than 9MB!");
    return isPDF && isLt9M;
  };

  const [addNda] = useAddNdaMutation();
  const { data: profileData } = useGetProfileQuery();
  const role = profileData?.data?.role;

const onFinish = async (values) => {
  setLoading(true);
  try {
    const formData = new FormData();

    // Append text fields
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("nidPassportNumber", values.nidPassportNumber);

    // Append all PDF files under the same key 'nda-file'
    const pdfFields = ["passportNationalIDNumber", "uploadTradeLicense", "signature"];
    pdfFields.forEach((field) => {
      const fileList = values[field];
      if (fileList?.[0]?.originFileObj) {
        formData.append("nda-file", fileList[0].originFileObj);
      }
    });

    const res = await addNda(formData).unwrap();
    toast.success(res.message);
    form.resetFields();
  } catch (error) {
    console.error(error);
    toast.error(error?.data?.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="pt-11 lg:pt-0">
      <div className="min-h-screen py-10 px-4">
        <Card className="container m-auto lg:p-10 shadow-xl">
          {/* Role-wise form components */}
          {role === "Investor" && <Investor />}
          {role === "Business Idea Lister" && <Idealister />}
          {role === "Francise Seller" && <Franchise />}
          {role === "Asset Seller" && <Assest />}
          {role === "Broker" && <Broker />}
          {role === "Seller" && <Sell />}
          {role === "Buyer" && <Buyer />}

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="md:grid grid-cols-2 gap-8">
              {/* Left Side */}
              <div>
                <Title level={4}>First Party</Title>

                <Form.Item
                  label=" Full Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your full name" },
                  ]}
                >
                  <Input
                    className="w-full bg-transparent  py-3"
                    size="large"
                    placeholder="Enter full name"
                  />
                </Form.Item>

                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                >
                  <Input
                    className="w-full bg-transparent  py-3"
                    size="large"
                    placeholder="Enter email address"
                  />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input
                    className="w-full bg-transparent  py-3"
                    size="large"
                    placeholder="Enter phone number"
                  />
                </Form.Item>
                <Form.Item
                  label="Passport/National ID Number"
                  name="nidPassportNumber"
                  rules={[
                    { required: true, message: "Please enter ID number" },
                  ]}
                >
                  <Input
                    className="w-full bg-transparent py-3"
                    size="large"
                    placeholder="Enter ID number"
                  />
                </Form.Item>

                <div className="grid md:grid-cols-3 gap-4">
                  <Form.Item
                    label="Passport/National ID PDF"
                    name="passportNationalIDNumber"
                    valuePropName="fileList"
                    getValueFromEvent={(e) =>
                      Array.isArray(e) ? e : e?.fileList
                    }
                  >
                    <Upload
                      style={{ width: "100%" }}
                      beforeUpload={beforeUpload}
                      maxCount={1}
                      accept=".pdf"
                      listType="text"
                    >
                      <Button
                        style={{ width: "100%", height: "48px" }}
                        icon={<UploadOutlined />}
                      >
                        Upload PDF
                      </Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item
                    label="Upload Trade License"
                    name="uploadTradeLicense"
                    valuePropName="fileList"
                    getValueFromEvent={(e) =>
                      Array.isArray(e) ? e : e?.fileList
                    }
                  >
                    <Upload
                      style={{ width: "100%" }}
                      beforeUpload={beforeUpload}
                      maxCount={1}
                      accept=".pdf"
                      listType="text"
                    >
                      <Button
                        style={{ width: "100%", height: "48px" }}
                        icon={<UploadOutlined />}
                      >
                        Upload PDF
                      </Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item
                    label="Signature"
                    name="signature"
                    valuePropName="fileList"
                    getValueFromEvent={(e) =>
                      Array.isArray(e) ? e : e?.fileList
                    }
                  >
                    <Upload
                      style={{ width: "100%" }}
                      beforeUpload={beforeUpload}
                      maxCount={1}
                      accept=".pdf"
                      listType="text"
                    >
                      <Button
                        style={{ width: "100%", height: "48px" }}
                        icon={<UploadOutlined />}
                      >
                        Upload PDF
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>

                <Form.Item>
                   <button
                    className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
                      loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-[#3b82f6] hover:bg-blue-500"
                    }`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spin size="small" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </Form.Item>
              </div>

              {/* Right Side */}
              <div>
                <Title level={4}>
                  Second Party (ProfitableBusinessesForSale.com)
                </Title>
                <Paragraph className="mb-1">
                  <strong>Full Name:</strong> Global IPQ LLC
                  (ProfitableBusinessesForSale.com)
                </Paragraph>
                <Paragraph className="mb-1">
                  <strong>Email:</strong> info@ProfitableBusinessesForSale.com
                </Paragraph>
                <Paragraph className="mb-4">
                  <strong>Signature:</strong>
                </Paragraph>

                <Image
                  src={sign}
                  alt="Signature"
                  width={128}
                  height={64}
                  className="mb-2"
                />
                <Text type="secondary">{formattedTime}</Text>

                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center gap-3">
                    <Image src={Logo} alt="Logo" width={50} height={50} />
                    <div>
                      <p className="text-2xl font-bold text-[#F59E0B]">
                        P B F S
                      </p>
                      <p className="text-[#F59E0B]">From Listings to Legacy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Seller;
