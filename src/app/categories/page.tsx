// app/categories/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Category } from "../types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-6 text-black">Categories</h1>
        <a
          href="/categories/add"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Category
        </a>
      </div>
      {categories.length === 0 ? (
        <p className="text-gray-700">No categories available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-black">{category.name}</h2>
              <p className="text-gray-700 mt-2">{category.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
