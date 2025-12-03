"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "../../context/context";
import { ArrowLeft, Truck, CheckCircle2, XCircle } from "lucide-react";

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
      <div className="text-center py-8 text-muted">
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
    <div className="p-3 sm:p-4 lg:p-6 min-h-screen">
      <button
        onClick={() => router.back()}
        className="btn btn-primary mb-4 sm:mb-6 inline-flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2"
      >
        <ArrowLeft size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Back to Orders</span><span className="sm:hidden">Back</span>
      </button>

      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-heading break-all">
        Order #{order._id}
      </h2>

      <div className="card p-4 sm:p-6 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-heading">
          Customer Information
        </h3>
        <p className="text-sm sm:text-base mb-2">
          <strong className="text-heading">Name:</strong> <span className="text-body">{order.customerInfo?.fullName}</span>
        </p>
        <p className="text-sm sm:text-base mb-2 break-all">
          <strong className="text-heading">Email:</strong> <span className="text-body">{order.customerInfo?.email}</span>
        </p>
        <p className="text-sm sm:text-base mb-2">
          <strong className="text-heading">Address:</strong> <span className="text-body">{order.customerInfo?.address}</span>
        </p>
        <p className="text-sm sm:text-base">
          <strong className="text-heading">Phone:</strong> <span className="text-body">{order.customerInfo?.phoneNumber}</span>
        </p>
      </div>

      <div className="card p-4 sm:p-6 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-heading">
          Order Details
        </h3>
        <p className="text-sm sm:text-base mb-2">
          <strong className="text-heading">Status:</strong>{" "}
          <span
            className={`chip text-xs sm:text-sm ${
              order.status === "pending"
                ? "chip-pending"
                : order.status === "completed"
                ? "chip-completed"
                : order.status === "refused"
                ? "chip-default"
                : "chip-default"
            }`}
          >
            {order.status}
          </span>
        </p>
        <p className="text-sm sm:text-base mb-2">
          <strong className="text-heading">Date:</strong> <span className="text-body">{formatDate(order.date)}</span>
        </p>
        <p className="text-sm sm:text-base">
          <strong className="text-heading">Total:</strong> <span className="text-body">${order.total}</span>
        </p>
      </div>
      <div className="card p-4 sm:p-6 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-heading">Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="table-header text-xs sm:text-sm">
                <th className="px-3 sm:px-4 py-2 text-left">Name</th>
                <th className="px-3 sm:px-4 py-2 text-left">Quantity</th>
                <th className="px-3 sm:px-4 py-2 text-left">Price</th>
                <th className="px-3 sm:px-4 py-2 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{borderColor:'var(--color-border)'}}>
              {order.products.map((p, i) => (
                <tr key={i} className="table-row">
                  <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{p.name}</td>
                  <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{p.quantity}</td>
                  <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">${p.price}</td>
                  <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold">
                    ${p.price * p.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button onClick={() => updateStatus("refused")} disabled={updating} className="btn btn-danger text-sm sm:text-base px-3 sm:px-4 py-2">
            <XCircle size={14} className="sm:w-4 sm:h-4" /> Refuse
          </button>
          <button onClick={() => updateStatus("shipping")} disabled={updating} className="btn btn-primary text-sm sm:text-base px-3 sm:px-4 py-2">
            <Truck size={14} className="sm:w-4 sm:h-4" /> Shipping
          </button>
          <button onClick={() => updateStatus("delivered")} disabled={updating} className="btn btn-primary text-sm sm:text-base px-3 sm:px-4 py-2">
            <CheckCircle2 size={14} className="sm:w-4 sm:h-4" /> Delivered
          </button>
        </div>
    </div>
  );
}
