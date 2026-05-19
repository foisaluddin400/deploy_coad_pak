// app/robots.jsx

/** @type {import('next').MetadataRoute.Robots} */
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      disallow: '/auth/',
    },
    sitemap: 'https://profitablebusinessesforsale.com/sitemap.xml',
  };
}