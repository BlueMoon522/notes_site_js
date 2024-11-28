// middleware.ts (root of your project)
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const middleware = async (request) => {
  // Get the cookies from the request
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt");

  // If the cookie doesn't exist, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login
  }

  // If the token exists, allow the request to continue
  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/*", "/protected-page", "/notes"], // Protect these routes
};
export default middleware;
