"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@/components/ui/skeleton"; // ShadCN UI Skeleton

interface Product {
  id: number;
  name: string;
  brand: string;
  photo: string;
  category_product_id: number;
  nutrition_fact_id: number;
  barcode: string;
  price_a: number;
  price_b: number;
  label_id: number;
  nutri_score: number;
  label: {
    id: number;
    name: string;
    link: string;
  };
}

export const Database = () => {
  const token = Cookies.get("token");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const SEARCH_API_URL = `${API_BASE_URL}/products/search`;
  const ALL_PRODUCTS_API_URL = `${API_BASE_URL}/admin/products`;

  console.log("API BASE URL:", API_BASE_URL);
  console.log("Search API URL:", SEARCH_API_URL);
  console.log("All Products API URL:", ALL_PRODUCTS_API_URL);
  console.log("TOKEN:", token);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Debounce input (menunggu user selesai mengetik sebelum melakukan request API)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Fetch data: Semua produk atau hasil pencarian
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const url = debouncedSearch
        ? `${SEARCH_API_URL}?name=${debouncedSearch}&page=1&limit=20`
        : `${ALL_PRODUCTS_API_URL}`;

      console.log("Fetching URL:", url);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
        const extractedProducts = data.data.products || data.data;

        if (extractedProducts && Array.isArray(extractedProducts)) {
          setProducts(extractedProducts);
        } else {
          throw new Error("Data format is incorrect");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error(`Failed to fetch products: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-xl font-bold mb-4">Products Database</h1>

      {/* Input Search */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
        <Button variant="outline" onClick={() => setDebouncedSearch(searchTerm)}>
          Search
        </Button>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col text-sm">
              <Skeleton className="w-full h-40 bg-gray-200" />
              <div className="p-3">
                <Skeleton className="h-4 w-3/4 bg-gray-300 mb-2" />
                <Skeleton className="h-3 w-1/2 bg-gray-300 mb-2" />
                <Skeleton className="h-3 w-2/3 bg-gray-300 mb-2" />
                <Skeleton className="h-3 w-1/4 bg-gray-300 mb-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tampilkan hasil pencarian atau semua data */}
      {!loading && products.length === 0 && <p className="text-gray-500 text-center">No products found.</p>}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col text-sm">
              <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
                <Image src={product.photo} alt={product.name} layout="fill" objectFit="contain" className="p-3" />
              </div>

              <div className="p-3">
                <h2 className="font-semibold truncate">{product.name}</h2>
                <p className="text-xs text-gray-600">Brand: {product.brand}</p>
                <p className="text-xs text-gray-600 truncate">Category: {product.category_product_id}</p>
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-800">Price A: Rp {product.price_a.toLocaleString()}</p>
                  <p className="text-xs font-medium text-gray-800">Price B: Rp {product.price_b.toLocaleString()}</p>
                </div>
                <div className="mt-3 flex items-center">
                  <p className="text-xs">Label: </p>
                  <Image src={product.label.link} alt={`Label ${product.label.name}`} width={20} height={20} className="w-6 h-6 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
