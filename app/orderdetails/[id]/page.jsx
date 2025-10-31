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
    <div className="p-6 min-h-screen">
      <button
        onClick={() => router.back()}
        className="btn btn-primary mb-6 inline-flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Back to Orders
      </button>

      <h2 className="text-2xl font-bold mb-6 text-heading">
        Order #{order._id}
      </h2>

      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-heading">
          Customer Information
        </h3>
        <p>
          <strong className="text-heading">Name:</strong> {order.customerInfo?.fullName}
        </p>
        <p>
          <strong className="text-heading">Email:</strong> {order.customerInfo?.email}
        </p>
        <p>
          <strong className="text-heading">Address:</strong> {order.customerInfo?.address}
        </p>
                <p>
          <strong className="text-heading">phone:</strong> {order.customerInfo?.phoneNumber}
        </p>
      </div>

      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-heading">
          Order Details
        </h3>
        <p>
          <strong className="text-heading">Status:</strong>{" "}
          <span
            className={`chip ${
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
        <p>
          <strong className="text-heading">Date:</strong> {formatDate(order.date)}
        </p>
        <p>
          <strong className="text-heading">Total:</strong> ${order.total}
        </p>
      </div>
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 text-heading">Products</h3>
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="table-header text-sm">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{borderColor:'var(--color-border)'}}>
            {order.products.map((p, i) => (
              <tr key={i} className="table-row">
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
          <button onClick={() => updateStatus("refused")} disabled={updating} className="btn btn-danger">
            <XCircle size={16} /> Refuse
          </button>
          <button onClick={() => updateStatus("shipping")} disabled={updating} className="btn btn-primary">
            <Truck size={16} /> Shipping
          </button>
          <button onClick={() => updateStatus("delivered")} disabled={updating} className="btn btn-primary">
            <CheckCircle2 size={16} /> Delivered
          </button>
        </div>
    </div>
  );
}
