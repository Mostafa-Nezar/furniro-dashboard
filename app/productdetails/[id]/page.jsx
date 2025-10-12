"use client";
import { useAppContext } from "../context/context";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function ProductDetails() {
  const { products } = useAppContext();
  const router = useRouter();
  const params = useParams();
  const productId = params.id; 

  const product = products.find((p) => p.id.toString() === productId.toString());

  const [selectedImage, setSelectedImage] = useState(product?.image);

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:underline"
      >
        &larr; Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.des}</p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* قسم الصور */}
        <div className="flex-1">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg mb-4"
          />
          <div className="flex gap-2">
            {[product.image, product.image1, product.image2, product.image3, product.image4]
              .filter(Boolean)
              .map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`img-${i}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                    selectedImage === img ? "border-blue-500" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
          </div>
        </div>

        {/* قسم التفاصيل */}
        <div className="flex-1 space-y-4">
          <p className="text-xl font-semibold text-gray-800">Price: ${product.price}</p>
          {product.sale && (
            <p className="text-red-500 font-bold">Sale: {product.sale}% off</p>
          )}
          <p className="text-gray-700">Quantity: {product.quantity}</p>
          <p className="text-gray-700">Average Rate: {product.averagerate || 0}</p>
          <p className="text-gray-700">Rate Count: {product.ratecount || 0}</p>
          <p className="text-gray-500">
            Added on:{" "}
            {new Date(product.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* المواصفات العامة */}
          {product.general && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-bold mb-2">General Info</h2>
              {Object.entries(product.general).map(([key, val]) => (
                <p key={key}>
                  <span className="font-semibold">{key}: </span>
                  {val}
                </p>
              ))}
            </div>
          )}

          {/* المنتج نفسه */}
          {product.myproduct && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-bold mb-2">Product Details</h2>
              {Object.entries(product.myproduct).map(([key, val]) => (
                <p key={key}>
                  <span className="font-semibold">{key}: </span>
                  {val}
                </p>
              ))}
            </div>
          )}

          {/* الأبعاد */}
          {product.dimensions && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-bold mb-2">Dimensions</h2>
              {Object.entries(product.dimensions).map(([key, val]) => (
                <p key={key}>
                  <span className="font-semibold">{key}: </span>
                  {val}
                </p>
              ))}
            </div>
          )}

          {/* الضمان */}
          {product.warranty && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-bold mb-2">Warranty</h2>
              {Object.entries(product.warranty).map(([key, val]) => (
                <p key={key}>
                  <span className="font-semibold">{key}: </span>
                  {val}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
