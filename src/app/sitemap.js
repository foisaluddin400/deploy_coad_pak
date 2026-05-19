export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://profitablebusinessesforsale.com";

  // 🔥 Fetch Blogs
  let blogs = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_MAIN_URL}/formation/get-all-format-website`,
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await res.json();
    blogs = data?.data || [];
  } catch (error) {
    console.error("Blog fetch error:", error);
  }

  // 🔥 Fetch Business Listings
  let listings = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_MAIN_URL}/business/filter-business?page=1&limit=100`,
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await res.json();

    listings = data?.data?.businesses || data?.data || [];
  } catch (error) {
    console.error("Business fetch error:", error);
  }

  // ✅ Static Routes
  const staticRoutes = [
    "",
    "/about-us",
    "/business-schedule",
    "/business-valuation",
    "/blogs",
    "/contact-us",
    "/plane",
    "/chat",
    "/myBusiness/details",
    "/refund-and-cancellation-policy",
    "/businesses-for-sale",
    "/privacy-policy",
    "/terms-and-conditions",
    "/faq-seller",
    "/faq-buyer",
    "/faq-brokers",
    "/faq-investors",
    "/faq-business",
    "/faq-asset",
    "/faq-franchise",
    "/profilePage",
    "/Seller",
    "/addnewbusiness",
    "/search",
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // ✅ Blog URLs
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt
      ? new Date(blog.updatedAt)
      : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // ✅ Business Listing URLs
  const listingUrls = listings
    .filter((item) => item?.slug)
    .map((item) => ({
      url: `${baseUrl}/details/${item.slug}`,
      lastModified: item.updatedAt
        ? new Date(item.updatedAt)
        : new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    }));

  return [...staticUrls, ...blogUrls, ...listingUrls];
}