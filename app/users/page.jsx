"use client";
import Link from "next/link";
import { useAppContext } from "../context/context";
import { CheckCircle2, XCircle, Trash2, Bell, ShoppingCart, Package } from "lucide-react";

export default function Users() {
  const { usersData, loading, handleDeleteUser } = useAppContext();


  if (loading) return <p className="text-center py-4 text-muted">Loading users...</p>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-heading">Users Management</h2>
        <p className="text-sm text-muted mt-2">Manage and view all registered users</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm shadow-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-950/80">
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">ID</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">Name</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider hidden md:table-cell">Email</th>
              <th className="px-4 sm:px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">Notifications</th>
              <th className="px-4 sm:px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider hidden lg:table-cell">Cart Items</th>
              <th className="px-4 sm:px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider hidden lg:table-cell">Orders</th>
              <th className="px-4 sm:px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {usersData.length > 0 ? (
              usersData.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-slate-800/50 transition-colors duration-200 border-slate-700"
                >
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-slate-400 font-mono truncate max-w-[80px] sm:max-w-none">{user.id}</td>
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium text-slate-100 truncate max-w-[120px] sm:max-w-none">
                    {user.name}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-slate-400 hidden md:table-cell truncate">
                    {user.email}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Bell size={14} className="text-blue-400" />
                      <span className="text-xs sm:text-sm font-semibold text-blue-300">
                        {Array.isArray(user?.notifications) ? user.notifications.length : (user?.notifications ? 1 : 0)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-center hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      <ShoppingCart size={14} className="text-emerald-400" />
                      <span className="text-xs sm:text-sm font-semibold text-emerald-300">
                        {user?.cart?.items?.length || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-center hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      <Package size={14} className="text-purple-400" />
                      <span className="text-xs sm:text-sm font-semibold text-purple-300">
                        {user?.orders?.length || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center flex-wrap">
                      <Link
                        href={`/users/${user.id}`}
                        className="btn btn-primary text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
                        title="View profile"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="btn btn-danger text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30"
                        title="Delete user"
                      >
                        <Trash2 size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center px-6 py-8 text-slate-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
