"use client";
import { useAppContext } from "../context/context";

export default function Orders() {
  const { orders, loading } = useAppContext();

  if (loading) return <p className="text-center py-4">Loading orders...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Orders</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm uppercase">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Payment</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Products</th>
              <th className="px-6 py-3 text-left">Order Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-600">{order._id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {order.customerInfo?.fullName}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.paymentdone}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  ${order.total}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <ul className="list-disc pl-5 space-y-1">
                    {order.products?.map((p, i) => (
                      <li key={i}>
                        {p.name} x{p.quantity} (${p.price})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
