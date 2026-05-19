// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  console.log("🚀 Middleware Running:", path);

  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value;
  const isSubscribed = request.cookies.get("subscriptionPlan")?.value;
  const selectedCountry = request.cookies.get("selectedCountry")?.value;

  // ==================== COUNTRY PREFIX LOGIC ====================
  const segments = path.split("/").filter(Boolean);
  const firstSegment = segments[0];

  const isCountryPrefix = 
    selectedCountry && 
    selectedCountry !== "international" && 
    firstSegment === selectedCountry;

  const effectivePath = isCountryPrefix 
    ? "/" + segments.slice(1).join("/") || "/" 
    : path;

  // Country Rewrite হলে লগ দেখাবে
  if (isCountryPrefix) {
    console.log(`🌍 COUNTRY REWRITE: ${path} → ${effectivePath}`);
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = effectivePath;
    return NextResponse.rewrite(rewriteUrl);
  }

  // ==================== AUTH & PROTECTION ====================
  const protectedPaths = [
    "/chat", 
    "/myBusiness/details", 
    "/addnewbusiness", 
    "/profilePage", 
    "/subscription",
    "/buyer-contact-info"
  ];

  const isProtected = protectedPaths.some(p => effectivePath.startsWith(p));

  if (isProtected && !token) {
    console.log("🔒 Redirecting to login (No Token)");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (effectivePath.startsWith("/addnewbusiness") && role === "Investor") {
    console.log("🚫 Investor blocked from adding business");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Subscription Check
  const subscriptionRequired = ["/addnewbusiness", "/chat", "/subscription"];
  const needsSubscription = subscriptionRequired.some(p => effectivePath.startsWith(p));

  if (needsSubscription && !isSubscribed) {
    console.log("💳 Subscription required, redirecting to /plane");
    return NextResponse.redirect(new URL("/plane", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};