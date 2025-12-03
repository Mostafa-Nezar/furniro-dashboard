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
} from "lucide-react";
import ProtectedRoute from "./ProtectedRoute";
import { useAppContext } from "../context/context";
import { useRouter } from "next/navigation";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAppContext();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Pages that don't need authentication
  const publicPages = ["/login", "/register"];
  const isPublicPage = publicPages.includes(pathname);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open on mobile
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

  // For public pages (login/register), show minimal layout
  if (isPublicPage) {
    return <>{children}</>;
  }

  // For protected pages, wrap with ProtectedRoute and show full layout
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
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface text-body p-4 flex flex-col border-r transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
          style={{ borderColor: "var(--color-border)" }}
        >
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-800/60 rounded-md"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 mb-6">
            <img
              src="https://res.cloudinary.com/dutetsivc/image/upload/v1760013317/logo_ikqv7r.png"
              className="w-12 h-8 rounded"
              alt="Furniro"
            />
            <h2 className="text-xl font-bold text-heading">Furniro</h2>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md hover:bg-gray-800/60 inline-flex items-center gap-2 ${
                pathname === "/" ? "bg-gray-800/60" : ""
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              href="/orders"
              className={`px-3 py-2 rounded-md hover:bg-gray-800/60 inline-flex items-center gap-2 ${
                pathname === "/orders" ? "bg-gray-800/60" : ""
              }`}
            >
              <ShoppingCart size={18} />
              <span>Orders</span>
            </Link>
            <Link
              href="/users"
              className={`px-3 py-2 rounded-md hover:bg-gray-800/60 inline-flex items-center gap-2 ${
                pathname === "/users" ? "bg-gray-800/60" : ""
              }`}
            >
              <Users size={18} />
              <span>Users</span>
            </Link>
            <Link
              href="/products"
              className={`px-3 py-2 rounded-md hover:bg-gray-800/60 inline-flex items-center gap-2 ${
                pathname === "/products" ? "bg-gray-800/60" : ""
              }`}
            >
              <Package size={18} />
              <span>Add products</span>
            </Link>
            <Link
              href="/getproducts"
              className={`px-3 py-2 rounded-md hover:bg-gray-800/60 inline-flex items-center gap-2 ${
                pathname === "/getproducts" ? "bg-gray-800/60" : ""
              }`}
            >
              <Package size={18} />
              <span>All products</span>
            </Link>
          </nav>

          {/* User info and logout */}
          {user && (
            <div
              className="mt-auto pt-4 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="px-3 py-2 mb-2">
                <p className="text-sm font-semibold text-heading truncate">
                  {user.name || user.email}
                </p>
                <p className="text-xs text-muted">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 rounded-md hover:bg-gray-800/60 inline-flex items-center gap-2 text-red-400"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full lg:w-auto">
          {/* Navbar */}
          <header
            className="p-3 lg:p-4 border-b bg-surface flex items-center gap-3"
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

          <main className="p-3 sm:p-4 lg:p-6 flex-1 bg-app overflow-x-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
