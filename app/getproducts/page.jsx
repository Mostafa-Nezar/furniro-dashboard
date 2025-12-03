"use client";
import { useAppContext } from "../context/context";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";

export default function Products() {
  const { products, deleteProduct } = useAppContext();
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-heading">Products List</h1>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="card overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
          >
            {/* الصورة + العنوان */}
            <div
              className="p-0 cursor-pointer transition"
              onClick={() => router.push(`/productdetails/${product.id}`)}
            >
              <div className="relative">
                {product.sale ? (
                  <span className="absolute top-3 left-3 z-10 chip" style={{background:'#fee2e2', color:'#991b1b'}}>
                    -{product.sale}%
                  </span>
                ) : null}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-heading truncate" title={product.name}>
                  {product.name}
                </h2>
                <p className="text-xs text-muted mt-1 truncate" title={product.id}>{product.id}</p>
              </div>
            </div>

            {/* تفاصيل المنتج */}
            <div className="px-5 pb-4 space-y-2">
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-semibold" style={{color:'var(--color-primary)'}}>
                  ${product.price}
                </p>
                <p className="text-sm text-body">Qty: {product.quantity}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p>⭐ {product.averagerate || 0}</p>
                <p className="text-muted">({product.ratecount || 0} reviews)</p>
              </div>
              <p className="text-xs text-muted mt-2">
                Added:{" "}
                {new Date(product.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* الأزرار */}
            <div className="flex gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 bg-surface border-t" style={{borderColor:'var(--color-border)'}}>
              <button
                onClick={() => router.push(`/editproduct/${product.id}`)}
                className="btn btn-primary flex-1 justify-center text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
                title="Edit product"
              >
                <Edit size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="btn btn-danger flex-1 justify-center text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
                title="Delete product"
              >
                <Trash2 size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
