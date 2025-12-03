"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/context";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated, authLoading } = useAppContext();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://furniro-back-production.up.railway.app/api/adminlogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok && data.token) {
        const userData = {
          email: form.email,
          name: data.user?.name || form.email,
          role: data.user?.role || "admin",
        };
        login(userData, data.token);
        alert(data.msg || "login successfully");
        router.push("/");
      } else {
        alert(data.msg || "login failure");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("something went wronge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full card p-6 sm:p-8 space-y-4 sm:space-y-5"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-center text-heading">
          Admin Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-surface border text-body placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          style={{ borderColor: "var(--color-border)" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-surface border text-body placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          style={{ borderColor: "var(--color-border)" }}
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "loading..." : "Login"}
        </button>

        <p className="text-center text-sm text-muted">
          Dont Have Account ?{" "}
          <a href="/register" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
