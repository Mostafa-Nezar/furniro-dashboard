"use client";
import { useAppContext } from "./context/context";

export default function DashboardPage() {
  const { orders, usersData, loading } = useAppContext();

  if (loading) {
    return <p className="text-center py-6">Loading dashboard...</p>;
  }

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100">
      <div className="p-6 rounded-lg shadow bg-white">
        <h2 className="text-xl font-bold text-gray-700">Total Orders</h2>
        <p className="mt-2 text-3xl font-semibold text-indigo-600">
          {orders.length}
        </p>
      </div>
      <div className="p-6 rounded-lg shadow bg-white">
        <h2 className="text-xl font-bold text-gray-700">Total Users</h2>
        <p className="mt-2 text-3xl font-semibold text-green-600">
          {usersData.length}
        </p>
      </div>
      <div className="p-6 rounded-lg shadow bg-white">
        <h2 className="text-xl font-bold text-gray-700">Revenue</h2>
        <p className="mt-2 text-3xl font-semibold text-amber-600">
          ${totalRevenue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
