import React from "react";
import Image from "next/image";
import SendBouttn from "@/app/components/SendBouttn";

// جلب بيانات المنتج
async function getProduct(id) {
  try {
    const res = await fetch(`http://127.0.0.1:1337/api/products/${id}?populate=*`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}


export default async function ProductPage({ params }) {
  const post = await getProduct(params.id);

  if (!post) {
    return <div className="text-center text-red-500">Error: Product not found</div>;
  }

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      {/* بيانات المنتج */}
      <div className="flex w-full flex-col items-center gap-5">
        <h1 className="font-extrabold text-lg text-right md:text-4xl">{post.title}</h1>
        <Image
          src={`http://127.0.0.1:1337${post.image?.url || "/placeholder.jpg"}`}
          width={1000}
          height={1000}
          className="w-3/4 rounded-lg shadow-lg"
          alt={post.title}
        />
        <p className={`px-4 py-1 rounded-md text-sm ${post.category === "scary" ? "bg-red-700 text-white" : "bg-green-700 text-white"}`}>
          {post.category}
        </p>
        <div className="text-right w-4/5">
          <p className="font-bold">{post.descrption}</p>
        </div>
      </div>
      {/* نموذج إضافة تعليق */}
      <div className="w-4/5">
        <h3 className="font-extrabold text-lg">اترك لنا تعليق</h3>
        <form  method="POST" className="flex flex-col gap-4">
          <input className="w-full p-2 border rounded-md" type="text" name="name" placeholder="اسمك" required />
          <textarea className="w-full p-2 border rounded-md h-40" name="text" placeholder="ضع تعليق" required></textarea>
          <input type="hidden" name="productId" value={post.id} />
          <SendBouttn />
        </form>
      </div>

    </div>
  );
}
