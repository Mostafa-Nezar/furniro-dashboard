"use client";
import { useAppContext } from "../context/context";
import { CheckCircle2, XCircle, Trash2 } from "lucide-react";

export default function Users() {
  const { usersData, loading, handleDeleteUser } = useAppContext();


  if (loading) return <p className="text-center py-4 text-muted">Loading users...</p>;

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-heading">Users</h2>
      <div className="overflow-x-auto card">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="table-header text-sm uppercase">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-center">Admin</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{borderColor: "var(--color-border)"}}>
            {usersData.length > 0 ? (
              usersData.map((user) => (
                <tr
                  key={user._id}
                  className="table-row"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">{user.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.Admin ? (
                      <span className="chip chip-completed inline-flex items-center gap-1">
                        <CheckCircle2 size={14} /> Yes
                      </span>
                    ) : (
                      <span className="chip chip-default inline-flex items-center gap-1" style={{background:'#fee2e2', color:'#991b1b'}}>
                        <XCircle size={14} /> No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-danger text-sm"
                      title="Delete user"
                    >
                      <Trash2 size={16} /> Delete
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
