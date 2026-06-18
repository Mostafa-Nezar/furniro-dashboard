"use client";
import { useAppContext } from "../context/context";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";

const StarIcon = ({ rating }) => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="#FBBF24"
    />
  </svg>
);

export default function Products() {
  const { products, deleteProduct } = useAppContext();
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-heading">Products Catalog</h1>
        <p className="text-sm text-muted mt-2">Manage and organize all your products</p>
      </div>
      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/50 flex flex-col hover:-translate-y-1"
          >
            {/* الصورة */}
            <div
              className="relative overflow-hidden cursor-pointer bg-slate-950"
              onClick={() => router.push(`/productdetails/${product.id}`)}
            >
              {/* شارة الخصم */}
              {product.sale ? (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/90 backdrop-blur-sm">
                  <span className="text-xs font-bold text-white">-{product.sale}%</span>
                </div>
              ) : null}

              {/* الصورة مع التأثير */}
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* overlay عند الـ hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* المحتوى */}
            <div className="flex flex-col flex-1 p-4 space-y-3">
              {/* الاسم والـ ID */}
              <div
                className="cursor-pointer"
                onClick={() => router.push(`/productdetails/${product.id}`)}
              >
                <h2 className="text-base sm:text-lg font-bold text-heading truncate hover:text-slate-300 transition" title={product.name}>
                  {product.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1 truncate font-mono" title={product.id}>
                  ID: {product.id}
                </p>
              </div>

              {/* السعر والكمية */}
              <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-emerald-400">
                      ${product.salePrice || product.price}
                    </span>
                    {product.salePrice && (
                      <span className="text-sm line-through text-slate-500">
                        ${product.price}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                  <span className="text-xs text-slate-400">Stock</span>
                  <span className={`text-sm font-semibold ${product.quantity > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {product.quantity} units
                  </span>
                </div>
              </div>

              {/* التقييم والتاريخ */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <StarIcon />
                  <span className="text-slate-300 font-semibold">{product.averagerate || 0}</span>
                  <span className="text-slate-500">({product.ratecount || 0})</span>
                </div>
                <span className="text-right">
                  {new Date(product.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex gap-2 px-4 py-3 bg-slate-950/80 border-t border-slate-800">
              <button
                onClick={() => router.push(`/editproduct/${product._id}`)}
                className="flex-1 btn btn-primary py-2 text-xs font-medium flex items-center justify-center gap-1.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
                title="Edit product"
              >
                <Edit size={16} />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="flex-1 btn btn-danger py-2 text-xs font-medium flex items-center justify-center gap-1.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30"
                title="Delete product"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
