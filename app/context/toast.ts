"use client";

export type ToastType = "success" | "error" | "info";

export type ToastMessage = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastListener = (toast: ToastMessage) => void;

const listeners = new Set<ToastListener>();
let nextToastId = 0;

function showToast(message: string, type: ToastType) {
  const toastMessage = { id: ++nextToastId, message, type };
  listeners.forEach((listener) => listener(toastMessage));
}

export const toast = {
  success: (message: string) => showToast(message, "success"),
  error: (message: string) => showToast(message, "error"),
  info: (message: string) => showToast(message, "info"),
};

export function subscribeToToasts(listener: ToastListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
