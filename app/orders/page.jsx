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
    <div className="min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-heading">Orders</h2>
      <div className="overflow-x-auto card">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="table-header text-xs sm:text-sm uppercase">
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">ID</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left hidden sm:table-cell">Customer</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">Status</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">Total</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left hidden md:table-cell">Order Date</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{borderColor: "var(--color-border)"}}>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="table-row cursor-pointer"
              >
                <td 
                className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-400 truncate max-w-[100px] sm:max-w-none"
                onClick={() => router.push(`/orderdetails/${order._id}`)}
                title={order._id}
                >{order._id}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-400 hidden sm:table-cell">
                  {order.customerInfo?.fullName}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <span
                    className={`chip text-xs ${
                      order.status === "pending"
                        ? "chip-pending"
                        : order.status === "completed"
                        ? "chip-completed"
                        : "chip-default"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-800">
                  ${order.total}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                  {formatDate(order.date)}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="btn btn-danger text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
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
