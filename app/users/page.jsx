"use client";
import { useAppContext } from "../context/context";
import { CheckCircle2, XCircle, Trash2 } from "lucide-react";

export default function Users() {
  const { usersData, loading, handleDeleteUser } = useAppContext();


  if (loading) return <p className="text-center py-4 text-muted">Loading users...</p>;

  return (
    <div className="min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-heading">Users</h2>
      <div className="overflow-x-auto card">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="table-header text-xs sm:text-sm uppercase">
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">ID</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">Name</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left hidden md:table-cell">Email</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">Admin</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{borderColor: "var(--color-border)"}}>
            {usersData.length > 0 ? (
              usersData.map((user) => (
                <tr
                  key={user._id}
                  className="table-row"
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 truncate max-w-[80px] sm:max-w-none">{user.id}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-800 truncate max-w-[120px] sm:max-w-none">
                    {user.name}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden md:table-cell truncate">
                    {user.email}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                    {user.Admin ? (
                      <span className="chip chip-completed inline-flex items-center gap-1 text-xs">
                        <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5" /> <span className="hidden sm:inline">Yes</span>
                      </span>
                    ) : (
                      <span className="chip chip-default inline-flex items-center gap-1 text-xs" style={{background:'#fee2e2', color:'#991b1b'}}>
                        <XCircle size={12} className="sm:w-3.5 sm:h-3.5" /> <span className="hidden sm:inline">No</span>
                      </span>
                    )}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-danger text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
                      title="Delete user"
                    >
                      <Trash2 size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center px-6 py-4 text-gray-500"
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
