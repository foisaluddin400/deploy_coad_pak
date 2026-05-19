// hooks/useCountry.js
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

export const useCountry = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [country, setCountry] = useState("international");

  // Load country from cookie on mount
  useEffect(() => {
    const saved = Cookies.get("selectedCountry");
    if (saved) {
      setCountry(saved);
    }
  }, []);

  // Navigate with country prefix
const pushWithCountry = (path) => {
  const currentCountry = Cookies.get("selectedCountry") || "international";

  if (currentCountry === "international") {
    router.push(path);
  } else {
    const cleanPath = path === "/" ? "" : path;
    router.push(`/${currentCountry}${cleanPath}`);
  }
};

  return { country, pushWithCountry };
};