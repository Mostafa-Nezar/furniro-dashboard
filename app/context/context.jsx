"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [usersData, setUsersData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "https://furniro-back-production.up.railway.app/api/admin/users",
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
      const res = await fetch(`https://furniro-back-production.up.railway.app/api/products/${id}/delete`, { method: "DELETE" });
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
    const res = await fetch(`https://furniro-back-production.up.railway.app/api/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
        fetchUsers,
        fetchOrders,
        handleDeleteUser,
        deleteProduct,
        deleteOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
