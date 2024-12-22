"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    // Periksa apakah token login tersedia
    const token = Cookies.get("token");
    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      router.push("/loginadmin");
    }
  }, [router]);

  const handleLogout = () => {
    // Hapus token dari cookies
    Cookies.remove("token");
    // Arahkan ke halaman login
    router.push("/loginadmin");
  };

  return (
    <div className="min-h-screen max-w-screen flex flex-col items-center justify-center">
      {/* Dashboard Content */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Welcome to the Dashboard
      </h1>
      <p className="text-gray-600 mt-4">
        This is a secure area. Please ensure you log out after use.
      </p>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};
