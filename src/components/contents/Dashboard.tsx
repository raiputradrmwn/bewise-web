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
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
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

export default function AddProductPage() {
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
    formData.append("price_a", data.price_a);
    formData.append("price_b", data.price_b);
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
  const onDrop = (acceptedFiles: File[]) => {
    setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
    const dataTransfer = new DataTransfer();
    acceptedFiles.forEach(file => dataTransfer.items.add(file));
    setValue("photo", dataTransfer.files, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop,
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <ToastContainer />
      <div className="bg-white p-8 md:p-16 rounded-xl shadow-lg w-full mx-2 md:mx-12">
        <h1 className="text-3xl font-bold text-left mb-2">Add New Product</h1>
        <p className="text-left text-gray-500 mb-8">
          Enter product details and nutrition information
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter product name..."
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  type="text"
                  {...register("brand", { required: true })}
                  placeholder="Enter brand name..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  type="text"
                  {...register("barcode", { required: true })}
                  placeholder="Enter barcode..."
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price_a">Price A</Label>
                <Input
                  id="price_a"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price_a", { required: true })}
                  placeholder="10.000"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price_b">Price B</Label>
                <Input
                  id="price_b"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price_b", { required: true })}
                  placeholder="20.000"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => setValue("category_product_id", value)}
              >
                <SelectTrigger id="category" className="mt-1">
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


            <div>
              <Label htmlFor="photo">Product Photo</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center mt-1 cursor-pointer ${isDragActive ? "bg-blue-50 border-blue-400" : ""
                  }`}
              >
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  {...register("photo", { required: true })}
                  onChange={handleFileChange}
                  className="border-0 opacity-0 cursor-pointer absolute inset-0"
                  {...getInputProps()} name="photo"
                />

                <label
                  htmlFor="photo"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <IconUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="font-medium text-gray-500">
                    {isDragActive ? "Drop the files here ..." : "Upload a product photo"}
                  </span>
                  <span className="text-xs text-gray-400">
                    Drag and drop or click to browse
                  </span>
                </label>
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded-lg shadow"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="border-t my-8"></div>
          <h2 className="text-xl font-bold mb-4">Nutrition Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="energy">Energy (kcal)</Label>
              <Input
                id="energy"
                type="number"
                step="0.01"
                min="0"
                {...register("energy", { required: true })}
                placeholder="0.0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="saturated_fat">Saturated Fat (g)</Label>
              <Input
                id="saturated_fat"
                type="number"
                step="0.01"
                min="0"
                {...register("saturated_fat", { required: true })}
                placeholder="0.0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sugar">Sugar (g)</Label>
              <Input
                id="sugar"
                type="number"
                step="0.01"
                min="0"
                {...register("sugar", { required: true })}
                placeholder="0.0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sodium">Sodium (mg)</Label>
              <Input
                id="sodium"
                type="number"
                step="0.001"
                min="0"
                {...register("sodium", { required: true })}
                placeholder="0.0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                step="0.01"
                min="0"
                {...register("protein", { required: true })}
                placeholder="0.0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fiber">Fiber (g)</Label>
              <Input
                id="fiber"
                type="number"
                step="0.01"
                min="0"
                {...register("fiber", { required: true })}
                placeholder="0.0"
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="fruit_vegetable">Fruit & Vegetable (%)</Label>
              <Input
                id="fruit_vegetable"
                type="number"
                step="0.01"
                min="0"
                {...register("fruit_vegetable", { required: true })}
                placeholder="0.0"
                className="mt-1"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-8 text-lg font-bold py-6 bg-[#2763e5] hover:bg-[#174fb8] rounded-xl shadow"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
}
