"use client";
import { useAppContext } from "../context/context";
import { useRouter } from "next/navigation";


export default function Products() {
  const { products,  deleteProduct } = useAppContext(); 
  const router = useRouter();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Products List</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200 flex justify-between items-center"
            >
              <div>
                <h2 onClick={() => router.push(`/productdetails/${product.id}`)} className="cursor-pointer text-xl font-semibold">{product.name}</h2>
                <p className="text-white text-2xl">{product.id}</p>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-gray-600">{product.quantity}</p>
                <p className="text-white text-2xl">{product.averagerate}</p>
                <p className="text-white text-2xl">{product.ratecount}</p>
                <p className="text-gray-600">{new Date(product.date).toLocaleDateString("en-US", {day: "numeric", month: "long",year: "numeric", hour: "2-digit",minute: "2-digit" })}</p>
              </div>
              <button onClick={() => router.push(`/editproduct/${product.id}`)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200">
                edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
