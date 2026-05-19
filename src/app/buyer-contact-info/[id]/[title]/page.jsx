
'use client';

import { message, Tag } from "antd";
import { Mail, Phone, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation"; // Replace react-router-dom useParams and useNavigate
import { useState, useCallback, useEffect } from "react";
import Image from "next/image"; // Import Image from next/image
import img from "../../../../../public/Home/user.png";

import { useGetProfileQuery } from "@/redux/Api/userApi";
import { useSocket } from "@/components/context/ContextProvider";
import { imageUrl } from "@/redux/Api/baseApi";
import toast from "react-hot-toast";
import { useGetSingleBusinessContactQuery } from "@/redux/Api/contactApi";


const Page = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id, title } = useParams();
  console.log(id, title)
  const { data: singleContactUser } = useGetSingleBusinessContactQuery({
    userId: id,businessId: title
  });
  const userData = singleContactUser?.data;
  console.log(userData);
  const router = useRouter(); // Replace useNavigate with useRouter
  const { data: profileData } = useGetProfileQuery();
  const role = profileData?.data?.role;

  const { socket } = useSocket();
  const [loading, setLoading] = useState(false);

  const handleChat = useCallback(
    (receiverId) => {
      if (!socket || !receiverId) return;

      setLoading(true);
      socket.emit("chat_initiate", { receiverId }, (response) => {});

      socket.once("chat_initiate", (data) => {
        setLoading(false);

        if (data?.data?._id) {
          router.push(`/chat/${data?.data?._id}`); // Replace navigate with router.push
        } else {
          toast.error("Failed to start chat. Please try again.");
        }
      });
    },
    [socket, router]
  );

  return (
    <div className="container mx-auto px-5 pt-20 pb-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Contact Info</h2>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-5">
        {/* Left Side - Profile Section */}
        <div className="p-5">
          <div className="md:flex items-start gap-6">
            <div className=" rounded-full">
              {userData?.image ? (
                <Image
                  src={`${imageUrl}/Uploads/profile-image/${userData?.image}`}
                  alt="Profile"
                  className="w-[100px] h-[100px] object-cover rounded-full mx-auto"
                  width={100} // Match w-[100px] h-[100px]
                  height={100}
                  priority={true} // Prioritize as main profile image
                />
              ) : (
                <Image
                  src={img}
                  alt="User avatar"
                  className="w-[100px] h-[100px] object-cover"
                  width={100}
                  height={100}
                  priority={true}
                />
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {userData?.name}
                  </h3>
                  <Tag className="bg-blue-100 text-[#0091FF] text-xs px-2 py-1 rounded">
                    {userData?.role}
                  </Tag>
                </div>
                <p className="text-gray-600">{userData?.email}</p>
              </div>

              <button
                onClick={() => handleChat(userData?._id)}
                disabled={loading}
                className="bg-[#0091FF] px-5 py-2 text-white font-medium rounded-md"
              >
                {loading ? "Starting..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Details */}
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 text-lg">Email</h4>
              <p className="text-gray-700">{userData?.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 text-lg">Phone</h4>
              <p className="text-gray-700">{userData?.mobile}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 text-lg">Location</h4>
              <p className="text-gray-700">{userData?.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
