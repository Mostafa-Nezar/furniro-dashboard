"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [usersData, setUsersData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminToken");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login = (userData, token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adminUser", JSON.stringify(userData));
      localStorage.setItem("adminToken", token);
      setUser(userData);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("adminUser");
      const token = localStorage.getItem("adminToken");

      if (savedUser && token) {
        try {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        } catch (err) {
          console.error("Error parsing user data:", err);
          logout();
        }
      }
      setAuthLoading(false);
    } else {
      setAuthLoading(false);
    }
  }, []);

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
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://furniro-back-production.up.railway.app/api/products/db",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setproducts(data || []);
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
  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://furniro-back-production.up.railway.app/api/products/${id}/delete`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.success) {
        alert("Product deleted successfully");
        setproducts(products.filter((prod) => prod.id !== id));
      } else {
        alert(data.message || "Error deleting product");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while deleting product");
    } finally {
      setLoading(false);
    }
  };
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
  const deleteOrder = async (id) => {
    try {
      const res = await fetch(
        `https://furniro-back-production.up.railway.app/api/orders/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setOrders(orders.filter((order) => order._id !== id));
      } else {
        alert(data.error || "Error deleting order");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while deleting order");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        usersData,
        orders,
        products,
        loading,
        user,
        isAuthenticated,
        authLoading,
        login,
        logout,
        fetchUsers,
        fetchOrders,
        handleDeleteUser,
        deleteProduct,
        deleteOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
