/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['flagcdn.com', 'your-image-host.com', 'www.gravatar.com'],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.profitablebusinessesforsale.com",
        pathname: "/uploads/**",
      },
      {
  protocol: "https",
  hostname: "7jb5jph3-8000.inc1.devtunnels.ms",
  pathname: "/**",
},
      {
        protocol: "https",
        hostname: "api.profitablebusinessesforsale.com",
        pathname: "/Uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/Uploads/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "purecatamphetamine.github.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      // www → non-www (SEO FIX - MUST HAVE)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.profitablebusinessesforsale.com",
          },
        ],
        destination: "https://profitablebusinessesforsale.com/:path*",
        permanent: true,
      },

      // page redirects
      {
        source: "/seller-faq",
        destination: "/faq-seller",
        permanent: true,
      },
      {
        source: "/buyer-faq",
        destination: "/faq-buyer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "p2zltbm7-8000.inc1.devtunnels.ms",
//         pathname: "/uploads/**",
//       },

//       {
//         protocol: "https",
//         hostname: "localhost",
//         pathname: "/uploads/**",
//       },
//       {
//         protocol: "https",
//         hostname: "localhost",
//         pathname: "/Uploads/**",
//       },
//       {
//         protocol: "https",
//         hostname: "localhost",
//         port: "4173",
//         pathname: "/uploads/**",
//       },
//       {
//         protocol: "https",
//         hostname: "localhost",
//         port: "4173",
//         pathname: "/Uploads/**",
//       },
//       {
//         protocol: "https",
//         hostname: "i.ibb.co",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "purecatamphetamine.github.io",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "flagcdn.com",
//         pathname: "/**",
//       },
//        {
//         protocol: "https",
//         hostname: "p2zltbm7-8000.inc1.devtunnels.ms",
//         pathname: "/Uploads/**",
//       },
//       {
//         protocol: "https",
//         hostname: "p2zltbm7-8000.inc1.devtunnels.ms",
//         pathname: "/uploads/**",
//       },

//       // other hosts
//       {
//         protocol: "https",
//         hostname: "i.ibb.co",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "flagcdn.com",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;