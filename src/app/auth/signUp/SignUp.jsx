"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Row,
  Col,
  message,
  Select,
  Spin,
} from "antd";
import { ArrowLeft } from "lucide-react";
import loginImg from "../../../../public/Home/login.png"; // adjust path
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country } from "country-state-city";
import { useRegisterUserMutation } from "@/redux/Api/userApi";
import { toast } from "react-toastify";


const { Title, Text } = Typography;

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [signUp] = useRegisterUserMutation();
  const [contactNo, setContactNo] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [countries, setCountries] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleFromQuery = searchParams.get("role") || "";
  console.log(roleFromQuery);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCountries(Country.getAllCountries());
  }, []);

  const onFinish = async (values) => {
    try {
      const data = {
        name: values.name,
        email: values.email.toLowerCase(),
        password: values.password,
        confirmPassword: values.confirmPassword,
        mobile: contactNo,
        country: values.country,
        role: roleFromQuery,
      };
      setLoading(true);

      const res = await signUp(data).unwrap();

      toast.success(res?.message);
      setLoading(false);

      localStorage.setItem("email", values?.email);
      localStorage.setItem("role", roleFromQuery);

      setTimeout(() => {
        router.push("/auth/verifyCreator");
      }, 300);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!"); // simple error toast
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center md:p-20 py-28">
      <div className="absolute w-full h-full flex">
        <div className="bg-[#1d4ed8] w-[30%] h-full"></div>
        <div className="bg-[#fff] w-[70%] h-full"></div>
      </div>
      <Row
        gutter={[16, 16]}
        className="w-full max-w-screen-2xl shadow-2xl mx-auto min-h-[600px]"
      >
        <Col className="hidden md:block relative" xs={0} md={12}>
          <div className="absolute inset-0 rounded-l-sm overflow-hidden">
            <Image
              src={loginImg}
              alt="Login Banner"
              fill
              style={{ objectFit: "cover" }}
            />
            <Button
              type="text"
              icon={<ArrowLeft size={20} />}
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                color: "white",
                zIndex: 1,
              }}
            />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <Card
            style={{ height: "100%", border: "none" }}
            bodyStyle={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", margin: "0 auto" }}>
              <Title
                level={2}
                style={{ marginBottom: "8px", color: "#1f2937" }}
              >
                Create Your Account
              </Title>

              <Form
                requiredMark={false}
                name="signup"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input placeholder="John Doe" style={{ height: "48px" }} />
                </Form.Item>

                <Form.Item
                  label="Email address"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    placeholder="example@gmail.com"
                    style={{ height: "48px" }}
                  />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="mobile"
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

                <Form.Item
                  label="Select Your Country"
                  name="country"
                  rules={[
                    { required: true, message: "Please select your country!" },
                  ]}
                >
                  <Select
                    placeholder="Select your country"
                    style={{ height: "48px" }}
                    showSearch
                    allowClear
                    optionLabelProp="label"
                  >
                    {countries.map((country) => (
                      <Select.Option
                        key={country.isoCode}
                        value={country.name}
                        label={country.name}
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={`https://flagcdn.com/w20/${country.isoCode.toLowerCase()}.png`}
                            alt={country.name}
                            width={20}
                            height={12}
                          />
                          {country.name}
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    placeholder="••••••••"
                    style={{ height: "48px" }}
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    placeholder="••••••••"
                    style={{ height: "48px" }}
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  <button
                    className={`signup-btn w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
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
                      "Sign Up"
                    )}
                  </button>
                </Form.Item>
              </Form>

              <Text
                style={{
                  textAlign: "center",
                  display: "block",
                  color: "#6b7280",
                }}
              >
                Already have an account?{" "}
                <Link href="/auth/login">
                  <Button
                    type="link"
                    className="hover:underline"
                    style={{ color: "#3b82f6", padding: 0 }}
                  >
                    Sign In
                  </Button>
                </Link>
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
