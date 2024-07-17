import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import { NextResponse } from "next/server";

import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, privateRoutes, authRoutes } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = req.url.startsWith(apiAuthPrefix);
  const isPrivateRoute = privateRoutes.some((route: string | RegExp) => {
    if (typeof route === "string") {
      return nextUrl.pathname === route;
    } else if (route instanceof RegExp) {
      return route.test(nextUrl.pathname);
    }
    return false;
  });

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (isPrivateRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`/auth/login?redirect_back=${encodedCallbackUrl}`, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
