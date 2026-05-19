import MyBusinessDetails from "../../MyBusinessDetails";


export async function generateMetadata({ params }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_MAIN_URL}/business/${params.id}`,
      { cache: "no-store" }
    );

    const data = await res.json();
    const business = data?.data?.business;

    const title =
      business?.metaTitle || business?.title || "Business Details";

    const description =
      business?.metaDescription ||
      business?.description?.replace(/<[^>]*>/g, "").substring(0, 160) ||
      "Explore business details";

    const keywords = business?.metaKeywords?.join(", ") || "";

    const image = business?.image
      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/Uploads/business-image/${business.image}`
      : "";

    return {
      title,
      description,
      keywords,

      openGraph: {
        title,
        description,
        images: [image],
        type: "website",
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    return {
      title: "Business Details",
      description: "Explore business details",
    };
  }
}

export default function Page() {
  return <MyBusinessDetails />;
} 