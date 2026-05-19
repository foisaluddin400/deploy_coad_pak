"use client";

import { useEffect, useState } from "react";
import { Form, Input, Spin } from "antd";
import { Facebook, Instagram } from "lucide-react";
import { IoMailOpenOutline } from "react-icons/io5";
import img from "../../../public/contact-us.png";
import { useGetProfileQuery } from "@/redux/Api/userApi";

import Header from "@/components/shared/Header";
import { toast } from "react-toastify";

import ReactPhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { useAddContactMutation } from "@/redux/Api/contactApi";
export default function ContactUs() {
  const [form] = Form.useForm();
  const { data: profileData } = useGetProfileQuery();
  const [addContact] = useAddContactMutation();
  const [loading, setLoading] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (profileData) {
      form.setFieldsValue({
        email: profileData?.data?.email,
      });
    }
  }, [profileData, form]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await addContact(values).unwrap();
      toast.success(res?.message);
      router.push("/contact-us/sent-successfull");
      setLoading(false);

      form.resetFields();
    } catch (error) {
      setLoading(false);
      toast.error(error?.data?.message || "Failed to send message.");
    }
  };

  return (
    <>
      <Header
        title="Contact Us"
        description="Get in touch with us for any inquiries or questions."
      />

      <div className="flex items-center justify-center px-5 md:py-10">
        <div className="container mx-auto w-full bg-white rounded-2xl shadow-2xl overflow-hidden my-20">
          <div className="flex flex-col lg:flex-row">
            {/* Left Image & Social */}
            <section
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
              }}
              className="lg:w-2/6 bg-gradient-to-br from-blue-500 via-blue-400 to-green-400 p-5 lg:p-10 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="mt-8">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Follow Us On
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/share/1J7PbBaf1G/?mibextid=wwXIfr"
                    className="w-10 h-10 bg-black bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://www.instagram.com/profitablebusinessesforsale"
                    className="w-10 h-10 bg-black bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="mailto:info@profitablebusinessesforsale.com"
                    className="w-10 h-10 bg-black bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <IoMailOpenOutline className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </section>

            {/* Contact Form */}
            <section className="lg:w-4/6 p-5 lg:p-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Get In Touch With Us
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                At ProfitableBusinessesForSale.com, our team is here to guide
                you every step of the way.
              </p>

              <Form
                form={form}
                requiredMark={false}
                layout="vertical"
                onFinish={handleSubmit}
                
              >
               <div className="grid grid-cols-2 gap-4">
                 <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                  className="col-span-2 md:col-span-1"
                >
                  <Input
                    className="w-full bg-transparent  py-3"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your last name!" },
                  ]}
                  className="col-span-2 md:col-span-1"
                >
                  <Input
                    className="w-full bg-transparent  py-3"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Form.Item>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                
                >
                  <Input
                    className="w-full bg-transparent  py-3"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Item>

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
                    inputStyle={{ width:'100%', height: "48px" }}
                  />
                </Form.Item>
               </div>

                <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                    { required: true, message: "Please input your message!" },
                  ]}
                  className="col-span-2"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Type Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </Form.Item>

                <Form.Item className="col-span-2">
                  <button
                    type="submit"
                    className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
                      loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-[#3b82f6] hover:bg-blue-500"
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spin size="small" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </Form.Item>
              </Form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
