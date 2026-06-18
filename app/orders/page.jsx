"use client";
import { useEffect } from "react";
import { useAppContext } from "../context/context";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function Orders() {
  const { orders, loading, fetchOrders, deleteOrder } = useAppContext();
  useEffect(() => {
    fetchOrders();
  }, []);
  const router = useRouter();

  if (loading) return <p className="text-center py-4 text-muted">Loading orders...</p>;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-heading">Orders Management</h2>
        <p className="text-sm text-muted mt-2">Track and manage all customer orders</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm shadow-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-950/80">
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">ID</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider hidden sm:table-cell">Customer</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">Total</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider hidden md:table-cell">Order Date</th>
              <th className="px-4 sm:px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-slate-800/50 transition-colors duration-200 border-slate-700 cursor-pointer"
              >
                <td
                  className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-slate-400 font-mono truncate max-w-[100px] sm:max-w-none hover:text-slate-200 transition"
                  onClick={() => router.push(`/orderdetails/${order._id}`)}
                  title={order._id}
                >{order._id.slice(0, 3)}</td>
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium text-slate-100 hidden sm:table-cell">
                  {order.customerInfo?.fullName}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold ${order.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : order.status === "completed"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : order.status === "shipping"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-bold text-emerald-400">
                  ${order.total}
                </td>
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-slate-400 hidden md:table-cell">
                  {formatDate(order.date)}
                </td>
                <td className="px-4 sm:px-6 py-4 text-center">
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="btn btn-danger text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30"
                    title="Delete order"
                  >
                    <Trash2 size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
