"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socketLoading, setSocketLoading] = useState(false);
  const socketRef = useRef(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    if (!token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    setSocketLoading(true);

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      setSocketLoading(false);
      console.log("Socket connected ✅");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected ❌");
    });

    socketRef.current = socket;

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [token]);

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, socketLoading }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
