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
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-heading">Orders</h2>
      <div className="overflow-x-auto card">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="table-header text-sm uppercase">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Order Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{borderColor: "var(--color-border)"}}>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="table-row cursor-pointer"
              >
                <td 
                className="px-6 py-4 text-sm text-gray-600"
                onClick={() => router.push(`/orderdetails/${order._id}`)}
                >{order._id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {order.customerInfo?.fullName}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`chip ${
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
                <td className="px-6 py-4 font-semibold text-gray-800">
                  ${order.total}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(order.date)}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="btn btn-danger text-sm"
                    title="Delete order"
                  >
                    <Trash2 size={16} /> Delete
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
