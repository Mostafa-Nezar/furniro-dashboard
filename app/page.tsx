"use client";
import { useAppContext } from "./context/context";

export default function DashboardPage() {
  const { orders, usersData, loading } = useAppContext();

  if (loading) {
    return <p className="text-center py-6 text-muted">Loading dashboard...</p>;
  }

  const totalRevenue = orders.reduce((sum: number, order: { total?: number }) => sum + (order.total || 0), 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="p-6 card">
        <h2 className="text-xl font-bold">Total Orders</h2>
        <p className="mt-2 text-3xl font-semibold" style={{color: 'var(--color-primary)'}}>
          {orders.length}
        </p>
      </div>
      <div className="p-6 card">
        <h2 className="text-xl font-bold">Total Users</h2>
        <p className="mt-2 text-3xl font-semibold" style={{color: 'var(--color-success)'}}>
          {usersData.length}
        </p>
      </div>
      <div className="p-6 card">
        <h2 className="text-xl font-bold">Revenue</h2>
        <p className="mt-2 text-3xl font-semibold" style={{color: 'var(--color-accent)'}}>
          ${totalRevenue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
