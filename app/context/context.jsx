"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [usersData, setUsersData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "https://furniro-back-production.up.railway.app/api/users",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsersData(data || []);
    } catch (err) {
      console.error("❌ Error fetching users:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await fetch(
        `https://furniro-back-production.up.railway.app/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete user");
      }

      setUsersData(usersData.filter((user) => user._id !== id));
    } catch (err) {
      console.error("❌ Error deleting user:", err.message);
      alert(err.message);
    }
  };

  // ================== Orders ==================
  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "https://furniro-back-production.up.railway.app/api/orders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data || []);
    } catch (err) {
      console.error("❌ Error fetching orders:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================== Effects ==================
  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  return (
    <AppContext.Provider
      value={{
        usersData,
        orders,
        loading,
        fetchUsers,
        fetchOrders,
        handleDeleteUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
