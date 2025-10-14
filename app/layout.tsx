import "./globals.css";
import Link from "next/link";
import { AppProvider } from "./context/context";
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
      <body className="flex min-h-screen bg-green-400 text-black">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col">
          <div className="flex gap-2">
            <img src="https://res.cloudinary.com/dutetsivc/image/upload/v1760013317/logo_ikqv7r.png" className="w-12 h-8" alt="" />
            <h2 className="text-xl font-bold mb-6">Furniro</h2>
          </div>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="hover:bg-gray-800 px-3 pb-2 rounded">
              Home
            </Link>
            <Link href="/orders" className="hover:bg-gray-800 px-3 pb-2 rounded">
              Orders
            </Link>
            <Link href="/users" className="hover:bg-gray-800 px-3 pb-2 rounded">
              Users
            </Link>
            <Link href="/products" className="hover:bg-gray-800 px-3 pb-2 rounded">
            add products
            </Link>
            <Link href="/getproducts" className="hover:bg-gray-800 px-3 pb-2 rounded">
            all products
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <header className="bg-white shadow p-4">
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </header>

          <main className="p-6 flex-1">
            <AppProvider>
            {children}
            </AppProvider>
            </main>
        </div>
      </body>
    </html>
  );
}
