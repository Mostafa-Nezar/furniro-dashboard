"use client";
import { useProductContext } from "../../context/prosuctcontext";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CalendarDays, Package, Sparkles, Tag, TrendingUp } from "lucide-react";

export default function ProductDetails() {
  const { products } = useProductContext();
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const product = products.find(
    (p) => p.id.toString() === productId.toString()
  );
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-lg font-semibold text-red-400">
          Product not found
        </p>
      </div>
    );
  }

  const galleryImages = (product.images || []).filter(Boolean);
  const detailSections = [
    ["General Info", product.general],
    ["Product Details", product.myproduct],
    ["Dimensions", product.dimensions],
    ["Warranty", product.warranty],
  ].filter(([, value]) => value);

  return (
    <div className="min-h-screen bg-app px-3 py-4 sm:px-4 lg:px-6 lg:py-6">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => router.back()}
          className="btn btn-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-lg shadow-violet-500/20 sm:mb-6"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Products</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-200">
                <Sparkles size={14} />
                Product Overview
              </div>
              <h1 className="text-2xl font-bold text-heading sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                {product.des}
              </p>
              {product.not && (
                <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
                  <span className="font-semibold text-slate-100">Notes:</span> {product.not}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Key</p>
                <p className="font-semibold text-white">{product.key || "-"}</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Quantity</p>
                <p className="font-semibold text-white">{product.quantity}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-3 sm:p-4">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="h-[280px] w-full rounded-[20px] object-contain bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 sm:h-[380px] lg:h-[460px]"
                />

                {galleryImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5">
                    {galleryImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedImage(img)}
                        className={`overflow-hidden rounded-2xl border transition-all ${selectedImage === img
                            ? "border-violet-500 ring-2 ring-violet-500/30"
                            : "border-slate-700 hover:border-slate-500"
                          }`}
                      >
                        <img
                          src={img}
                          alt={`img-${i}`}
                          className="h-16 w-full object-cover sm:h-20"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[24px] border border-violet-500/20 bg-gradient-to-br from-violet-500/20 via-slate-900 to-slate-900 p-5 shadow-xl shadow-violet-500/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-violet-200">Price</p>
                    <p className="mt-1 text-3xl font-semibold text-white">
                      ${product.price}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-300">
                    {product.sale ? `${product.sale}% OFF` : "In stock"}
                  </div>
                </div>

                {product.sale && (
                  <div className="mt-4 flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                    <Tag size={14} />
                    Sale: {product.sale}% off
                  </div>
                )}

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <TrendingUp size={16} />
                      <span className="text-xs uppercase tracking-[0.2em]">Average Rate</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-white">{product.averagerate || 0}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Package size={16} />
                      <span className="text-xs uppercase tracking-[0.2em]">Rate Count</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-white">{product.ratecount || 0}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-3 text-sm text-slate-300">
                  <CalendarDays size={16} className="text-slate-400" />
                  Added on {" "}
                  {new Date(product.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>

              {detailSections.map(([title, obj], idx) => (
                <div
                  key={idx}
                  className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-4 sm:p-5"
                >
                  <h2 className="mb-3 border-b border-slate-700 pb-2 text-lg font-semibold text-heading">
                    {title}
                  </h2>
                  <div className="space-y-2 text-sm text-slate-300">
                    {Object.entries(obj || {}).map(([key, val]) => (
                      <div key={key} className="flex flex-col gap-1 rounded-xl bg-slate-800/60 px-3 py-2 sm:flex-row sm:justify-between">
                        <span className="font-semibold text-slate-100">{key}</span>
                        <span className="text-slate-300">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {product.customAttributes && Object.keys(product.customAttributes).length > 0 && (
                <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
                  <h2 className="mb-3 border-b border-slate-700 pb-2 text-lg font-semibold text-heading">
                    Custom Attributes
                  </h2>
                  <div className="space-y-2 text-sm text-slate-300">
                    {Object.entries(product.customAttributes).map(([key, val]) => (
                      <div key={key} className="flex flex-col gap-1 rounded-xl bg-slate-800/60 px-3 py-2 sm:flex-row sm:justify-between">
                        <span className="font-semibold text-slate-100">{key}</span>
                        <span className="text-slate-300">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
