"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
} from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
import Logo from "../../../public/Home/logo2.png";
import backImg from "../../../public/Home/footer.png";
const footerConfig = {
  company: {
    name: "P B F S",
    tagline: "From Listings to Legacy",
    logo: Logo,
    backgroundImage: backImg,
    copyright: "© 2025 PBFS",
  },

  socialLinks: [
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: "https://www.facebook.com/share/1J7PbBaf1G/?mibextid=wwXIfr",
      color: "#1877F2",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/profitablebusinessesforsale?igsh=MTc5bTVrcWJoZHNtbQ%3D%3D",
      color: "#E1306C",
    },
    {
      name: "E-mail",
      icon: IoMailOpenOutline,
      url: "mailto:info@profitablebusinessesforsale.com?subject=Subject%20Here&body=Body%20Text%20Here",
      color: "#FF0000",
    },
  ],

  sections: [
    {
      title: "Our Buyer Services",
      links: [
        { text: "Buy a Business", to: "/auth/login", state: "Business buyer" },
        { text: "Buy a Franchise", to: "/auth/login", state: "Franchise buyer" },
        { text: "Buy a Business Asset", to: "/auth/login", state: "Business asset buyer" },
        { text: "Find a Business Idea", to: "/auth/login", state: "Business idea buyer" },
        { text: "Business Valuation", to: "/auth/login", state: "Business valuation buyer" },
        { text: "Business Formation", to: "/auth/login", state: "Business formation buyer" },
      ],
    },
    {
      title: "Our Seller Services",
      links: [
        { text: "Businesses for Sale", to: "/auth/login", state: "Business seller" },
        { text: "Business Assets for Sale", to: "/auth/login", state: "Business asset seller" },
        { text: "Business Ideas for Investors", to: "/auth/login", state: "Business idea seller" },
        { text: "Franchises for Sale", to: "/auth/login", state: "Francise seller" },
      ],
    },
    {
      title: "FAQs",
      links: [
        { text: "Seller FAQs", to: "/faq-seller" },
        { text: "Buyer FAQs", to: "/faq-buyer" },
        { text: "Broker FAQs", to: "/faq-brokers" },
        { text: "Investor FAQs", to: "/faq-investors" },
        { text: "Business Idea Lister FAQs", to: "/faq-business" },
        { text: "Business Asset Lister FAQs", to: "/faq-asset" },
        { text: "Franchisor FAQs", to: "/faq-franchise" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { text: "About Us", to: "/about-us" },
        { text: "Contact Us", to: "/contact-us" },
        { text: "Privacy Policy", to: "/privacy-policy" },
        { text: "Terms of Condition", to: "/terms-and-conditions" },
        { text: "Refund and Cancellation Policy", to: "/refund-and-cancellation-policy" },
      ],
    },
  ],
};

// Social Media Link Component
const SocialLink = ({ social, className = "" }) => {
  const Icon = social.icon;

  const handleClick = (e) => {
    e.preventDefault();
    window.open(social.url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-[#3758F9] flex justify-center items-center p-2 rounded-full hover:bg-[#2d47e8] hover:scale-110 transition-all duration-300 cursor-pointer group ${className}`}
      aria-label={`Visit our ${social.name} page`}
      title={social.name}
    >
      <Icon className="text-sm sm:text-base group-hover:text-white transition-colors" />
    </button>
  );
};

// Footer Section Component
const FooterSection = ({ section }) => {
  const router = useRouter();

  const handleNavigation = (link) => {
    router.push(link.to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-6 sm:mt-0">
      <h5 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-6 lg:mb-8 text-white">
        {section.title}
      </h5>
      <ul className="space-y-2 sm:space-y-3">
        {section.links.map((link, index) => (
          <li key={index}>
            <h6
              onClick={() => handleNavigation(link)}
              className="text-sm cursor-pointer hover:text-white/90 sm:text-base lg:text-lg transition-all duration-300 inline-block relative group"
            >
              {link.text}
            </h6>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main Footer Component
const Footer = () => {
  const { company, socialLinks, sections } = footerConfig;

  return (
    <footer
      className="bg-[#0A0D53] text-white pt-6 sm:pt-8 md:pt-10 bg-cover bg-center min-h-[40vh] sm:min-h-[45vh] lg:min-h-[50vh] relative"
      style={{ backgroundImage: `url(${company.backgroundImage.src})` }}
    >
      <div className="absolute inset-0 bg-[#0A0D53]/80"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Image
                src={company?.logo}
                alt={`${company?.name} Logo`}
                className="w-10 sm:w-12 md:w-[50px] flex-shrink-0 rounded-lg shadow-lg"
              />
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#F59E0B]">
                  {company?.name}
                </p>
                <p className="text-[#F59E0B] text-sm sm:text-base">
                  {company?.tagline}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-gray-400">
              {company?.copyright}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {socialLinks?.slice(0, 4).map((social, index) => (
                <SocialLink key={index} social={social} />
              ))}
            </div>

            <div className="hidden sm:flex flex-wrap gap-2 sm:gap-3 mt-3">
              {socialLinks.slice(4).map((social, index) => (
                <SocialLink key={index + 4} social={social} />
              ))}
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          {sections.map((section, index) => (
            <FooterSection key={index} section={section} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
