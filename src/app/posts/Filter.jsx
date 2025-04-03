"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // استرجاع القيم من الـ URL إذا كانت موجودة
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // تحديث الفلتر عند البحث
  const handleFilter = () => {
    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (search) query.append("search", search);

    router.push(`/products?${query.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center bg-gray-100 p-4 rounded-md shadow-md">
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="أدخل النوع"
        className="border p-2 rounded-md"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="أدخل اسم المنتج"
        className="border p-2 rounded-md"
      />
      <button onClick={handleFilter} className="bg-green-600 text-white px-4 py-2 rounded-md">
        تصفية 🔍
      </button>
    </div>
  );
}
