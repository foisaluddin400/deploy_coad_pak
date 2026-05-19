"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Card,
  Row,
  Col,
  Select,
  Spin,
} from "antd";
import { ArrowLeft } from "lucide-react";
import loginImg from "../../../../public/Home/login.png";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginUserMutation } from "@/redux/Api/userApi";
import { toast } from "react-toastify";

const { Title, Text } = Typography;
const { Option } = Select;
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const roleFromQuery = searchParams.get("role") || "";

  useEffect(() => {
    if (roleFromQuery) {
      form.setFieldsValue({ role: roleFromQuery });
    }
  }, [roleFromQuery, form]);

  const onFinish = async (values) => {
    const data = {
      ...values,
      email: values.email.toLowerCase(),
    };
    setLoading(true);
    try {
      const res = await loginUser(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        setLoading(false);
        const isBrowser =
          typeof window !== "undefined" && typeof localStorage !== "undefined";
        if (isBrowser) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          Cookies.set("accessToken", res.data.accessToken)
        }
        setTimeout(() => {
          window.location.href = "/";
        }, 300);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error(err?.data?.message || "Login failed");
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
                level={1}
                style={{ marginBottom: "8px", color: "#1f2937" }}
              >
                Login to Account
              </Title>
              <Text
                style={{
                  color: "#6b7280",
                  marginBottom: "32px",
                  display: "block",
                }}
              >
                Please enter your email and password to continue as{" "}
                {roleFromQuery}
              </Text>

              <Form
                form={form}
                requiredMark={false}
                name="login"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Email address"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    className="py-3"
                    placeholder="your_email@example.com"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    className="py-3"
                    placeholder="••••••••"
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Select Role"
                  name="role"
                  rules={[{ required: true, message: "Please select Role!" }]}
                >
                  <Select
                    style={{ height: "48px" }}
                    placeholder="Select Role"
                    className="w-full"
                  >
                    <Option value="Buyer">Log in as a Buyer</Option>
                    <Option value="Seller">Log in as a Seller</Option>
                    <Option value="Broker">Log in as a Broker</Option>
                    <Option value="Francise Seller">
                      Log in as a Franchise Seller
                    </Option>
                    <Option value="Investor">Log in as an Investor</Option>
                    <Option value="Business Idea Lister">
                      Log in as a Business Idea Lister
                    </Option>
                    <Option value="Asset Seller">
                      Log in as a Business Asset Seller
                    </Option>
                  </Select>
                </Form.Item>

                <Row justify="space-between" style={{ marginBottom: "24px" }}>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    style={{ margin: 0 }}
                  >
                    <Checkbox>Remember Password</Checkbox>
                  </Form.Item>
                  <Button
                    type="link"
                    style={{ color: "#3b82f6", padding: 0 }}
                    onClick={() => router.push("/auth/forgot-password")}
                  >
                    Forgot Password?
                  </Button>
                </Row>

                <Form.Item>
                  <button
                    className={`login-btn w-full py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
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
                      "Log In"
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
                Don&apos;t have an account?{" "}
                <Button
                  type="link"
                  className="hover:underline"
                  style={{ color: "#3b82f6", padding: 0 }}
                  onClick={() => router.push("/auth/choose-role")}
                >
                  Sign up
                </Button>
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
