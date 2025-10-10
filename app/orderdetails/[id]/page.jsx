"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "../../context/context";

export default function OrderDetails() {
  const { orders, loading } = useAppContext();
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const updateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      const res = await fetch(`https://furniro-back-production.up.railway.app/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        setOrder((prev) => ({ ...prev, status: data.order.status }));
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("❌ Error updating status:", err);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      const foundOrder = orders.find((o) => o._id === id);
      setOrder(foundOrder);
    }
  }, [loading, id, orders]);

  if (loading || !order)
    return (
      <div className="text-center py-8 text-gray-600">
        {loading ? "Loading..." : "Order not found."}
      </div>
    );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm font-semibold text-blue-600 hover:underline"
      >
        ← Back to Orders
      </button>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Order #{order._id}
      </h2>

      {/* معلومات العميل */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Customer Information
        </h3>
        <p>
          <strong>Name:</strong> {order.customerInfo?.fullName}
        </p>
        <p>
          <strong>Email:</strong> {order.customerInfo?.email}
        </p>
        <p>
          <strong>Address:</strong> {order.customerInfo?.address}
        </p>
      </div>

      {/* تفاصيل الأوردر */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Order Details
        </h3>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              order.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "completed"
                ? "bg-green-100 text-green-700"
                : order.status === "refused"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {order.status}
          </span>
        </p>
        <p>
          <strong>Date:</strong> {formatDate(order.date)}
        </p>
        <p>
          <strong>Total:</strong> ${order.total}
        </p>
      </div>

      {/* المنتجات */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Products</h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {order.products.map((p, i) => (
              <tr key={i}>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.quantity}</td>
                <td className="px-4 py-2">${p.price}</td>
                <td className="px-4 py-2 font-semibold">
                  ${p.price * p.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex gap-3">
          <button
            onClick={() => updateStatus("refused")}
            disabled={updating}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            Refuse
          </button>

          <button
            onClick={() => updateStatus("shipping")}
            disabled={updating}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Shipping
          </button>

          <button
            onClick={() => updateStatus("delivered")}
            disabled={updating}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Delivered
          </button>
        </div>
    </div>
  );
}
