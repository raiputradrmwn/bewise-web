"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const LOGIN_API_URL = `${API_BASE_URL}/admin/login`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Login failed. Please check your credentials.";
        toast.error(errorMessage); // Tampilkan pesan error menggunakan Toast
        return;
      }
  
      const data = await response.json();
      const token = data?.data?.token;
      if (!token) {
        throw new Error("Token not found in the response.");
      }
  
      Cookies.set("token", token, { expires: 7, sameSite: "Strict" });
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="relative min-h-screen w-full flex items-center justify-center p-4 flex-col bg-gray-50">
        <div className="flex flex-col items-center w-full max-w-2xl">
          <Link href="/">
            <Image
              src="/img/Logo.svg"
              alt="Logo"
              width={800}
              height={800}
              className="w-48 sm:w-64 mx-auto mb-4 mt-1"
              priority
            />
          </Link>

          <div className="relative w-full bg-white shadow-2xl p-6 sm:p-8 md:p-16 mt-4 border border-gray-100 rounded-2xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-bold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your Email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 mt-6 text-white bg-gradient-to-r from-[#2B59C3] to-[#133042] rounded-[12px] ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-[#2B59C3] hover:to-[#0F2A3C]"
                } transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-300`}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
