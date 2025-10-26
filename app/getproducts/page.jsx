"use client";
import { useAppContext } from "../context/context";
import { useRouter } from "next/navigation";

export default function Products() {
  const { products, deleteProduct } = useAppContext();
  const router = useRouter();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Products List</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
          >
            {/* الصورة أو العنوان */}
            <div
              className="p-5 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => router.push(`/productdetails/${product.id}`)}
            >
              <h2 className="text-xl font-semibold text-gray-800 hover:text-indigo-600">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{product.id}</p>
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-md h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* تفاصيل المنتج */}
            <div className="px-5 pb-4 space-y-2 text-gray-700">
              <p className="text-lg font-semibold text-indigo-600">
                ${product.price}
              </p>
              <p className="text-sm">Quantity: {product.quantity}</p>
              <div className="flex justify-between items-center text-sm">
                <p>⭐ {product.averagerate || 0}</p>
                <p>({product.ratecount || 0} reviews)</p>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Added:{" "}
                {new Date(product.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* الأزرار */}
            <div className="flex justify-between items-center px-5 py-3 bg-gray-50 border-t">
              <button
                onClick={() => router.push(`/editproduct/${product.id}`)}
                className="text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-sm font-medium bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
