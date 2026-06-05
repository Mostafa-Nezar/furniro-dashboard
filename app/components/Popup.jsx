"use client";

export default function Popup({ open, title, message, type = "info", onClose }) {
  if (!open) return null;

  const typeStyles = {
    success: "bg-emerald-50 text-emerald-900 border-emerald-200",
    error: "bg-red-50 text-red-900 border-red-200",
    info: "bg-slate-50 text-slate-900 border-slate-200",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden ${typeStyles[type]}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
          <div>
            <p className="text-lg font-semibold text-slate-900">{title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 text-2xl leading-none"
            aria-label="Close popup"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5 bg-white text-slate-700">
          <p className="whitespace-pre-line">{typeof message === "string" ? message : JSON.stringify(message, null, 2)}</p>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
