"use client";

import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Collapse, Card, Checkbox, Pagination, Skeleton } from "antd";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import backCard from "../../../public/Home/ii.png";
import { City, Country, State } from "country-state-city";
import { Menu, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  useGetAllBusinesFilterQuery,
  
} from "@/redux/Api/businessApi";
import { imageUrl } from "@/redux/Api/baseApi";
import CategoryBanner from "./CategoryBanner";
import { useCountry } from "@/hooks/useCountry";

import { useGetCategtoryQuery } from "@/redux/Api/categoryApi";
import NoDatafound from "../Nodatafound";




const { Panel } = Collapse;
const routeMap = {
  "business-for-sale": {},
  "featured-businessess-for-sale": { businessRole: "Seller" },
  "featured-business-assets-for-sale": { businessRole: "Asset Seller" },
  "featured-franchises-for-sale": { businessRole: "Francise Seller" },
  "featured-business-ideas-for-sale": { businessRole: "Business Idea Lister" },
};

const askingPrice = [
  "Under $50K",
  "$50K - $100K",
  "$100K - $250K",
  "$250K - $500K",
  "$500K - $1M",
  "Over $1M",
];

const businessType = [
  "Franchise",
  "Independent",
  "Startup",
  "Home-Based",
  "Online",
  "Other",
];

const ownerShipType = [
  "Sole Proprietorship",
  "Partnership",
  "Corporation",
  "LLC",
  "Other",
];

const sortBy = ["Newest First", "Price Low to High", "Most Viewed"];
const ageListing = [
  "Anytime",
  "Last 3 Days",
  "Last 14 Days",
  "Last Month",
  "Last 3 Month",
];

/* ─────────────────────────────────────────────
   Skeleton Card (grid & list variants)
───────────────────────────────────────────── */
function BusinessCardSkeleton({ viewMode }) {
  if (viewMode === "list") {
    return (
      <div className="biz-skeleton-list">
        <Skeleton.Image active style={{ width: 220, height: 160, borderRadius: 12, flexShrink: 0 }} />
        <div style={{ flex: 1, padding: "0 16px" }}>
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      </div>
    );
  }
  return (
    <div className="biz-skeleton-card">
      <Skeleton.Image active style={{ width: "100%", height: 200, borderRadius: "12px 12px 0 0" }} />
      <div style={{ padding: "16px" }}>
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sidebar Section wrapper
───────────────────────────────────────────── */
function FilterSection({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="sb-section">
      <button className="sb-section-header" onClick={() => setOpen(!open)}>
        <span className="font-medium text-sm">
          {icon && <span className="sb-section-icon">{icon}</span>}
          {title}
        </span>
        <ChevronDown
          size={16}
          className="sb-chevron"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && <div className="sb-section-body">{children}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Styled Checkbox Row
───────────────────────────────────────────── */
function FilterCheckbox({ label, count, checked, onChange, flag }) {
  return (
    <label className={`sb-checkbox-row ${checked ? "sb-checked" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sb-hidden-check"
      />
      <span className="sb-custom-check">{checked && <CheckIcon />}</span>
      <span className="sb-check-label">
        {flag && (
          <Image
            src={flag}
            alt=""
            width={18}
            height={13}
            className="sb-flag"
          />
        )}
        {label}
      </span>
      {count !== undefined && (
        <span className="sb-check-count">{count}</span>
      )}
    </label>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function AllBusinessFilterAnt() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { country, pushWithCountry } = useCountry();
  const handleNavClick = (path, e) => {
    e.preventDefault();
    pushWithCountry(path);
  };

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryBanner, setCategoryBanner] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const { data: categorys } = useGetCategtoryQuery();
  console.log(categorys);
  const searchParams = useSearchParams();

  const params = useParams();
  const slug = params?.slug || params?.category;
  console.log(slug);
  const categorySlug = params?.category;
  const subCategorySlug = params?.subcategory;
  console.log(subCategorySlug);

  const formatTitle = (slug) => {
    return slug
      ?.split("-")
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      ?.join(" ");
  };

  useEffect(() => {
    if (!categorys?.data) return;

    const currentSlug = slug || categorySlug;
    const routeData = routeMap[currentSlug];

    if (routeData) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      if (routeData.businessRole) {
        setFilters([routeData.businessRole]);
      } else {
        setFilters([]);
      }
      setSelectedSortBy(null);
      setCategoryName(formatTitle(currentSlug));
      setCategoryBanner("");
      return;
    }

    const matchedCategory = categorys?.data?.find(
      (cat) =>
        cat?.slug === categorySlug ||
        cat?.categoryName?.toLowerCase().replace(/\s+/g, "-") === categorySlug
    );

    if (matchedCategory) {
      setFilters([]);
      setSelectedSortBy(null);
      setSelectedCategory(matchedCategory?._id);
      setSelectedSubCategory(null);
      setCategoryName(matchedCategory?.categoryName || "");
      setCategoryBanner(matchedCategory?.banner || "");

      if (subCategorySlug) {
        const matchedSubCategory = matchedCategory?.subCategories?.find(
          (sub) =>
            sub?.slug === subCategorySlug ||
            sub?.name?.toLowerCase().replace(/\s+/g, "-") === subCategorySlug
        );
        if (matchedSubCategory) {
          setSelectedSubCategory(matchedSubCategory?._id);
        }
      }
    }
  }, [slug, categorySlug, subCategorySlug, categorys]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
  }, [searchParams]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleCountryChange = (value, checked) => {
    if (checked) {
      setSelectedCountry(value);
      setStates(State.getStatesOfCountry(value));
      setCities([]);
      setSelectedState(null);
      setSelectedCity(null);
    } else {
      setSelectedCountry(null);
      setStates([]);
      setSelectedState(null);
      setCities([]);
      setSelectedCity(null);
    }
  };

  const handleStateChange = (value, checked) => {
    if (checked) {
      setSelectedState(value);
      const selectedStateObj = states?.find((s) => s.name === value);
      setCities(
        City.getCitiesOfState(selectedCountry, selectedStateObj?.isoCode)
      );
      setSelectedCity(null);
    } else {
      setSelectedState(null);
      setCities([]);
      setSelectedCity(null);
    }
  };

  const handleCityChange = (value, checked) => {
    if (checked) {
      setSelectedCity(value);
    } else {
      setSelectedCity(null);
    }
  };

  const handleCheckboxChange = (value, checked, setter) => {
    console.log(value, checked);
    if (checked) {
      setter(value);
    } else {
      setter(null);
    }
  };

  useEffect(() => {
    if (!subCategorySlug) {
      setSelectedSubCategory(searchParams.get("subCategory") || null);
    }
    setSelectedCountry(searchParams.get("country") || null);
    setSelectedState(searchParams.get("state") || null);
    setSelectedCity(searchParams.get("city") || null);
    setSelectedLocation(searchParams.get("location") || null);
    setSelectedAskingPrice(searchParams.get("askingPrice") || null);
    setSelectedBusinessType(searchParams.get("businessType") || null);
    setSelectedOwnerShipType(searchParams.get("ownerShipType") || null);
    setSelectedSortBy(searchParams.get("sortBy") || null);
    setSelectedAgeListing(searchParams.get("ageOfListing") || null);
  }, [searchParams]);

  const [businessRole, setFilters] = useState([]);
  console.log(businessRole);

  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(selectedCategory);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAskingPrice, setSelectedAskingPrice] = useState(null);
  const [selectedBusinessType, setSelectedBusinessType] = useState(null);
  const [selectedOwnerShipType, setSelectedOwnerShipType] = useState(null);
  const [selectedSortBy, setSelectedSortBy] = useState(null);
  const [selectedAgeListing, setSelectedAgeListing] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  console.log(selectedSubCategory);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100;

  const { data: businessFilter, isLoading } = useGetAllBusinesFilterQuery({
    category: selectedCategory,
    location: selectedLocation,
    country: selectedCountry,
    ageOfListing: selectedAgeListing,
    sortBy: selectedSortBy,
    businessType: selectedBusinessType,
    ownerShipType: selectedOwnerShipType,
    askingPrice: selectedAskingPrice,
    searchText: searchQuery,
    businessRole: businessRole,
    subCategory: selectedSubCategory,
    state: selectedState,
    city: selectedCity,
    page: currentPage,
    limit: pageSize,
  });

  const business = businessFilter?.data || [];
  console.log(business);
  const searchBannerTitle =
    searchQuery && business?.length > 0 && business[0]?.title;

  /* ─── Sidebar ─── */
  const SidebarContent = () => (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Sidebar shell ── */
        .sb-shell {
          font-family: 'DM Sans', sans-serif;
          width: 288px;
          background: white;
          border: 1px solid rgb(230, 230, 230);
          display: flex;
          flex-direction: column;
          min-height: 100%;
          border-radius:10px
        }

        .sb-header {
          padding: 22px 20px 14px;
          border-bottom: 1px solid #f0f2f7;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sb-header-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #4f6ef7, #7c3aed);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .sb-header-text {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #1a2040;
          letter-spacing: -0.2px;
        }

        .sb-header-sub {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 400;
          margin-top: 1px;
        }

        /* ── Sections ── */
        .sb-section {
          border-bottom: 1px solid #f4f5f9;
        }

        .sb-section-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 20px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s;
        }

        .sb-section-header:hover {
          background: #f8f9ff;
        }

        .sb-section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .sb-section-icon {
          width: 20px;
          height: 20px;
          border-radius: 5px;
          background: #eff1ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
        }

        .sb-chevron {
          color: #94a3b8;
          transition: transform 0.22s ease;
          flex-shrink: 0;
        }

        .sb-section-body {
          padding: 6px 20px 14px;
          max-height: 240px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #e2e8f0 transparent;
        }

        .sb-section-body::-webkit-scrollbar {
          width: 4px;
        }
        .sb-section-body::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 4px;
        }

        /* ── Checkbox rows ── */
        .sb-checkbox-row {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 7px 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.14s;
          margin-bottom: 2px;
          position: relative;
        }

        .sb-checkbox-row:hover {
          background: #f5f7ff;
        }

        .sb-checkbox-row.sb-checked {
          background: #eff2ff;
        }

        .sb-hidden-check {
          display: none;
        }

        .sb-custom-check {
          width: 16px;
          height: 16px;
          border-radius: 5px;
          border: 1.8px solid #d1d5db;
          background: #fff;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .sb-checked .sb-custom-check {
          background: linear-gradient(135deg, #4f6ef7, #7c3aed);
          border-color: transparent;
        }

        .sb-check-label {
          flex: 1;
          font-size: 13.5px;
          color: #374151;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 7px;
          line-height: 1.3;
        }

        .sb-checked .sb-check-label {
          color: #3b4edb;
          font-weight: 500;
        }

        .sb-check-count {
          font-size: 11px;
          color: #94a3b8;
          background: #f1f3f9;
          padding: 1px 7px;
          border-radius: 999px;
          font-weight: 500;
          flex-shrink: 0;
        }

        .sb-checked .sb-check-count {
          background: #dde3ff;
          color: #4f6ef7;
        }

        .sb-flag {
          border-radius: 2px;
          object-fit: cover;
        }

        /* Sub-categories indented */
        .sb-subcat-wrap {
          padding-left: 18px;
          padding-top: 4px;
        }

        /* ── Search Input ── */
        .biz-search-wrap {
          position: relative;
          flex: 1;
          max-width: 380px;
        }

        .biz-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .biz-search-input {
          width: 100%;
          padding: 10px 16px 10px 42px;
          border-radius: 12px;
          border: 1.8px solid #e8eaf4;
          background: #f8f9ff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1a2040;
          outline: none;
          transition: all 0.2s ease;
          box-shadow: 0 1px 4px rgba(79, 110, 247, 0.04);
        }

        .biz-search-input::placeholder {
          color: #b0b8cc;
          font-weight: 400;
        }

        .biz-search-input:focus {
          border-color: #4f6ef7;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.1);
        }

        /* ── Skeleton cards ── */
        .biz-skeleton-card {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #f0f2f7;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .biz-skeleton-list {
          border-radius: 14px;
          border: 1px solid #f0f2f7;
          background: #f9fafb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          display: flex;
          align-items: center;
          padding: 16px;
          gap: 16px;
        }

        /* ── Business cards ── */
        .biz-card-custom {
          border-radius: 14px !important;
          overflow: hidden;
          border: 1px solid #f0f2f7!important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05) !important;
          transition: box-shadow 0.2s, transform 0.2s !important;
        }

        .biz-card-custom:hover {
          box-shadow: 0 8px 28px rgba(79, 110, 247, 0.14) !important;
          transform: translateY(-3px);
        }

        /* ── View toggle buttons ── */
        .view-btn-active {
          background: linear-gradient(135deg, #4f6ef7, #7c3aed) !important;
          border-color: transparent !important;
          color: white !important;
        }
      `}</style>

      <div className="sb-shell">
        {/* Header */}
        <div className="sb-header">
          <div className="sb-header-icon">
            <SlidersHorizontal size={16} />
          </div>
          <div>
            <div className="sb-header-text">Filter Listings</div>
            <div className="sb-header-sub">Narrow down your search</div>
          </div>
        </div>

        {/* Business Category */}
        <FilterSection title="Category"  defaultOpen={true}>
          {categorys?.data?.map((category) => (
            <div key={category?._id}>
              <FilterCheckbox
                label={category?.categoryName}
                count={category?.totalBusinessCount}
                checked={selectedCategory === category?._id}
                onChange={(e) => {
                  handleCheckboxChange(
                    category?._id,
                    e.target.checked,
                    setSelectedCategory
                  );
                  if (e.target.checked) setSelectedSubCategory(null);
                }}
              />
              {selectedCategory === category?._id &&
                category?.subCategories?.length > 0 && (
                  <div className="sb-subcat-wrap">
                    {category.subCategories.map((sub) => (
                      <FilterCheckbox
                        key={sub?._id}
                        label={sub?.name}
                        count={sub?.totalBusinessCount}
                        checked={selectedSubCategory === sub?._id}
                        onChange={(e) =>
                          handleCheckboxChange(
                            sub?._id,
                            e.target.checked,
                            setSelectedSubCategory
                          )
                        }
                      />
                    ))}
                  </div>
                )}
            </div>
          ))}
        </FilterSection>

        {/* Country */}
        <FilterSection title="Country" >
          {countries?.map((country) => (
            <FilterCheckbox
              key={country?.isoCode}
              label={country?.name}
              checked={selectedCountry === country?.isoCode}
              flag={`https://flagcdn.com/w20/${country?.isoCode.toLowerCase()}.png`}
              onChange={(e) =>
                handleCountryChange(country?.isoCode, e.target.checked)
              }
            />
          ))}
        </FilterSection>

        {/* State */}
        <FilterSection title="State / Province" >
          {states?.length > 0 ? (
            states?.map((state) => (
              <FilterCheckbox
                key={state?.isoCode}
                label={state?.name}
                checked={selectedState === state?.name}
                onChange={(e) =>
                  handleStateChange(state?.name, e.target.checked)
                }
              />
            ))
          ) : (
            <p style={{ fontSize: 12, color: "#94a3b8", padding: "4px 10px" }}>
              Select a country first
            </p>
          )}
        </FilterSection>

        {/* City */}
        <FilterSection title="City">
          {cities?.length > 0 ? (
            cities?.map((city) => (
              <FilterCheckbox
                key={city?.name}
                label={city?.name}
                checked={selectedCity === city?.name}
                onChange={(e) =>
                  handleCityChange(city?.name, e.target.checked)
                }
              />
            ))
          ) : (
            <p style={{ fontSize: 12, color: "#94a3b8", padding: "4px 10px" }}>
              Select a state first
            </p>
          )}
        </FilterSection>

        {/* Asking Price */}
        <FilterSection title="Asking Price" >
          {askingPrice.map((option) => (
            <FilterCheckbox
              key={option}
              label={option}
              checked={selectedAskingPrice === option}
              onChange={(e) =>
                handleCheckboxChange(
                  option,
                  e.target.checked,
                  setSelectedAskingPrice
                )
              }
            />
          ))}
        </FilterSection>

        {/* Business Type */}
        <FilterSection title="Business Type" >
          {businessType.map((option) => (
            <FilterCheckbox
              key={option}
              label={option}
              checked={selectedBusinessType === option}
              onChange={(e) =>
                handleCheckboxChange(
                  option,
                  e.target.checked,
                  setSelectedBusinessType
                )
              }
            />
          ))}
        </FilterSection>

        {/* Ownership Type */}
        <FilterSection title="Ownership Type" >
          {ownerShipType.map((option) => (
            <FilterCheckbox
              key={option}
              label={option}
              checked={selectedOwnerShipType === option}
              onChange={(e) =>
                handleCheckboxChange(
                  option,
                  e.target.checked,
                  setSelectedOwnerShipType
                )
              }
            />
          ))}
        </FilterSection>

        {/* Sort By */}
        <FilterSection title="Sort By" >
          {sortBy.map((option) => (
            <FilterCheckbox
              key={option}
              label={option}
              checked={selectedSortBy === option}
              onChange={(e) =>
                handleCheckboxChange(
                  option,
                  e.target.checked,
                  setSelectedSortBy
                )
              }
            />
          ))}
        </FilterSection>

        {/* Age of Listing */}
        <FilterSection title="Age of Listing" >
          {ageListing.map((option) => (
            <FilterCheckbox
              key={option}
              label={option}
              checked={selectedAgeListing === option}
              onChange={(e) =>
                handleCheckboxChange(
                  option,
                  e.target.checked,
                  setSelectedAgeListing
                )
              }
            />
          ))}
        </FilterSection>
      </div>
    </>
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <CategoryBanner
        categoryName={searchBannerTitle || categoryName}
        banner={categoryBanner}
      />
      <div className="flex min-h-screen container m-auto  my-11">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <SidebarContent />
        </div>

        {/* Mobile hamburger */}
        <div>
          <div className="block lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 border rounded-md z-50 -mt-11 fixed ml-4 bg-white"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div
                className="fixed inset-0 bg-black bg-opacity-40"
                onClick={() => setIsSidebarOpen(false)}
              />
              <div className="relative bg-white w-80 h-full overflow-auto shadow-lg z-50">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute top-3 right-3 p-1 rounded-full bg-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="mt-11">
                  <SidebarContent />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 px-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 gap-4 w-full">

  {/* SEARCH (flex-grow + shrink allowed) */}
  <div className="relative flex-1 min-w-0">
    <span className="biz-search-icon">
      <SearchOutlined style={{ fontSize: 15 }} />
    </span>

    <input
      className="biz-search-input w-full"
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search your perfect business…"
    />
  </div>

  {/* RIGHT SIDE CONTROLS (fixed size) */}
  <div className="flex items-center gap-4 flex-shrink-0">

    {/* Pagination */}
    <div className="hidden md:block">
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={businessFilter?.meta?.total || 0}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>

    {/* View Toggle */}
    <div className="flex gap-1">
      <Button
        type={viewMode === "grid" ? "primary" : "default"}
        icon={<AppstoreOutlined />}
        onClick={() => setViewMode("grid")}
        className={viewMode === "grid" ? "view-btn-active" : ""}
      />
      <Button
        type={viewMode === "list" ? "primary" : "default"}
        icon={<UnorderedListOutlined />}
        onClick={() => setViewMode("list")}
        className={viewMode === "list" ? "view-btn-active" : ""}
      />
    </div>

  </div>
</div>

          {/* ── Loading skeletons ── */}
          {isLoading ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              }
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <BusinessCardSkeleton key={i} viewMode={viewMode} />
              ))}
            </div>
          ) : business?.length === 0 ? (
            /* ── No data ── */
            <NoDatafound />
          ) : (
            /* ── Business cards ── */
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              }
            >
              {business?.map((business) => (
  <div
    key={business._id}
    className="rounded-lg border border-[#bcd2e2]  bg-cover bg-center overflow-hidden"
    style={{ backgroundImage: `url(${backCard.src})` }}
  >
    <div>
      {/* IMAGE */}
      <div className="h-48 relative">
        <Image
          src={`${imageUrl}/Uploads/business-image/${business?.image}`}
          alt={business?.title}
          className="w-full h-full object-cover rounded-t"
          width={400}
          height={192}
          priority={false}
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {business?.title}
        </h3>

        <div className="mt-2 bg-[#2b9de9ef] text-sm inline-block rounded px-2 py-0.5 text-white">
  <span>{business?.countryName}</span>

  {business?.city && business.city !== "undefined" && (
    <>
      <span className="mx-1">,</span>
      <span>{business.city}</span>
    </>
  )}
</div>

        <p className="text-gray-600 mb-2">
          {business?.location}
        </p>

        <div className="mb-2">
          <span className="text-blue-500">
            {business?.category?.categoryName}
          </span>{" "}
          ||{" "}
          <span className="text-[#D97706]">
            {business?.subCategory?.name}
          </span>
        </div>

        <p className="text-gray-800 mb-2">
          Asking Price :{" "}
          <span className="font-semibold">
            {business?.askingPrice}
          </span>
        </p>

        <p className="text-gray-800 mb-4">
          Price :{" "}
          <span className="font-semibold">
            ${business?.price}
          </span>
        </p>

        <Link
          href={
            country === "international"
              ? `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
              : `/${country}/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`
          }
          onClick={(e) =>
            handleNavClick(
              `/${business?.category?.slug}/${business?.subCategory?.slug}/${business?.slug}`,
              e
            )
          }
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  </div>
))}
            </div>
          )}

          {/* Mobile pagination */}
          <div className="block md:hidden">
            <div className="flex justify-center mt-11 items-center gap-2">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={businessFilter?.meta?.total || 0}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}