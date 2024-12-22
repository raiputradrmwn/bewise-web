import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Ambil token dari cookies
  const token = req.cookies.get("token");

  console.log("Requested URL:", req.url); // Debugging
  console.log("Token:", token); // Debugging

  if (!token) {
    console.log("Token not found, redirecting to login...");
    return NextResponse.redirect(new URL("/loginadmin", req.url));
  }

  console.log("Token found, proceeding to the requested route...");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Terapkan pada semua rute di bawah /dashboard/
};
