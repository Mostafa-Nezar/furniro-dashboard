"use client";
import { useAppContext } from "../../context/context";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function ProductDetails() {
  const { products } = useAppContext();
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const product = products.find((p) => p.id.toString() === productId.toString());
  const [selectedImage, setSelectedImage] = useState(product?.image);

  if (!product)
    return <p className="text-center mt-10 text-red-500 font-semibold">Product not found</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        &larr; Back to Products
      </button>

      {/* العنوان والوصف */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
        <p className="text-gray-700 text-lg">{product.des}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* قسم الصور */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg mb-4 border border-gray-200"
            />
            <div className="flex gap-3 overflow-x-auto">
              {[product.image, product.image1, product.image2, product.image3, product.image4]
                .filter(Boolean)
                .map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`img-${i}`}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition ${
                      selectedImage === img ? "border-blue-500" : "border-gray-300"
                    } hover:border-blue-400`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* قسم التفاصيل */}
        <div className="flex-1 space-y-5">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
            <p className="text-2xl font-semibold text-gray-900">Price: ${product.price}</p>
            {product.sale && (
              <p className="text-red-500 font-bold text-lg">Sale: {product.sale}% off</p>
            )}
            <p className="text-gray-700">Quantity: {product.quantity}</p>
            <p className="text-gray-700">Average Rate: {product.averagerate || 0}</p>
            <p className="text-gray-700">Rate Count: {product.ratecount || 0}</p>
            <p className="text-gray-500 text-sm">
              Added on:{" "}
              {new Date(product.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* المواصفات العامة */}
          {product.general && (
            <div className="bg-gray-50 p-5 rounded-lg shadow-inner space-y-2">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2 mb-2">
                General Info
              </h2>
              {Object.entries(product.general).map(([key, val]) => (
                <p key={key}>
                  <span className="font-semibold text-gray-700">{key}: </span>
                  <span className="text-gray-600">{val}</span>
                </p>
              ))}
            </div>
          )}

          {/* تفاصيل المنتج */}
          {product.myproduct && (
            <div className="bg-gray-50 p-5 rounded-lg shadow-inner space-y-2">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2 mb-2">
                Product Details
              </h2>
              {Object.entries(product.myproduct).map(([key, val]) => (
                <p key={key}>
                  <span className="font-semibold text-gray-700">{key}: </span>
                  <span className="text-gray-600">{val}</span>
                </p>
              ))}
            </div>
          )}

          {/* الأبعاد */}
          {product.dimensions && (
            <div className="bg-gray-50 p-5 rounded-lg shadow-inner space-y-2">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2 mb-2">
                Dimensions
              </h2>
              {Object.entries(product.dimensions).map(([key, val]) => (
                <p key={key}>
                  <span className="font-semibold text-gray-700">{key}: </span>
                  <span className="text-gray-600">{val}</span>
                </p>
              ))}
            </div>
          )}

          {/* الضمان */}
          {product.warranty && (
            <div className="bg-gray-50 p-5 rounded-lg shadow-inner space-y-2">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2 mb-2">
                Warranty
              </h2>
              {Object.entries(product.warranty).map(([key, val]) => (
                <p key={key}>
                  <span className="font-semibold text-gray-700">{key}: </span>
                  <span className="text-gray-600">{val}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
