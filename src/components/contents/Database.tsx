"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
interface Product {
  id: number;
  name: string;
  brand: string;
  photo: string;
  categoryProduct: {
    id: number;
    name: string;
  };
  price_a: number;
  price_b: number;
  label: {
    id: number;
    name: string;
    link: string;
  };
}

export const Database = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const DATABASE_API_URL = `${API_BASE_URL}/admin/products`;

  // Fetch products with Bearer Token
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Ambil token dari cookies
        const token = Cookies.get("token");
        const response = await fetch(DATABASE_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Tambahkan Bearer Token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [DATABASE_API_URL]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Products Database</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Image
                src={product.photo}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                <p className="text-sm text-gray-600">
                  Category: {product.categoryProduct.name}
                </p>
                <div className="flex items-center mt-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Price A: Rp {product.price_a.toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 ml-4">
                    Price B: Rp {product.price_b.toLocaleString()}
                  </p>
                </div>
                <div className="mt-3 flex items-center">
                  <p className="text-sm">Label: </p>
                  <Image
                    src={product.label.link}
                    alt={`Label ${product.label.name}`}
                    className="w-6 h-6 ml-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
