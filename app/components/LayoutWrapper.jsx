"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  List,
  FileText,
  BarChart,
} from "lucide-react";
import ProtectedRoute from "./ProtectedRoute";
import { useAuthContext } from "../context/authcontext";
import { useRouter } from "next/navigation";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuthContext();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const publicPages = ["/login", "/register"];
  const isPublicPage = publicPages.includes(pathname);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-app text-body">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface text-body p-4 flex flex-col border-r shadow-2xl shadow-black/20 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          style={{ borderColor: "var(--color-border)" }}
        >
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-md text-muted transition hover:bg-[color:var(--color-card)] hover:text-heading"
          >
            <X size={20} />
          </button>

          <div className="mb-6 flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)]/70 p-3">
            <img
              src="https://res.cloudinary.com/dutetsivc/image/upload/v1760013317/logo_ikqv7r.png"
              className="h-9 w-12 rounded-md object-cover"
              alt="Furniro"
            />
            <div>
              <h2 className="text-lg font-bold text-heading">Furniro</h2>
              <p className="text-xs text-muted">Admin Dashboard</p>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1">
            <Link
              href="/"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 transition ${pathname === "/"
                ? "bg-[color:var(--color-primary)]/20 text-heading shadow-sm"
                : "text-body hover:bg-[color:var(--color-card)] hover:text-heading"
                }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              href="/orders"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 transition ${pathname === "/orders"
                ? "bg-[color:var(--color-primary)]/20 text-heading shadow-sm"
                : "text-body hover:bg-[color:var(--color-card)] hover:text-heading"
                }`}
            >
              <ShoppingCart size={18} />
              <span>Orders</span>
            </Link>
            <Link
              href="/users"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 transition ${pathname === "/users"
                ? "bg-[color:var(--color-primary)]/20 text-heading shadow-sm"
                : "text-body hover:bg-[color:var(--color-card)] hover:text-heading"
                }`}
            >
              <Users size={18} />
              <span>Users</span>
            </Link>
            <Link
              href="/products"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 transition ${pathname === "/products"
                ? "bg-[color:var(--color-primary)]/20 text-heading shadow-sm"
                : "text-body hover:bg-[color:var(--color-card)] hover:text-heading"
                }`}
            >
              <Package size={18} />
              <span>Add products</span>
            </Link>
            <Link
              href="/getproducts"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 transition ${pathname === "/getproducts"
                ? "bg-[color:var(--color-primary)]/20 text-heading shadow-sm"
                : "text-body hover:bg-[color:var(--color-card)] hover:text-heading"
                }`}
            >
              <Package size={18} />
              <span>All products</span>
            </Link>
            <Link
              href="/categories"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 transition ${pathname === "/categories"
                ? "bg-[color:var(--color-primary)]/20 text-heading shadow-sm"
                : "text-body hover:bg-[color:var(--color-card)] hover:text-heading"
                }`}
            >
              <List size={18} />
              <span>Categories</span>
            </Link>
            <Link
              href="/posts"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 transition ${pathname === "/posts"
                ? "bg-[color:var(--color-primary)]/20 text-heading shadow-sm"
                : "text-body hover:bg-[color:var(--color-card)] hover:text-heading"
                }`}
            >
              <FileText size={18} />
              <span>Posts</span>
            </Link>
            <Link
              href="/charts"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 transition ${pathname === "/charts"
                ? "bg-[color:var(--color-primary)]/20 text-heading shadow-sm"
                : "text-body hover:bg-[color:var(--color-card)] hover:text-heading"
                }`}
            >
              <BarChart size={18} />
              <span>Charts</span>
            </Link>
          </nav>

          {/* User info and logout */}
          {user && (
            <div
              className="mt-auto rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)]/70 p-3"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="mb-2 px-1">
                <p className="truncate text-sm font-semibold text-heading">
                  {user.name || user.email}
                </p>
                <p className="text-xs text-muted">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <div className="flex w-full flex-1 flex-col lg:w-auto">
          {/* Navbar */}
          <header
            className="p-3 lg:p-4 border-b bg-app flex items-center gap-3"
            style={{ borderColor: "var(--color-border)" }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-800/60 rounded-md"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base lg:text-lg font-semibold text-heading">
              Admin Panel
            </h1>
          </header>

          <main className="flex-1 overflow-x-auto bg-app p-3 sm:p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
