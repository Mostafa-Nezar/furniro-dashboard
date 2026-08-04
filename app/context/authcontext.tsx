"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchInstance } from "./api";

const AuthContext = createContext<{
  user: any;
  isAuthenticated: boolean;
  authLoading: boolean;
  login: (userData: any, token: string | null) => void;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<any>;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const login = (userData: any, token: string | null) => {
    if (token) {
      localStorage.setItem("adminToken", token);
    } else {
      localStorage.removeItem("adminToken");
    }

    localStorage.setItem("adminUser", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await fetchInstance("/adminlogout", { method: "POST" });
    } catch (err: unknown) {
      console.error("logout error:", err instanceof Error ? err.message : err);
    }
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData: any) => {
    try {
      const data = await fetchInstance("/adminregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return data;
    } catch (err: unknown) {
      console.error("register error:", err instanceof Error ? err.message : err);
      throw err;
    }
  };

  useEffect(() => {
    const verifySession = async () => {
      const savedUser = localStorage.getItem("adminUser");
      const savedToken = localStorage.getItem("adminToken");

      if (!savedUser || !savedToken) {
        setAuthLoading(false);
        return;
      }

      try {
        await fetchInstance("/products/db/categories");
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("adminUser");
        localStorage.removeItem("adminToken");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    verifySession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, authLoading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
