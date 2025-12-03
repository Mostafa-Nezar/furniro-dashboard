"use client";
import { useAppContext } from "./context/context";

export default function DashboardPage() {
  const { orders, usersData, loading } = useAppContext();

  if (loading) {
    return <p className="text-center py-6 text-muted">Loading dashboard...</p>;
  }

  const totalRevenue = orders.reduce((sum: number, order: { total?: number }) => sum + (order.total || 0), 0);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="p-4 sm:p-6 card">
        <h2 className="text-lg sm:text-xl font-bold">Total Orders</h2>
        <p className="mt-2 text-2xl sm:text-3xl font-semibold" style={{color: 'var(--color-primary)'}}>
          {orders.length}
        </p>
      </div>
      <div className="p-4 sm:p-6 card">
        <h2 className="text-lg sm:text-xl font-bold">Total Users</h2>
        <p className="mt-2 text-2xl sm:text-3xl font-semibold" style={{color: 'var(--color-success)'}}>
          {usersData.length}
        </p>
      </div>
      <div className="p-4 sm:p-6 card sm:col-span-2 lg:col-span-1">
        <h2 className="text-lg sm:text-xl font-bold">Revenue</h2>
        <p className="mt-2 text-2xl sm:text-3xl font-semibold" style={{color: 'var(--color-accent)'}}>
          ${totalRevenue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
