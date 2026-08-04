import "./globals.css";
import { AppProvider } from "./context/context";
import { AuthProvider } from "./context/authcontext";
import { ProductProvider } from "./context/prosuctcontext";
import LayoutWrapper from "./components/LayoutWrapper";

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
      <body>
        <AuthProvider>
          <AppProvider>
            <ProductProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </ProductProvider>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
