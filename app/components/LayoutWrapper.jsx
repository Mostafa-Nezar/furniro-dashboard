"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Package, Users, ShoppingCart, LogOut } from "lucide-react";
import ProtectedRoute from "./ProtectedRoute";
import { useAppContext } from "../context/context";
import { useRouter } from "next/navigation";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAppContext();
  const router = useRouter();

  // Pages that don't need authentication
  const publicPages = ["/login", "/register"];
  const isPublicPage = publicPages.includes(pathname);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // For public pages (login/register), show minimal layout
  if (isPublicPage) {
    return <>{children}</>;
  }

  // For protected pages, wrap with ProtectedRoute and show full layout
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-app text-body">
        {/* Sidebar */}
        <aside
          className="w-64 bg-surface text-body p-4 flex flex-col border-r"
          style={{ borderColor: "var(--color-border)" }}
        >
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
                <p className="text-sm font-semibold text-heading">
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
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <header
            className="p-4 border-b bg-surface"
            style={{ borderColor: "var(--color-border)" }}
          >
            <h1 className="text-lg font-semibold text-heading">Admin Panel</h1>
          </header>

          <main className="p-6 flex-1 bg-app">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
