"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, Globe, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Logo from "../../../public/Home/logo2.png";
import BusinessIcon from "../../../public/nav-icons/BusinessIcon";
import MessageIcon from "../../../public/nav-icons/MessageIcon";
import BelIcon from "../../../public/nav-icons/BelIcon";
import CrownIcon from "../../../public/nav-icons/CrownIcon";
import SettingIcon from "../../../public/nav-icons/SettingIcon";
import NdaIcon from "../../../public/nav-icons/NdaIcon";
import HelpIcon from "../../../public/nav-icons/HelpIcon";
import { Popconfirm } from "antd";
import { menuItems } from "@/dummy-data/DummyData";

import { useGetProfileQuery } from "@/redux/Api/userApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { Country } from "country-state-city";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { usePathname, useRouter } from "next/navigation";
import { useCountry } from "@/hooks/useCountry";
import { useGetCategtoryQuery } from "@/redux/Api/categoryApi";
import { useGetUnreadNotificationQuery } from "@/redux/Api/notificationApi";


const Navbar = () => {
  const searchParams = useSearchParams();
  const { data: categoryData, isError } = useGetCategtoryQuery();

  console.log(categoryData);

  const { country, pushWithCountry } = useCountry();
  const handleNavClick = (path, e) => {
    e.preventDefault(); // Default Link behavior বন্ধ
    pushWithCountry(path);
  };
  const { data: profileData, isLoading } = useGetProfileQuery();
  const role = profileData?.data?.role;
  const isBrowser =
    typeof window !== "undefined" && typeof localStorage !== "undefined";
  const accessToken = isBrowser ? localStorage.getItem("accessToken") : null;
  const users = profileData?.data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { data: notificationCount } = useGetUnreadNotificationQuery();
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const token = isBrowser ? localStorage.getItem("user") : null;
  const user = token === null;

  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownEnter = (key) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const pathname = usePathname();
  const router = useRouter();

  const [activeCountry, setActiveCountry] = useState(null);
  const [countrySearch, setCountrySearch] = useState("");
  const [countries, setCountries] = useState([]);
  console.log(countries);

  useEffect(() => {
    const saved = localStorage.getItem("selectedCountry");
    if (saved && saved !== "international") {
      setActiveCountry(saved);
    }
  }, []);

  const getCleanPath = () => {
    const saved = localStorage.getItem("selectedCountry");
    if (
      saved &&
      saved !== "international" &&
      pathname.startsWith(`/${saved}`)
    ) {
      return pathname.slice(`/${saved}`.length) || "/";
    }
    return pathname;
  };

  const handleCountrySelect = (country) => {
    console.log(country);
    const slug = country.name.toLowerCase().replace(/\s+/g, "-");

    // Save new country
    localStorage.setItem("selectedCountry", slug);
    Cookies.set("selectedCountry", slug, { expires: 30 });
    setActiveCountry(slug);

    let currentPath = pathname;

    const allCountries = countries.map((c) =>
      c.name.toLowerCase().replace(/\s+/g, "-"),
    );

    const segments = currentPath.split("/").filter(Boolean);
    if (segments.length > 0 && allCountries.includes(segments[0])) {
      currentPath = "/" + segments.slice(1).join("/") || "/";
    }

    const finalUrl =
      slug === "international"
        ? currentPath || "/"
        : `/${slug}${currentPath === "/" ? "" : currentPath}`;

    console.log("Navigating to:", finalUrl);

    window.location.href = finalUrl;

    setCountryModalOpen(false);
    setCountrySearch("");
  };

  const handleInternational = () => {
    localStorage.removeItem("selectedCountry");
    Cookies.remove("selectedCountry");
    setActiveCountry(null);

    let currentPath = pathname;

    // Remove existing country prefix
    const segments = currentPath.split("/").filter(Boolean);
    if (segments.length > 0) {
      const possibleCountry = segments[0];
      if (
        countries.some(
          (c) => c.name.toLowerCase().replace(/\s+/g, "-") === possibleCountry,
        )
      ) {
        currentPath = "/" + segments.slice(1).join("/") || "/";
      }
    }

    window.location.href = currentPath || "/";

    setCountryModalOpen(false);
    setCountrySearch("");
  };

  // ---- Search filtered countries ----
  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  // Countries Load
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const navItems = [
    { key: "home", label: "Home", path: "/" },
    {
      key: "selling",
      label: "Selling",
      submenu: menuItems.selling,
    },
    {
      key: "category",
      label: "Category",
      type: "category",
      submenu: categoryData?.data || [],
    },
    { key: "buying", label: "Buying", submenu: menuItems.buying },
    { key: "valuation", label: "Valuation", submenu: menuItems.valuation },
    {
      key: "business",
      label: "Blog",
      path: "/blogs",
    },
    {
      key: "resources",
      label: "Resources",
      path: "/blogs",
      submenu: menuItems.resources,
      state: menuItems.resources.state,
    },
  ];

  // Animation variants for sidebar
  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.3,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.3,
      },
    },
  };

  // Animation variants for menu items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -12, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -12,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Check accessToken from localStorage (only runs in client)
    const token = localStorage.getItem("accessToken");
    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  }, []);
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <Link href="/">
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={Logo}
                    alt="Logo"
                    unoptimized={true}
                    width={200}
                    height={200}
                    className="w-[78px]"
                  />
                  <div>
                    <p className="text-2xl font-bold text-[#F59E0B]">P B F S</p>
                    <p className="text-[#F59E0B]">From Listings to Legacy</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href="/myBusiness/details"
              onClick={() => setMobileMenuOpen(false)}
            >
              {hasToken && role !== "Buyer" && role !== "Investor" && (
                <button className="block md:px-4 md:py-2 px-2 py-1 bg-[#22C55E] text-white text-center rounded-lg md:font-medium">
                  List Your Business
                </button>
              )}
            </Link>
          </div>

          <div className="flex justify-end lg:justify-between items-center py-4">
            <nav
              className="hidden lg:flex items-center space-x-8"
              ref={dropdownRef}
            >
              {navItems.map((item) => (
                <div key={item.key} className="relative">
                  {item.submenu ? (
                    <Link
                      href={
                        country === "international"
                          ? "/category"
                          : `/${country}/category`
                      }
                      className="flex items-center space-x-1 text-gray-700 hover:text-[#0091FF] font-medium"
                      onMouseEnter={() => handleDropdownEnter(item.key)}
                      onMouseLeave={handleDropdownLeave}
                      onClick={(e) => handleNavClick("/category", e)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.key ? "rotate-180" : ""}`}
                      />
                    </Link>
                  ) : (
                    <Link
                      href={
                        country === "international"
                          ? item.path
                          : `/${country}${item.path === "/" ? "" : item.path}`
                      }
                      className="text-gray-700 hover:text-[#0091FF] font-medium transition-colors"
                      onClick={(e) => handleNavClick(item.path, e)}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Submenu */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === item.key && (
                      <motion.div
                        className="absolute top-full left-0 mt-6 w-64 overflow-y-auto bg-white rounded-xl shadow-xl border-t-4 border-[#3b82f6]"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onMouseEnter={() => handleDropdownEnter(item.key)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="p-2">
                          {/* CATEGORY TYPE */}
                          {item.key === "category" &&
                            item.submenu?.slice(0, 8).map((subitem) => (
                              <Link
                                key={subitem._id}
                                href={
                                  country === "international"
                                    ? `/category/${subitem.slug}`
                                    : `/${country}/category/${subitem.slug}`
                                }
                                onClick={(e) =>
                                  handleNavClick(`/category/${subitem.slug}`, e)
                                }
                                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                              >
                                <div className="font-medium text-gray-900 group-hover:text-[#0091FF]">
                                  {subitem.categoryName}
                                </div>
                              </Link>
                            ))}

                          {/* OTHER MENUS (selling, buying, resources) */}
                          {item.key !== "category" &&
                            item.submenu?.map((subitem) => (
                              <Link
                                key={subitem.label || subitem.name}
                                href={subitem.path || "#"}
                                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                onClick={(e) => handleNavClick(subitem.path, e)}
                              >
                                <div className="font-medium text-gray-900 group-hover:text-[#0091FF]">
                                  {subitem.label || subitem.name}
                                </div>
                              </Link>
                            ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Globe Button */}
              <button
                onClick={() => setCountryModalOpen(true)}
                className="flex items-center space-x-1 text-gray-600 hover:text-[#0091FF] transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span
                  className={`text-sm font-medium ${activeCountry ? "text-[#0091FF]" : "text-[#28A745]"}`}
                >
                  {activeCountry
                    ? activeCountry.slice(0, 3).toUpperCase()
                    : "INT"}
                </span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>

              {!accessToken ? (
                <>
                  <div className="flex gap-2">
                    <div className="flex items-center space-x-3">
                      <Link href="/auth/choose-role">
                        <button className="flex items-center border text-[#0091FF] border-[#0091FF] space-x-2 px-2 py-2  rounded transition-colors">
                          <User className="w-4 h-4" />
                          <span>Sign Up</span>
                        </button>
                      </Link>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Link href="/auth/login">
                        <button className="flex items-center bg-[#0091FF] space-x-2 px-4 py-2 text-white rounded transition-colors">
                          <User className="w-4 h-4" />
                          <span>Login</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center rounded-full border-2 border-[#0091FF] space-x-2 text-white"
                  >
                    {users?.image ? (
                      <Image
                        src={`${imageUrl}/Uploads/profile-image/${users?.image}`}
                        alt={users?.name || "User"}
                        width={30}
                        height={30}
                        className="rounded-full w-[30px] h-[30px] object-cover"
                      />
                    ) : (
                      <div className="w-[30px] h-[30px] rounded-full bg-gray-200 flex items-center justify-center">
                        {profileMenuOpen ? (
                          <X className="w-4 h-4" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Image
                      src={Logo}
                      alt="Logo"
                      width={150}
                      height={150}
                      className="w-[50px]"
                    />
                    <div>
                      <p className="text-2xl font-bold text-[#F59E0B]">
                        P B S F
                      </p>
                      <p className="text-[#F59E0B]">From Listings to Legacy</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-2 mt-4">
                  {navItems.map((item, index) => (
                    <MobileNavItem
                      key={item?.key}
                      item={item}
                      onClose={() => setMobileMenuOpen(false)}
                      custom={index}
                    />
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Login</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {profileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setProfileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={() => setProfileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors absolute top-3 right-3"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6">
                <div className="flex flex-col items-start space-y-2 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-gray-200 flex items-center justify-center">
                      {users?.image ? (
                        <Image
                          src={`${imageUrl}/Uploads/profile-image/${users.image}`}
                          alt={users?.name || "User"}
                          width={50}
                          height={50}
                          className="rounded-full w-[30px] h-[30px] object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-[50px] h-[50px] rounded-full text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{users?.name}</span>
                        <span className="bg-blue-100 text-[#0091FF] text-xs font-medium px-2 py-0.5 rounded">
                          {users?.role}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{users?.email}</p>
                    </div>
                  </div>
                </div>

                <nav className="space-y-4">
                  {[
                    ...(role === "Buyer" || role === "Investor"
                      ? [
                          {
                            icon: BusinessIcon,
                            label: "Interested Businesses",
                            path: "/myBusiness/details",
                          },
                        ]
                      : role === "Broker"
                        ? [
                            {
                              icon: BusinessIcon,
                              label: "Listed Businesses",
                              path: "/myBusiness/details",
                            },
                          ]
                        : role === "Asset Seller"
                          ? [
                              {
                                icon: BusinessIcon,
                                label: "Listed Business Asset(s)",
                                path: "/myBusiness/details",
                              },
                            ]
                          : role === "Business Idea Lister"
                            ? [
                                {
                                  icon: BusinessIcon,
                                  label: "Listed Idea(s)",
                                  path: "/myBusiness/details",
                                },
                              ]
                            : role === "Francise Seller"
                              ? [
                                  {
                                    icon: BusinessIcon,
                                    label: "Listed Franchise(s)",
                                    path: "/myBusiness/details",
                                  },
                                ]
                              : [
                                  {
                                    icon: BusinessIcon,
                                    label: "Listed Businesses",
                                    path: "/myBusiness/details",
                                  },
                                ]),
                    { icon: MessageIcon, label: "Message", path: "/chat" },
                    {
                      icon: BelIcon,
                      label: "Notification",
                      path: "/notification",
                      showBadge: true,
                    },
                    !profileData?.data?.subscriptionPlan &&
                    profileData?.data?.subscriptionPlanPrice === 0
                      ? {
                          icon: CrownIcon,
                          label: "Subscription ( No Subscription )",
                          path: "/subscription",
                        }
                      : {
                          icon: CrownIcon,
                          label: "Subscription",
                          path: "/subscription",
                        },
                    {
                      icon: SettingIcon,
                      label: "Profile Settings",
                      path: "/profilePage",
                    },
                    { icon: NdaIcon, label: "NDA", path: "/Seller" },
                    {
                      icon: HelpIcon,
                      label: "Help & Support",
                      path: "/contact-us",
                    },
                    // { icon: InfoIcon, label: "FAQs", path: "/faqs" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={
                          country === "international"
                            ? item.path
                            : `/${country}${item.path}`
                        }
                        onClick={(e) => {
                          setProfileMenuOpen(false);
                          handleNavClick(item.path, e);
                        }}
                        className="flex cursor-pointer items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition-colors relative"
                      >
                        <item.icon className="w-5 h-5 text-gray-600" />

                        <span className="text-sm font-medium">
                          {item.label}
                        </span>

                        {item?.showBadge && notificationCount?.data > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {notificationCount?.data}
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="border-t border-gray-200 mt-6 pt-4">
                  <motion.div
                    custom={8}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Popconfirm
                      title="Are you sure you want to log out?"
                      okText="Yes"
                      cancelText="No"
                      okType="danger"
                      onConfirm={() => {
                        setProfileMenuOpen(false);
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("user");
                        Cookies.remove("accessToken");
                        toast.success("You have been logged out");

                        setTimeout(() => {
                          window.location.href = "/auth/login"; // ✅ works 100% reliably
                        }, 300);
                      }}
                    >
                      <div className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition-colors cursor-pointer">
                        <LogOut className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium">Sign Out</span>
                      </div>
                    </Popconfirm>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---- Country Modal ---- */}
      <AnimatePresence>
        {countryModalOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setCountryModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Choose Your Region
                  </h2>
                  <button
                    onClick={() => setCountryModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Search country..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-[#0091FF]"
                />

                <div className="space-y-1 max-h-80 overflow-y-auto">
                  <button
                    onClick={handleInternational}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      !activeCountry
                        ? "bg-blue-50 text-[#0091FF] font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Globe className="w-5 h-5 text-[#28A745]" />
                    <span className="font-medium">International</span>
                    {!activeCountry && (
                      <span className="ml-auto text-xs bg-[#0091FF] text-white px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </button>

                  <div className="border-t border-gray-100 my-2" />

                  {filteredCountries.map((country) => {
                    const slug = country.name
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    const isActive = activeCountry === slug;
                    return (
                      <button
                        key={country.isoCode}
                        onClick={() => handleCountrySelect(country)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-50 text-[#0091FF]"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <Image
                          src={`https://flagcdn.com/w20/${country.isoCode.toLowerCase()}.png`}
                          alt={country.name}
                          width={24}
                          height={16}
                          className="object-cover rounded-sm"
                        />
                        <span
                          className={`font-medium ${isActive ? "text-[#0091FF]" : ""}`}
                        >
                          {country.name}
                        </span>
                        {isActive && (
                          <span className="ml-auto text-xs bg-[#0091FF] text-white px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="h-24 lg:h-32" />
    </>
  );
};
//d
const MobileNavItem = ({ item, onClose, custom }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants for submenu items
  const subItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  if (item?.submenu) {
    return (
      <motion.div
        custom={custom}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        }}
        initial="hidden"
        animate="visible"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium">{item?.label}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.3 },
              }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
            >
              <div className="pl-4 py-2 space-y-1">
                {item?.submenu.map((subitem, index) => (
                  <motion.div
                    key={subitem?.name}
                    custom={index}
                    variants={subItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={
                        item.key === "selling" && subitem?.state
                          ? {
                              pathname: subitem?.path,
                              query: { role: subitem.state }, // Pass state as role query param only for selling
                            }
                          : subitem?.path // Use original path for other submenus (e.g., buying)
                      }
                      onClick={onClose}
                      className="block p-2 text-gray-600 hover:text-[#0091FF] hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {subitem?.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      custom={custom}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      initial="hidden"
      animate="visible"
    >
      <Link
        href={item?.path}
        onClick={onClose}
        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
      >
        {item?.label}
      </Link>
    </motion.div>
  );
};

export default Navbar;
