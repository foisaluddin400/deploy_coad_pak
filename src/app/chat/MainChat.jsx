'use client';

import React, { useState } from "react";
import Link from "next/link"; 
import { MessageSquareText } from "lucide-react";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import SidbarChat from "@/components/chatPage/SidbarChat";
import { Navigate } from "@/components/shared/Navigate";

const MainChat = () => {
  const { data: profileData } = useGetProfileQuery();
  const price = profileData?.data?.subscriptionPlanPrice;
  const role = profileData?.data?.role;

  const [selectedChat, setSelectedChat] = useState(null);

  // ⚡ Restrict without subscription
  if (price === 0 && role !== "Business Idea Lister") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <p className="text-xl font-semibold mb-4 text-gray-800">
          Please buy a subscription to access the chat.
        </p>
        <Link href={"/plane"}>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-5 py-2 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
            Buy Subscription
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="mt-16 md:mt-11">
        <Navigate title={"Message"} />
      </div>

      <div className="md:flex h-[90vh] bg-white border overflow-hidden">
        {/* Sidebar */}
        <div
          className={`h-full border-r overflow-y-auto 
          ${selectedChat ? "hidden" : "block"} 
          md:block md:w-96`}
        >
          <SidbarChat onSelectChat={(chat) => setSelectedChat(chat)} />
        </div>

        {/* Main Chat Area */}
        <div
          className={`flex justify-center flex-col flex-1 items-center w-full pt-20 
          ${selectedChat ? "block" : "hidden"} 
          md:block`}
        >
          <div className="text-center px-6 py-10 animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 rounded-full p-6 shadow-inner hover:scale-105 transition-transform duration-300">
                <MessageSquareText className="w-12 h-12 text-blue-600" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
              {selectedChat
                ? `Start Chat with ${selectedChat.name}`
                : "Start a Conversation"}
            </h1>

            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
              Connect instantly with other users and grow your business network through real-time messaging.
            </p>

            {/* Back Button (Mobile Only) */}
            {selectedChat && (
              <div className="text-center mt-10 md:hidden">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="bg-gray-200 px-6 py-2 rounded-full text-gray-700 font-medium shadow-sm hover:bg-gray-300 transition-all"
                >
                  ← Back to Chats
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
