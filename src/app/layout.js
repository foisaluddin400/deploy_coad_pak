import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./layout/ClientLayout";
import ReduxProvider from "@/provider/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/components/context/ContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WhatsappBadge from "@/components/HomePage/WatsappBradge";

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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="product">
      <head>
        {/* ✅ Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N4TGRV75');
          `}
        </Script>

        {/* ✅ Google Ads Tracking Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17657274805"
          strategy="afterInteractive"
        ></Script>

        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17657274805');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} bg-white ${geistMono.variable} antialiased`}
      >
        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N4TGRV75"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ReduxProvider>
          <SocketProvider>
            <Toaster />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <ClientLayout>{children}</ClientLayout>
          </SocketProvider>
        </ReduxProvider>

        {/* ✅ Tawk.to live chat */}
        <Script id="tawkto-script" strategy="afterInteractive">
          {`
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function () {
              var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = "https://embed.tawk.to/68b29c4fcbdd78615202bb4e/1j3sr5616";
              s1.charset = "UTF-8";
              s1.setAttribute("crossorigin", "*");
              s0.parentNode.insertBefore(s1, s0);
            })();
          `}
        </Script>

        <WhatsappBadge />
      </body>
    </html>
  );
}
