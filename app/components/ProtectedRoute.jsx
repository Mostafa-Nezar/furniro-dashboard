"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/context";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center py-6 text-muted">جاري التحقق من الهوية...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
