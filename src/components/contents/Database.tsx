"use client";

import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import Cookies from "js-cookie";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

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
  categoryProduct?: {
    id: number;
    name: string;
    type: string;
  };
}

const LIMIT = 10;

const fetcher = async (url: string) => {
  const token = Cookies.get("token");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const res = await response.json();
  let products = [];
  let totalPages = 1;
  let currentPage = 1;

  if (Array.isArray(res.data)) {
    products = res.data;
    totalPages = res.pagination?.totalPage ?? 1;
    currentPage = res.pagination?.currentPage ?? 1;
  } else if (res.data && Array.isArray(res.data.products)) {
    products = res.data.products;
    const total = res.data.product_quantity || products.length || 0;
    const limit = res.data.limit || products.length || 10;
    totalPages = Math.ceil(total / limit) || 1;
    currentPage = res.data.page || 1;
  }

  return {
    products,
    totalPages,
    currentPage,
  };
};



export const Database = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const SEARCH_API_URL = `${API_BASE_URL}/products/search`;
  const ALL_PRODUCTS_API_URL = `${API_BASE_URL}/admin/products`;
  const DELETE_PRODUCT_API = (id: number) => `${API_BASE_URL}/products/${id}`;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);

  const endpoint = searchTerm
    ? `${SEARCH_API_URL}?name=${searchTerm}&page=${page}&limit=${LIMIT}`
    : `${ALL_PRODUCTS_API_URL}?page=${page}&limit=${LIMIT}`;

  const { data, error, isLoading } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch products: ${error.message}`);
    }
  }, [error]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handleDelete = async () => {
    if (!selectedProduct) return;

    const token = Cookies.get("token");
    try {
      const response = await fetch(DELETE_PRODUCT_API(selectedProduct.id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }

      toast.success("Product deleted successfully!");
      mutate(endpoint);
    } catch {
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setSelectedProduct(null);
    }
  };

  const products = data?.products || [];
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.currentPage ?? 1;

  return (
    <div className="min-h-screen p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-left mb-5">Products Database</h1>

      <div className="flex items-center gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      {error && (
        <p className="text-red-500 text-center">
          Failed to load products. Please try again.
        </p>
      )}

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: LIMIT }).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col text-sm"
            >
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

      {!isLoading && products.length === 0 && (
        <p className="text-gray-500 text-center">No products found.</p>
      )}

      {!isLoading && products.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="relative bg-white shadow-md rounded-lg overflow-hidden flex flex-col text-sm"
              >
                <Button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute bottom-2 right-2 text-red-500 p-2 hover:bg-red-300 rounded-md"
                  aria-label="Delete product"
                  variant="ghost"
                >
                  <Trash2 size={18} />
                </Button>

                <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
                  <Image
                    src={product.photo}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="p-3"
                  />
                </div>

                <div className="p-3">
                  <h2 className="font-semibold truncate">{product.name}</h2>
                  <p className="text-xs text-gray-600">
                    Brand: {product.brand}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    Category: {product.category_product_id}
                  </p>
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-800">
                      Price A: Rp {product.price_a.toLocaleString()}
                    </p>
                    <p className="text-xs font-medium text-gray-800">
                      Price B: Rp {product.price_b.toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center">
                    <p className="text-xs">Label: </p>
                    <Image
                      src={product.label.link}
                      alt={`Label ${product.label.name}`}
                      width={20}
                      height={20}
                      className="w-6 h-6 ml-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination className="mt-6 flex justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setPage(currentPage - 1);
                  }}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setPage(currentPage + 1);
                  }}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : 0}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
      {selectedProduct && (
        <Dialog
          open={!!selectedProduct}
          onOpenChange={() => setSelectedProduct(null)}
        >
          <DialogContent>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedProduct.name}</strong>? This action cannot be
              undone.
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedProduct(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 text-white"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
