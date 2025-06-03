"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Category {
  id: number;
  name: string;
  type: "BEVERAGE" | "FOOD";
}

interface ProductFormData {
  name: string;
  brand: string;
  barcode: string;
  price_a: string;
  price_b: string;
  category_product_id: string;
  photo: FileList;
  energy: string;
  saturated_fat: string;
  sugar: string;
  sodium: string;
  protein: string;
  fiber: string;
  fruit_vegetable: string;
}

export const Dashboard = () => {
  const token = Cookies.get("token");
  const [categories, setCategories] = useState<Category[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ProductFormData>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }

        const data = await response.json();
        setCategories(data.data.categories);
      } catch {
        toast.error("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  const formatRupiah = (value: string) => {
    const number = value.replace(/\D/g, ""); // Hapus semua karakter non-angka
    return number
      ? `Rp ${new Intl.NumberFormat("id-ID").format(parseInt(number))}`
      : "Rp 0";
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!data.photo || data.photo.length === 0) {
      toast.error("Please upload a product photo.");
      return;
    }

    const category = categories.find(
      (cat) => cat.id === parseInt(data.category_product_id)
    );
    const endpoint =
      category?.type === "BEVERAGE"
        ? `${API_BASE_URL}/products/beverages`
        : `${API_BASE_URL}/products/foods`;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("photo", data.photo[0]);
    formData.append("category_product_id", data.category_product_id);
    formData.append("barcode", data.barcode);
    formData.append("price_a", data.price_a.replace(/\D/g, "")); // Hapus Rp dan titik
    formData.append("price_b", data.price_b.replace(/\D/g, "")); // Hapus Rp dan titik
    formData.append("nutritionFact.energy", data.energy.replace(",", "."));
    formData.append(
      "nutritionFact.saturated_fat",
      data.saturated_fat.replace(",", ".")
    );
    formData.append("nutritionFact.sugar", data.sugar.replace(",", "."));
    formData.append("nutritionFact.sodium", data.sodium.replace(",", "."));
    formData.append("nutritionFact.protein", data.protein.replace(",", "."));
    formData.append("nutritionFact.fiber", data.fiber.replace(",", "."));
    formData.append(
      "nutritionFact.fruit_vegetable",
      data.fruit_vegetable.replace(",", ".")
    );

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product.");
      }

      toast.success("Product added successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-4 flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Label>Name</Label>
            <Input
              type="text"
              {...register("name", { required: true })}
              placeholder="Product Name"
            />

            <Label>Brand</Label>
            <Input
              type="text"
              {...register("brand", { required: true })}
              placeholder="Brand"
            />

            <Label>Barcode</Label>
            <Input
              type="text"
              {...register("barcode", { required: true })}
              placeholder="Barcode"
            />

            <Label>Price A</Label>
            <Input
              type="text"
              {...register("price_a", { required: true })}
              placeholder="Rp 0"
              onChange={(e) =>
                setValue("price_a", formatRupiah(e.target.value))
              }
            />

            <Label>Price B</Label>
            <Input
              type="text"
              {...register("price_b", { required: true })}
              placeholder="Rp 0"
              onChange={(e) =>
                setValue("price_b", formatRupiah(e.target.value))
              }
            />

            <Label>Category</Label>
            <Select
              onValueChange={(value) => setValue("category_product_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Product Photo</Label>
            <Input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              onChange={handleFileChange}
            />
          </div>

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover"
            />
          )}

          <h2 className="text-lg font-bold mt-6 mb-4">Nutrition Facts</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              "energy",
              "saturated_fat",
              "sugar",
              "sodium",
              "protein",
              "fiber",
              "fruit_vegetable",
            ].map((key) => (
              <Input
                key={key}
                type="number"
                step="0.001"
                min="0"
                {...register(key as keyof ProductFormData, { required: true })}
                placeholder={key.replace("_", " ")}
                pattern="[0-9]+([,\.][0-9]+)?"
              />
            ))}
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-[#2B59C3] hover:bg-[#2B59C3]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
};
