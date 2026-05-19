"use client";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Spin,
} from "antd";

import { IoCameraOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

import { Country } from "country-state-city";
import { Navigate } from "@/components/shared/Navigate";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/Api/userApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { toast } from "react-toastify";
const EditProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data: profileData, isLoading } = useGetProfileQuery();
  const [loading, setLoading] = useState(false);

  const [updateProfile] = useUpdateProfileMutation();
  const [image, setImage] = useState();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const router = useRouter();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (image) formData.append("profile-image", image);
      formData.append("name", values?.name);
      formData.append("mobile", values?.mobile);
      formData.append("country", values?.country);
      formData.append("profession", values?.profession);
      formData.append("description", values?.description);

      const res = await updateProfile(formData);

      toast.success(res.data.message);
      setLoading(false);
      router.push("/profilePage");
    } catch (e) {
      setLoading(false);
      toast.error("Image max 1 mb");
    } finally {
    }
  };
  useEffect(() => {
    if (profileData?.data) {
      const admin = profileData?.data;
      form.setFieldsValue({
        name: admin?.name,
        email: admin?.email,
        mobile: admin?.mobile || "",
        country: admin?.country || "",
        profession: admin?.profession || "",
        description: admin?.description || "",
        // address: admin.address || "",
      });
    }
  }, [profileData, form]);

  return (
    <div className="container m-auto md:mt-10 mt-20">
      <Navigate title={"Edit profile "}></Navigate>
      <div className="bg-white p-3">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="text-center mb-6">
            <div className="relative w-[140px] h-[124px] mx-auto">
  <input
    type="file"
    onChange={handleImageChange}
    id="img"
    style={{ display: "none" }}
  />

  {/* ✅ Use Next.js Image */}
  <Image
    src={
      image
        ? URL.createObjectURL(image)
        : profileData?.data?.image
        ? `${imageUrl}/uploads/profile-image/${profileData?.data?.image}`
        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    }
    alt="Admin Profile"
    width={140}
    height={140}
    className="rounded-full w-[140px] h-[140px] object-cover"
  />

  <label
    htmlFor="img"
    className="absolute top-[80px] -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
  >
    <IoCameraOutline className="text-black" />
  </label>
</div>


            <p className="text-lg font-semibold mt-4">
              {profileData?.data?.name}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input
                className="w-full bg-transparent  py-3"
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input Email!" }]}
            >
              <Input
                disabled
                className="w-full bg-transparent py-3"
                placeholder="Email"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Conatct Number"
              name="mobile"
              rules={[
                { required: true, message: "Please input Contact Number!" },
              ]}
            >
              <Input
                className="w-full bg-transparent py-3"
                placeholder="Contact Number"
              />
            </Form.Item>
            <Form.Item label="Profession" name="profession">
              <Input
                className="w-full bg-transparent  py-3"
                placeholder="Profession"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Select Your Country"
            name="country"
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select
              placeholder="Select your country"
              style={{ height: "48px" }}
              showSearch
              allowClear
              optionLabelProp="label"
            >
              {countries?.map((country) => (
                <Select.Option
                  key={country?.isoCode}
                  value={country?.name}
                  label={country?.name}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={`https://flagcdn.com/w20/${country?.isoCode.toLowerCase()}.png`}
                      alt={country?.name}
                      width={20}
                      height={15}
                      className="object-cover"
                    />
                    {country?.name}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea
              className="w-full py-2"
              rows={4}
              placeholder="Type Here..."
            />
          </Form.Item>

          <Form.Item className=" pt-3">
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
                "Update Profile"
              )}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
