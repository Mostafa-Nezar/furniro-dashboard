"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check, Info, X } from "lucide-react";
import { subscribeToToasts } from "../context/toast";

const toastStyles = {
  success: {
    icon: Check,
    iconStyle: "bg-emerald-400/10 text-emerald-400",
  },
  error: {
    icon: AlertCircle,
    iconStyle: "bg-rose-400/10 text-rose-400",
  },
  info: {
    icon: Info,
    iconStyle: "bg-sky-400/10 text-sky-400",
  },
};

export default function ToastViewport() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismissToast = (id) => {
    window.clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((current) => current.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const unsubscribe = subscribeToToasts((nextToast) => {
      setToasts((current) => [...current, nextToast]);
      timers.current.set(
        nextToast.id,
        window.setTimeout(() => dismissToast(nextToast.id), 4200),
      );
    });

    return () => {
      unsubscribe();
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current.clear();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(92vw,22rem)] flex-col gap-3 sm:right-6 sm:top-6"
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((item) => {
        const style = toastStyles[item.type] || toastStyles.info;
        const Icon = style.icon;

        return (
          <div
            key={item.id}
            role={item.type === "error" ? "alert" : "status"}
            className="toast-enter pointer-events-auto flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-3.5 py-3 shadow-xl shadow-black/20"
          >
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${style.iconStyle}`}>
              <Icon size={16} strokeWidth={2.25} />
            </span>
            <p className="min-w-0 flex-1 break-words text-sm leading-5 text-slate-100">
              {item.message}
            </p>
            <button
              type="button"
              onClick={() => dismissToast(item.id)}
              className="shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
