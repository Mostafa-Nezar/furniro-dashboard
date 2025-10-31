"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://furniro-back-production.up.railway.app/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // حفظ التوكن لو موجود
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      }

      // ممكن توجه الأدمن لصفحة Dashboard
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 card">
      <h2 className="text-center text-2xl font-semibold mb-6 text-heading">Admin Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md bg-surface px-3 py-2 border focus:outline-none focus:ring-2"
          style={{borderColor: "var(--color-border)"}}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-md bg-surface px-3 py-2 border focus:outline-none focus:ring-2"
          style={{borderColor: "var(--color-border)"}}
        />
        <button type="submit" disabled={loading} className="btn btn-primary justify-center">
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-sm" style={{color:'#ef4444'}}>{error}</p>}
      </form>
    </div>
  );
}
