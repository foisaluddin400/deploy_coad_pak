"use client";
import { useAddInterestMutation } from "@/redux/Api/businessApi";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import { Form, Input, Select, Button, message, Spin } from "antd";
import { useForm } from "antd/es/form/Form";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
const { TextArea } = Input;

export default function InterestForm({ businessId, businessRole }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [loading, setLoading] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [addInterest] = useAddInterestMutation();
  const isBrowser =
    typeof window !== "undefined" && typeof localStorage !== "undefined";
  const user = isBrowser ? JSON.parse(localStorage.getItem("user")) : null;
  const userId = user?._id;
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
 const router = useRouter();
  const email = profileData?.data?.email;

  const [form] = useForm();
  useEffect(() => {
    if (profileData?.data) {
      const admin = profileData?.data;
      const mobileStr = String(admin?.mobile || "").replace(/^\+880/, "0");

      form.setFieldsValue({
        name: admin?.name,
        email: admin?.email,
        mobile: mobileStr,
      });

      setContactNo(mobileStr);
    }
  }, [profileData, form]);
  const onFinish = async (values) => {
    const data = {
      userId: userId,
      name: values?.name,
      email: values?.email,
      activity: values?.activity,
      mobile: `+${contactNo}`,
      serviceZone: values?.serviceZone,
      message: values?.message,
      businessRole: businessRole,
      businessId: businessId,
      sector: values.sector,
    };
    setLoading(true);
    try {
      const res = await addInterest(data).unwrap();

      toast.success(res?.message);
      form.resetFields();
      setLoading(false);
      
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error?.data?.message || "Failed to schedule call.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-blue-600">
              I am Interested
            </h2>
          </div>
        </div>

        <div className="p-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              countryCode: "+971",
            }}
          >
            {/* Full Name */}
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input style={{ height: "48px" }} placeholder="Enter Full Name" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
                <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Invalid email address" },
                ]}
              >
                <Input style={{ height: "48px" }} placeholder="Enter Email" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                ]}
              >
                <ReactPhoneInput
                  country="bd"
                  value={contactNo}
                  onChange={(value) => {
                    setContactNo(value);
                    form.setFieldsValue({ mobile: value });
                  }}
                  inputStyle={{ width: "100%", height: "48px" }}
                  placeholder="Enter phone number"
                />
              </Form.Item>
            </div>

            {/* Sector and Activity */}
            <div className="">
              <Form.Item label="Sector" name="sector">
                <Select style={{ height: "48px" }} placeholder="Select One">
                  <Select.Option value="food-beverage">
                    Food & Beverage
                  </Select.Option>
                  <Select.Option value="retail">Retail</Select.Option>
                  <Select.Option value="technology">Technology</Select.Option>
                  <Select.Option value="healthcare">Healthcare</Select.Option>
                  <Select.Option value="education">Education</Select.Option>
                  <Select.Option value="real-estate">Real Estate</Select.Option>
                  <Select.Option value="automotive">Automotive</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Intended Offer" name="activity">
                <Input
                  style={{ height: "48px" }}
                  placeholder="Please write the amount you are willing to offer"
                />
              </Form.Item>
            </div>

   
            <div className="">
              <Form.Item label="Willing to Execute within" name="serviceZone">
                <Input
                  style={{ height: "48px" }}
                  placeholder="Please write the timeline in months i.e. 1 month, 2 months .."
                />
              </Form.Item>
            </div>

            {/* Message */}
            <Form.Item label="Message" name="message">
              <TextArea placeholder="Enter Your Message Here" rows={5} />
            </Form.Item>

            {/* Submit Button */}
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
          </Form>
        </div>
      </div>
    </div>
  );
}
