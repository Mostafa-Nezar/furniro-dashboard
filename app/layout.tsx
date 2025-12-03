import "./globals.css";
import { AppProvider } from "./context/context";
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
        <AppProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
