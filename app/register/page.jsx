"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://furniro-back-production.up.railway.app/api/adminregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert(data.msg || "تم التسجيل بنجاح");
        router.push("/login");
      } else {
        alert(data.msg || "فشل التسجيل");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("حدث خطأ أثناء التسجيل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md card p-6 sm:p-8 space-y-4 sm:space-y-5"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-center text-heading">Admin Register</h1>

        {Object.keys(form).map((key) =>
          key !== "role" ? (
            <input
              key={key}
              type={key === "password" ? "password" : "text"}
              name={key}
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-surface border text-body placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ borderColor: "var(--color-border)" }}
            />
          ) : null
        )}

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-surface border text-body focus:outline-none focus:ring-2 focus:ring-primary"
          style={{ borderColor: "var(--color-border)" }}
        >
          <option value="admin" className="bg-surface text-body">Admin</option>
          <option value="superadmin" className="bg-surface text-body">Super Admin</option>
        </select>

        <button 
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Register"}
        </button>
        
        <p className="text-center text-sm text-muted">
          already have account ?{" "}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
