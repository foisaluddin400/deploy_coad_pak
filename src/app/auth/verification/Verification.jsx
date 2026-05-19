'use client';

import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Input, Row, Spin } from "antd";
import loginImg from "../../../../public/Home/login.png";// Ensure this path is correct relative to the component
import { Typography, message } from "antd";
import { useRouter } from "next/navigation"; // Replace useNavigate with useRouter

import Image from "next/image"; // Import Image from next/image
import { useResendOtpMutation, useVerifyOtpMutation } from "@/redux/Api/userApi";
import { toast } from "react-toastify";


const { Title, Text } = Typography;

function Verification() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loading, setLoading] = useState(false);
  const [verifyOtp] = useVerifyOtpMutation();
  const [resentOtp] = useResendOtpMutation();
  const router = useRouter(); // Use Next.js useRouter hook
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onFinish = async (values) => {
    const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";
    const email = isBrowser ? localStorage.getItem("email") : null;
    const code = values.otp;

    const data = {
      email: isBrowser ? localStorage.getItem("email") : null,
      role: isBrowser ? localStorage.getItem("role") : null,
      code: code,
    };

    if (!email || !code) {
      toast.error("Missing email or OTP");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp(data).unwrap();

      if (res?.success) {
        toast.success(res?.message);
        setLoading(false);
        if (isBrowser) {
          localStorage.setItem("otp", code);
        }

        setTimeout(() => {
          router.push("/auth/update-password");
        }, 300); // Use router.push for navigation
      } else {
        toast.error(res?.message || "Verification failed");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    const data = {
      email: (typeof window !== "undefined" && typeof localStorage !== "undefined") ? localStorage.getItem("email") : null,
      role: (typeof window !== "undefined" && typeof localStorage !== "undefined") ? localStorage.getItem("role") : null,
    };

    try {
      await resentOtp(data)
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
        });
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative flex items-center justify-center md:p-20 p-4">
      <div className="absolute w-full h-full flex">
        <div className="bg-[#1d4ed8] w-[30%] h-full"></div>
        <div className="bg-[#fff] w-[70%] h-full"></div>
      </div>
      <Row
        gutter={[16, 16]}
        className="w-full max-w-screen-2xl shadow-2xl mt-16 md:mt-0 mx-auto min-h-[600px]"
      >
        <Col className="hidden md:block relative" xs={0} md={12}>
          <div className="relative h-full">
            <Image
              src={loginImg}
              alt="Verification Background"
              layout="fill" // Use fill to match bg-cover behavior
              objectFit="cover" // Equivalent to bg-cover
              objectPosition="center" // Equivalent to bg-center
              className="rounded-l-sm"
              priority={true} // Prioritize loading for above-the-fold image
            />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <Card
            style={{
              height: "100%",
              border: "none",
            }}
            bodyStyle={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", margin: "0 auto" }}>
              <Title
                level={1}
                style={{ marginBottom: "8px", color: "#1f2937" }}
              >
                Forget Password?
              </Title>
              <Text style={{ marginBottom: "8px", color: "#1f2937" }}>
                Please enter your email to get verification code
              </Text>

              <Form
                requiredMark={false}
                name="login"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Verification Code"
                  name="otp"
                  rules={[
                    { required: true, message: "Please input your OTP!" },
                  ]}
                >
                  <Input.OTP
                    size="large"
                    name="otp"
                    rules={[
                      {
                        required: true,
                        message: "Please input your OTP!",
                      },
                    ]}
                    onChange={onChange}
                    value={value}
                    length={6}
                  />
                </Form.Item>

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
                      "Continue"
                    )}
                  </button>
                </Form.Item>
              </Form>
              <Text style={{ marginBottom: "8px", color: "#1f2937" }}>
                You have not received the email?
                <span
                  onClick={resendOtp}
                  style={{ color: "#3b82f6", cursor: "pointer" }}
                >
                  Resend
                </span>
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Verification;