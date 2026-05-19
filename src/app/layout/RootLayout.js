import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/components/context/ContextProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Connecting buyers and sellers of businesses Globally",
  description: "Profitable Website",
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="product">
      <body
        className={`${geistSans.variable}  ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <SocketProvider>
            <Toaster />
            <div className="max-w-[1400px] m-auto text-black ">{children}</div>
          </SocketProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
