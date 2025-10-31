import "./globals.css";
import Link from "next/link";
import { AppProvider } from "./context/context";
import { Home, Package, Users, ShoppingCart } from "lucide-react";
export const metadata = {
  title: "Furniro Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-app text-body">
        {/* Sidebar */}
        <aside className="w-64 bg-surface text-body p-4 flex flex-col border-r" style={{borderColor: "var(--color-border)"}}>
          <div className="flex items-center gap-2 mb-6">
            <img src="https://res.cloudinary.com/dutetsivc/image/upload/v1760013317/logo_ikqv7r.png" className="w-12 h-8 rounded" alt="Furniro" />
            <h2 className="text-xl font-bold text-heading">Furniro</h2>
          </div>
          <nav className="flex flex-col gap-1">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-gray-800/60 inline-flex items-center gap-2">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link href="/orders" className="px-3 py-2 rounded-md hover:bg-gray-800/60 inline-flex items-center gap-2">
              <ShoppingCart size={18} />
              <span>Orders</span>
            </Link>
            <Link href="/users" className="px-3 py-2 rounded-md hover:bg-gray-800/60 inline-flex items-center gap-2">
              <Users size={18} />
              <span>Users</span>
            </Link>
            <Link href="/products" className="px-3 py-2 rounded-md hover:bg-gray-800/60 inline-flex items-center gap-2">
              <Package size={18} />
              <span>Add products</span>
            </Link>
            <Link href="/getproducts" className="px-3 py-2 rounded-md hover:bg-gray-800/60 inline-flex items-center gap-2">
              <Package size={18} />
              <span>All products</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <header className="p-4 border-b bg-surface" style={{borderColor: "var(--color-border)"}}>
            <h1 className="text-lg font-semibold text-heading">Admin Panel</h1>
          </header>

          <main className="p-6 flex-1 bg-app">
            <AppProvider>
            {children}
            </AppProvider>
            </main>
        </div>
      </body>
    </html>
  );
}
