"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NutritionFact {
  energy: number | "";
  saturated_fat: number | "";
  sugar: number | "";
  sodium: number | "";
  protein: number | "";
  fiber: number | "";
  fruit_vegetable: number | "";
}

interface FormData {
  name: string;
  brand: string;
  photo: string;
  category_product_id: number | "";
  barcode: string;
  price_a: number | "";
  price_b: number | "";
  nutritionFact: NutritionFact;
}

interface Category {
  id: number;
  name: string;
  type: "BEVERAGE" | "FOOD";
}

export const Dashboard = () => {
  const token = Cookies.get("token");
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    brand: "",
    photo: "",
    category_product_id: "",
    barcode: "",
    price_a: "",
    price_b: "",
    nutritionFact: {
      energy: "",
      saturated_fat: "",
      sugar: "",
      sodium: "",
      protein: "",
      fiber: "",
      fruit_vegetable: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://prod-bewise.up.railway.app/api/v1/categories/products",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "category_product_id" ||
        name === "price_a" ||
        name === "price_b"
          ? parseFloat(value)
          : value,
    });
  };

  const handleNutritionFactChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name in formData.nutritionFact) {
      setFormData({
        ...formData,
        nutritionFact: {
          ...formData.nutritionFact,
          [name]: parseFloat(value) || 0,
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Determine the endpoint based on category type
    const category = categories.find(
      (cat) => cat.id === formData.category_product_id
    );
    const endpoint =
      category?.type === "BEVERAGE"
        ? "https://prod-bewise.up.railway.app/api/v1/products/beverages"
        : "https://prod-bewise.up.railway.app/api/v1/products/foods";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              value={formData.photo}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="barcode"
              placeholder="Barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="price_a"
              placeholder="Price A"
              value={formData.price_a}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="price_b"
              placeholder="Price B"
              value={formData.price_b}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <select
              name="category_product_id"
              value={formData.category_product_id}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <h2 className="text-lg font-bold mt-6 mb-4">Nutrition Facts</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="energy"
              placeholder="Energy"
              value={formData.nutritionFact.energy}
              onChange={handleNutritionFactChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="saturated_fat"
              placeholder="Saturated Fat"
              value={formData.nutritionFact.saturated_fat}
              onChange={handleNutritionFactChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="sugar"
              placeholder="Sugar"
              value={formData.nutritionFact.sugar}
              onChange={handleNutritionFactChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="sodium"
              placeholder="Sodium"
              value={formData.nutritionFact.sodium}
              onChange={handleNutritionFactChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="protein"
              placeholder="Protein"
              value={formData.nutritionFact.protein}
              onChange={handleNutritionFactChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="fiber"
              placeholder="Fiber"
              value={formData.nutritionFact.fiber}
              onChange={handleNutritionFactChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="fruit_vegetable"
              placeholder="Fruit & Vegetable"
              value={formData.nutritionFact.fruit_vegetable}
              onChange={handleNutritionFactChange}
              className="p-2 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-md mt-6 font-bold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};
