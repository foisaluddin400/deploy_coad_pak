"use client";
import { Form, Select, Spin } from "antd";
import ReactPhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { useGetProfileQuery } from "@/redux/Api/userApi";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { usePostScheduleMutation } from "@/redux/Api/shedualApi";

const { Option } = Select;

const SchedualeCall = () => {
  const [loading, setLoading] = useState(false);
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
  const userId = profileData?.data?._id;
  const isBrowser =
    typeof window !== "undefined" && typeof localStorage !== "undefined";
  const user = isBrowser ? JSON.parse(localStorage.getItem("user")) : null;
  const [contactNo, setContactNo] = useState("");
  const [addSchedule] = usePostScheduleMutation();
  const [form] = Form.useForm();
 const router = useRouter();
  // const navigate = useNavigate();

  const handleSearch = async (values) => {
    const data = {
      userId,
      name: values?.fullName,
      email: values?.email,
      phone: values?.phone,
      date: values?.preferredDate,
      time: values?.preferredTime,
      timeZone: values?.timeZone,
      topic: values?.meetingTopic,
      note: values?.notes || "",
    };
    setLoading(true);
    try {
      const res = await addSchedule(data).unwrap();

      toast.success(res?.message);
      setLoading(false);
      form.resetFields();
router.push("/business-schedule/sent-successfull");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error?.data?.message || "Failed to schedule call.");
    }
  };
  return (
    <div className="relative max-w-7xl mx-auto px-5 pt-20 pb-10 rounded-lg shadow-sm">
      <div className="relative flex flex-col items-start gap-5 pl-5 mb-10">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#22C55E] z-[1] rounded-r-full"></div>
        <div className="ml-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0091FF] mb-6 leading-tight">
            Schedule a call
          </h1>
          <p className="text-lg md:text-xl text-[#000000] leading-relaxed max-w-2xl">
            Let’s connect and discuss your goals.
          </p>
        </div>
      </div>

      <Form
        form={form}
        onFinish={handleSearch}
        layout="vertical"
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border border-gray-300 px-4 py-3 rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 px-4 py-3 rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Preferred Date"
          name="preferredDate"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <input
            type="date"
            className="w-full border border-gray-300 px-4 py-3 rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Preferred Time"
          name="preferredTime"
          rules={[{ required: true, message: "Please select a time" }]}
        >
          <input
            type="time"
            className="w-full border border-gray-300 px-4 py-3 rounded-md"
          />
        </Form.Item>

        <div className="md:grid grid-cols-2 gap-4">
          <Form.Item
            label="Time Zone"
            name="timeZone"
            className="col-span-2"
            rules={[
              { required: true, message: "Please select your time zone" },
            ]}
          >
            <Select
              style={{ height: "50px" }}
              placeholder="Select your time zone"
            >
              <Option value="UTC-12:00">GMT -12:00</Option>
              <Option value="UTC-11:00">GMT -11:00</Option>
              <Option value="UTC-10:00">GMT -10:00</Option>
              <Option value="UTC-09:30">GMT -09:30</Option>
              <Option value="UTC-09:00">GMT -09:00</Option>
              <Option value="UTC-08:00">GMT -08:00</Option>
              <Option value="UTC-07:00">GMT -07:00</Option>
              <Option value="UTC-06:00">GMT -06:00</Option>
              <Option value="UTC-05:00">GMT -05:00</Option>
              <Option value="UTC-04:30">GMT -04:30</Option>
              <Option value="UTC-04:00">GMT -04:00</Option>
              <Option value="UTC-03:30">GMT -03:30</Option>
              <Option value="UTC-03:00">GMT -03:00</Option>
              <Option value="UTC-02:00">GMT -02:00</Option>
              <Option value="UTC-01:00">GMT -01:00</Option>
              <Option value="UTC+00:00">GMT +00:00 (UTC)</Option>
              <Option value="UTC+01:00">GMT +01:00</Option>
              <Option value="UTC+02:00">GMT +02:00</Option>
              <Option value="UTC+03:00">GMT +03:00</Option>
              <Option value="UTC+03:30">GMT +03:30</Option>
              <Option value="UTC+04:00">GMT +04:00</Option>
              <Option value="UTC+04:30">GMT +04:30</Option>
              <Option value="UTC+05:00">GMT +05:00</Option>
              <Option value="UTC+05:30">GMT +05:30</Option>
              <Option value="UTC+05:45">GMT +05:45</Option>
              <Option value="UTC+06:00">
                GMT +06:00 (Bangladesh / Sri Lanka)
              </Option>
              <Option value="UTC+06:30">GMT +06:30</Option>
              <Option value="UTC+07:00">GMT +07:00</Option>
              <Option value="UTC+08:00">GMT +08:00</Option>
              <Option value="UTC+08:30">GMT +08:30</Option>
              <Option value="UTC+09:00">GMT +09:00</Option>
              <Option value="UTC+09:30">GMT +09:30</Option>
              <Option value="UTC+10:00">GMT +10:00</Option>
              <Option value="UTC+10:30">GMT +10:30</Option>
              <Option value="UTC+11:00">GMT +11:00</Option>
              <Option value="UTC+12:00">GMT +12:00</Option>
              <Option value="UTC+12:45">GMT +12:45</Option>
              <Option value="UTC+13:00">GMT +13:00</Option>
              <Option value="UTC+14:00">GMT +14:00</Option>
            </Select>
          </Form.Item>

          <div className=" gap-4">
            <Form.Item
              label="Phone Number"
              name="phone"
              required
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number!",
                },
              ]}
            >
              <ReactPhoneInput
                country={"us"}
                value={contactNo}
                onChange={(value) => setContactNo(value)}
                inputStyle={{ width: "100%", height: "48px" }}
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          label="Meeting Topic"
          name="meetingTopic"
          className="col-span-2"
          rules={[{ required: true, message: "Please enter the topic" }]}
        >
          <input
            type="text"
            placeholder="Briefly describe the purpose"
            className="w-full border border-gray-300 px-4 py-3 rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Additional Notes (Optional)"
          name="notes"
          className="col-span-2"
        >
          <textarea
            rows={4}
            placeholder="Add any extra details or requests"
            className="w-full border border-gray-300 px-4 py-3 rounded-md"
          />
        </Form.Item>

        <Form.Item className="col-span-2">
          <button
            className={`w-[200px] py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
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
              "Request A Call"
            )}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SchedualeCall;
