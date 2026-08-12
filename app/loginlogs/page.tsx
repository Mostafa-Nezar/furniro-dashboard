"use client";
import { useEffect } from "react";
import { useAppContext } from "../context/context";

const formatDate = (value: string | number | Date | undefined) => {
  if (!value) return "-";
  const date = new Date(value);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Loginlogs() {
  const { loginlogs } = useAppContext();

  return (
    <div className="w-full p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-heading">Login History</h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-heading">{loginlogs.length}</h2>
          <p className="text-sm text-muted mt-2">Review recent user login activity and device details.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loginlogs?.map((log) => (
          <div
            key={log._id}
            className="group rounded-3xl overflow-hidden border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/50 flex flex-col p-5"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div>
                  <h2 className="text-lg font-semibold text-heading truncate">{log.email || `User ${log.userId || "Unknown"}`}</h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{log.google ? "Google login" : "Email login"}</p>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{formatDate(log.date)}</span>
              </div>
              <p className="text-sm text-slate-400">IP: {log.ip || "Unknown"}</p>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Location</p>
                <p>{log.location?.locationString || `${log.location?.city || "Unknown city"}, ${log.location?.region || "Unknown region"}`}</p>
                <p>{log.location?.country || "Unknown country"}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Device</p>
                <p>{log.deviceInfo?.brand || log.deviceInfo?.manufacturer || log.deviceInfo?.device || "Unknown device"}</p>
                {log.deviceInfo?.model && <p>{log.deviceInfo.model}</p>}
                {log.deviceInfo?.webBrowserInfo && (
                  <p className="break-words">{typeof log.deviceInfo.webBrowserInfo === "string" ? log.deviceInfo.webBrowserInfo : JSON.stringify(log.deviceInfo.webBrowserInfo)}</p>
                )}
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">User agent</p>
                <p className="break-words">{log.userAgent || "Not available"}</p>
              </div>
            </div>
          </div>
        ))}

        {(!loginlogs || loginlogs.length === 0) && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No login history found.
          </div>
        )}
      </div>
    </div>
  );
}
