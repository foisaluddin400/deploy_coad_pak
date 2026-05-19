"use client";
import { Form, Input, Select, Spin, Upload } from "antd";

import React, { useEffect, useRef, useState } from "react";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import JoditEditor from "jodit-react";
import { Country, State, City } from "country-state-city";
import {
  
  useGetSingleBusinessQuery,
  useUpdateSingleMutation,
} from "@/redux/Api/businessApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { useParams } from "next/navigation";
import { Navigate } from "@/components/shared/Navigate";

import Image from "next/image";
import { toast } from "react-toastify";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import { useGetCategtoryQuery } from "@/redux/Api/categoryApi";
const { Option } = Select;
dayjs.extend(customParseFormat);

const EditNewBusiness = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [loading, setLoading] = useState(false);
  const { id: businessId } = useParams();

  const [fileList, setFileList] = useState([]);
  const [updateSingleData] = useUpdateSingleMutation();
  const { data: businessDetails } = useGetSingleBusinessQuery({ businessId });
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
console.log(businessDetails)
  const role = profileData?.data?.role;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);

  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const { data: categorie, isLoading, isError } = useGetCategtoryQuery();

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [form] = Form.useForm();

const handleCategoryChange = (value) => {
  setSelectedCategory(value);

  const category = categorie?.data?.find(
    (cat) => cat._id === value
  );

  setSubCategories(category?.subCategories || []);

  form.setFieldsValue({ subCategory: null });
};
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const handleCountryChange = (value) => {
    const country = countries.find((c) => c.isoCode === value);
    setSelectedCountry(country);

    const countryStates = State.getStatesOfCountry(value) || [];
    setStates(countryStates);

    if (!countryStates.length) {
      setSelectedState(null);
      setSelectedCity(null);
      setCities([]);
      form.setFieldsValue({ state: undefined, city: undefined });
    } else {
      setSelectedState(null);
      setSelectedCity(null);
      setCities([]);
      form.setFieldsValue({ state: undefined, city: undefined });
    }
  };

  // State select change
  const handleStateChange = (value) => {
    const state = states.find((s) => s.isoCode === value);
    setSelectedState(state);

    const stateCities =
      City.getCitiesOfState(selectedCountry?.isoCode, value) || [];
    setCities(stateCities);

    if (!stateCities.length) {
      setSelectedCity(null);
      form.setFieldsValue({ city: undefined });
    } else {
      setSelectedCity(null);
      form.setFieldsValue({ city: undefined });
    }
  };

  const handleCityChange = (value) => {
    const city = cities.find((c) => c.name === value);
    setSelectedCity(city);
  };

  const handleSubmit = async (values) => {
    const id = businessId;
    const user = businessDetails?.data?.business?.user;
    const oldData = businessDetails?.data?.business;

    setLoading(true);

    try {
      const formData = new FormData();

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("business_image", fileList[0].originFileObj);
      }

      const appendIfChanged = (key, newValue, oldValue) => {
        if (
          newValue !== undefined &&
          newValue !== null &&
          newValue !== "" &&
          newValue !== oldValue
        ) {
          formData.append(key, newValue);
        }
      };

      appendIfChanged("title", values?.title, oldData?.title);
      appendIfChanged("country", selectedCountry?.isoCode, oldData?.country);
      appendIfChanged(
        "countryName",
        selectedCountry?.name,
        oldData?.countryName
      );
      appendIfChanged("state", selectedState?.name, oldData?.state);
      appendIfChanged("city", selectedCity?.name, oldData?.city);
      appendIfChanged("category", values?.category, oldData?.category);
      appendIfChanged("subCategory", values?.subCategory, oldData?.subCategory);
      appendIfChanged("askingPrice", values?.askingPrice, oldData?.askingPrice);
      appendIfChanged(
        "businessType",
        values?.businessType,
        oldData?.businessType
      );
      appendIfChanged("price", values?.price, oldData?.price);
      appendIfChanged(
        "ownerShipType",
        values?.ownerShipType,
        oldData?.ownerShipType
      );
      appendIfChanged("reason", values?.reason, oldData?.reason);
      appendIfChanged("description", content, oldData?.description);

      if ([...formData.keys()].length === 0) {
        toast.info("No changes detected!");
        setLoading(false);
        return;
      }

      const res = await updateSingleData({
        formData,
        businessId: id,
        user: user,
      });

      if (res?.data?.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res?.data?.error || "Update failed!");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error?.response?.data?.error || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 600,
    },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };

  useEffect(() => {
    if (businessDetails?.data) {
      const data = businessDetails?.data?.business;

      // Country set
      const country = countries.find((c) => c.isoCode === data?.country);
      setSelectedCountry(country);

      const countryStates = State.getStatesOfCountry(data?.country) || [];
      setStates(countryStates);

      let stateName = null;
      let cityName = null;

      if (countryStates.length) {
        const state = countryStates.find((s) => s.name === data?.state);
        setSelectedState(state);
        stateName = state?.name || null;

        const stateCities =
          City.getCitiesOfState(data?.country, state?.isoCode) || [];
        setCities(stateCities);

        const city = stateCities.find((c) => c.name === data?.city);
        setSelectedCity(city);
        cityName = city?.name || null;
      }

      form.setFieldsValue({
        country: data?.country,
        state: stateName,
        city: cityName,
        title: data?.title,
        category: data?.category,
        subCategory: data?.subCategory,
        askingPrice: data?.askingPrice,
        ownerShipType: data?.ownerShipType,
        businessType: data?.businessType,
        reason: data?.reason,
        price: data?.price,
      });

      setContent(data?.description);

      if (data?.image && data?.image.length > 0) {
        setFileList([
          {
            uid: "-1",
            name: data?.image[0],
            status: "done",
            url: `${imageUrl}/uploads/business-image/${data?.image}`,
          },
        ]);
      }
    }
  }, [businessDetails, countries, form]);

useEffect(() => {
  if (categorie?.data?.length && businessDetails?.data) {
    const existingCategory = businessDetails?.data?.business?.category;
    const matchedCategory = categorie?.data?.find(
      (cat) => cat?.categoryName === existingCategory
    );
    setSubCategories(matchedCategory?.subCategories || []);
  }
}, [categorie, businessDetails]);

  return (
    <div className="container m-auto lg:mt-8 mt-16 lg:px-0 px-4 pb-20 ">
      <Navigate title={"Edit Business Information"}></Navigate>
      <div className="bg-white p-3">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Photos">
            <Upload
              style={{ width: "100%", height: "200px" }}
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              multiple={false}
              maxCount={1}
              accept=".png,.jpg,.jpeg"
              beforeUpload={() => false} // prevent auto upload
            >
              {fileList.length === 0 && (
                <div>
                  <p className="text-4xl text-blue-500">
                    <InboxOutlined />
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Click or drag file <br /> Max 1 MB — Only PNG & JPG
                  </p>
                  <span className="text-blue-500 font-semibold mt-1 inline-block">
                    + Upload
                  </span>
                </div>
              )}
            </Upload>
          </Form.Item>
          <div className=" ">
            <Form.Item
              label="Business Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your business Title!",
                },
              ]}
            >
              <Input
                className="w-full bg-transparent  py-3"
                placeholder="Fuel Type"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Business Category"
              name="category"
              rules={[
                { required: true, message: "Please select Business Category!" },
              ]}
            >
              <Select
                style={{ height: "48px" }}
                placeholder="Select Category"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                {categorie?.data?.map((cat) => (
                  <Option key={cat?._id} value={cat?._id}>
                    {cat?.categoryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {subCategories?.length > 0 && (
              <Form.Item label="Sub Category" name="subCategory">
                <Select
                  style={{ height: "48px" }}
                  placeholder="Select Sub Category"
                >
                  {subCategories?.map((sub, i) => (
                    <Option key={i} value={sub?._id}>
                      {sub?.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Country */}
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
                onChange={handleCountryChange}
                optionLabelProp="label"
                filterOption={(input, option) =>
                  option?.label?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {countries?.map((country) => (
                  <Select.Option
                    key={country?.isoCode}
                    value={country?.isoCode}
                    label={country?.name}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={`https://flagcdn.com/w20/${country?.isoCode.toLowerCase()}.png`}
                        alt={country?.name}
                        width={20}
                        height={12}
                        className="object-cover"
                      />
                      {country?.name}
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* State */}
            <Form.Item label="Select State" name="state">
              <Select
                placeholder="Select your state"
                style={{ height: "48px" }}
                showSearch
                allowClear
                onChange={handleStateChange}
                disabled={!selectedCountry}
              >
                {states.map((state) => (
                  <Select.Option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* City */}
            <Form.Item label="Select City" name="city">
              <Select
                placeholder="Select your city"
                style={{ height: "48px" }}
                showSearch
                allowClear
                onChange={handleCityChange}
                disabled={!selectedState}
              >
                {cities.map((city) => (
                  <Select.Option key={city.name} value={city.name}>
                    {city.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Price Range (USD)"
              name="askingPrice"
              rules={[
                { required: true, message: "Please input Asking Price!" },
              ]}
            >
              <Select
                style={{ height: "48px" }}
                placeholder="Price Range (USD)"
                className="w-full"
              >
                <Option value="General_Inquiry">Select</Option>
                <Option value="Under $50K">Under $50K</Option>
                <Option value="$50K - $100K">$50K - $100K</Option>
                <Option value="$100k - $250K">$100k - $250K</Option>
                <Option value="$250K - $500K">$250K - $500K</Option>
                <Option value="$500K - $1M">$500K - $1M</Option>
                <Option value="Over $1M">Over $1M</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Asking Price" name="price">
              <Input
                type="number"
                className="w-full bg-transparent py-3"
                placeholder="Asking Price"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Ownership Type"
              name="ownerShipType"
              rules={[
                { required: true, message: "Please input Ownership type!" },
              ]}
            >
              <Select
                style={{ height: "48px" }}
                placeholder="Select Ownership Type"
                className="w-full"
              >
                <Option>Select</Option>
                <Option value="Sole Proprietorship">Sole Proprietorship</Option>
                <Option value="Partnership">Partnership</Option>
                <Option value="Corporation">Corporation</Option>
                <Option value="LLC">LLC</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Business Type"
              name="businessType"
              rules={[
                { required: true, message: "Please input business Type!" },
              ]}
            >
              <Select
                style={{ height: "48px" }}
                placeholder="Select Business Type"
                className="w-full"
              >
                <Option>Select</Option>
                <Option value="Franchise">Franchise</Option>
                <Option value="Independent">Independent</Option>
                <Option value="Startup">Startup</Option>
                <Option value="Home-Based">Home-Based</Option>
                <Option value="Online">Online</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label={
              role === "Business Idea Lister"
                ? "Reason for Required Funding"
                : "Reason for Selling"
            }
            name="reason"
          >
            <Input
              className="w-full bg-transparent py-3"
              placeholder={
                role === "Business Idea Lister"
                  ? "Reason for Required Funding"
                  : "Reason for Selling"
              }
            />
          </Form.Item>

          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />

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
                "Update"
              )}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditNewBusiness;
