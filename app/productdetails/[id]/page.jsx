"use client";
import { useAppContext } from "../../context/context";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function ProductDetails() {
  const { products } = useAppContext();
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const product = products.find(
    (p) => p.id.toString() === productId.toString()
  );
  const [selectedImage, setSelectedImage] = useState(product?.image);

  if (!product)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Product not found
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
      >
        &larr; Back to Products
      </button>

      {/* العنوان والوصف */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {product.name}
        </h1>
        <p className="text-gray-700 text-lg">{product.des}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* قسم الصور */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg mb-4 border border-gray-200 shadow-inner"
            />
            <div className="flex gap-3 overflow-x-auto py-2">
              {[
                product.image,
                product.image1,
                product.image2,
                product.image3,
                product.image4,
              ]
                .filter(Boolean)
                .map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`img-${i}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-4 transition-all ${
                      selectedImage === img
                        ? "border-indigo-500 scale-105"
                        : "border-gray-300"
                    } hover:border-indigo-400 hover:scale-105`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* قسم التفاصيل */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-3">
            <p className="text-2xl font-semibold text-gray-900">
              Price: ${product.price}
            </p>
            {product.sale && (
              <p className="text-red-500 font-bold text-lg">
                Sale: {product.sale}% off
              </p>
            )}
            <p className="text-gray-700">Quantity: {product.quantity}</p>
            <p className="text-gray-700">
              Average Rate: {product.averagerate || 0}
            </p>
            <p className="text-gray-700">
              Rate Count: {product.ratecount || 0}
            </p>
            <p className="text-gray-500 text-sm">
              Added on:{" "}
              {new Date(product.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* المواصفات */}
          {[
            ["General Info", product.general],
            ["Product Details", product.myproduct],
            ["Dimensions", product.dimensions],
            ["Warranty", product.warranty],
          ]
            .filter(([_, value]) => value)
            .map(([title, obj], idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-5 rounded-xl shadow-inner space-y-2"
              >
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2 mb-2">
                  {title}
                </h2>
                {Object.entries(obj).map(([key, val]) => (
                  <p key={key}>
                    <span className="font-semibold text-gray-700">{key}: </span>
                    <span className="text-gray-600">{val}</span>
                  </p>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
