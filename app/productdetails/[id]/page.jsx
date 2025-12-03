"use client";
import { useAppContext } from "../../context/context";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

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
      <p className="text-center mt-10" style={{color:'#ef4444', fontWeight:600}}>
        Product not found
      </p>
    );

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="btn btn-primary mb-4 sm:mb-6 inline-flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2"
      >
        <ArrowLeft size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Back to Products</span><span className="sm:hidden">Back</span>
      </button>

      {/* العنوان والوصف */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heading mb-2 sm:mb-3">
          {product.name}
        </h1>
        <p className="text-body text-base sm:text-lg">{product.des}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
        {/* قسم الصور */}
        <div className="flex-1">
          <div className="card p-3 sm:p-4 flex flex-col items-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-64 sm:h-80 lg:h-96 object-contain rounded-lg mb-3 sm:mb-4"
            />
            <div className="flex gap-2 sm:gap-3 overflow-x-auto py-2 w-full">
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
                    className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer border-2 sm:border-4 transition-all flex-shrink-0 ${
                      selectedImage === img
                        ? "border-indigo-500 scale-105"
                        : "border-gray-600"
                    } hover:border-indigo-400 hover:scale-105`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* قسم التفاصيل */}
        <div className="flex-1 space-y-4 sm:space-y-6">
          <div className="card p-4 sm:p-6 space-y-2 sm:space-y-3">
            <p className="text-xl sm:text-2xl font-semibold text-heading">
              Price: ${product.price}
            </p>
            {product.sale && (
              <p className="font-bold text-lg" style={{color:'#ef4444'}}>
                Sale: {product.sale}% off
              </p>
            )}
            <p className="text-body">Quantity: {product.quantity}</p>
            <p className="text-body">
              Average Rate: {product.averagerate || 0}
            </p>
            <p className="text-body">
              Rate Count: {product.ratecount || 0}
            </p>
            <p className="text-muted text-sm">
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
                className="bg-surface p-4 sm:p-5 rounded-xl space-y-2 border"
                style={{borderColor:'var(--color-border)'}}
              >
                <h2 className="text-base sm:text-lg font-bold text-heading border-b pb-2 mb-2"
                  style={{borderColor:'var(--color-border)'}}
                >
                  {title}
                </h2>
                {Object.entries(obj).map(([key, val]) => (
                  <p key={key}>
                    <span className="font-semibold text-heading">{key}: </span>
                    <span className="text-body">{val}</span>
                  </p>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
