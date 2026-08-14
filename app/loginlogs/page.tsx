"use client";

import { useEffect, useRef } from "react";
import {
  Activity,
  Chrome,
  Fingerprint,
  Globe,
  KeyRound,
  LockKeyhole,
  Mail,
  MapPin,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  UserCircle2,
} from "lucide-react";
import { useAppContext } from "../context/context";

const ICONS = [
  Mail,
  UserCircle2,
  ShieldCheck,
  LockKeyhole,
  KeyRound,
  Globe,
  MonitorSmartphone,
  Smartphone,
  MapPin,
  Chrome,
  Activity,
  Fingerprint,
];

const formatDate = (value: string | number | Date | undefined) => {
  if (!value) return "Unknown";
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Unknown";

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const hasValue = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;

  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value === "boolean") return true;
  if (Array.isArray(value)) return value.some((item) => hasValue(item));
  if (typeof value === "object") return Object.keys(value as Record<string, unknown>).length > 0;

  return false;
};

const cleanText = (value: unknown): string => {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    return value
      .map((item) => cleanText(item))
      .filter(Boolean)
      .join(", ");
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, item]) => {
        const text = cleanText(item);
        return text ? `${key}: ${text}` : "";
      })
      .filter(Boolean)
      .slice(0, 3)
      .join(" • ");
  }
  return "";
};

const getCardIcon = (log: Record<string, any>, index: number) => {
  const raw = log?._id || log?.email || `${index}`;
  const seed = Array.from(String(raw)).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return ICONS[seed % ICONS.length];
};

export default function Loginlogs() {
  const { loginlogs, loginlogsPagination, loading, fetchLoginlogs } = useAppContext();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const hasMore = Number(loginlogsPagination?.totalPages ?? 0) > Number(loginlogsPagination?.page ?? 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0]?.isIntersecting &&
          !loading &&
          hasMore
        ) {
          fetchLoginlogs(Number(loginlogsPagination?.page ?? 1) + 1, 20, true);
        }
      },
      { rootMargin: "300px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore, loginlogsPagination, fetchLoginlogs]);

  return (
    <div className="min-h-screen w-full bg-[#020d1d] p-4 text-slate-100 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">Session activity</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-100">Login History</h1>
          </div>
          <div className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-200 shadow-inner shadow-slate-950/30">
            {loginlogs?.length ?? 0}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {loginlogs?.map((log: Record<string, any>, index: number) => {
            const Icon = getCardIcon(log, index);

            const locationValues = [
              log?.location?.locationString,
              log?.location?.city,
              log?.location?.region,
              log?.location?.country,
            ].filter(hasValue);

            const deviceValues = [
              log?.deviceInfo?.brand,
              log?.deviceInfo?.manufacturer,
              log?.deviceInfo?.device,
              log?.deviceInfo?.model,
            ].filter(hasValue);

            const browserInfo = cleanText(log?.deviceInfo?.webBrowserInfo);
            const userAgent = cleanText(log?.userAgent);

            return (
              <article
                key={log?._id || `${log?.email || "login"}-${index}`}
                className="group rounded-[28px] border border-slate-700/80 bg-[#081a2b]/90 p-5 shadow-[0_20px_50px_rgba(2,8,23,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-500"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-600 bg-slate-800/90 text-slate-100 shadow-inner shadow-slate-950/40">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-semibold text-slate-100">
                        {log?.email || (log?.userId ? `User ${log.userId}` : "Unknown user")}
                      </h2>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">
                        {log?.google ? "Google login" : "Email login"}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-[120px] items-center justify-end gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 shadow-inner shadow-slate-950/30">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                    <span className="text-[10px] font-medium text-slate-200">{formatDate(log?.date)}</span>
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-slate-400">IP:</span>
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-xs">
                    {log?.ip || "Unknown"}
                  </span>
                </div>
                <div className="mb-4 inline-flex rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200">
                  {log?.type || "Unknown"}
                </div>
                {locationValues.length > 0 ? (
                  <div className="mt-4 space-y-2 border-t border-slate-800 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Location</p>
                    {locationValues.map((value, idx) => (
                      <p key={`${value}-${idx}`} className="text-sm text-slate-200">
                        {value}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 space-y-2 border-t border-slate-800 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Location</p>
                    <p className="text-sm text-slate-200">Unknown</p>
                  </div>
                )}

                {deviceValues.length > 0 || browserInfo ? (
                  <div className="mt-4 space-y-2 border-t border-slate-800 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Device</p>
                    {deviceValues.length > 0 ? (
                      <div className="space-y-1 text-sm text-slate-200">
                        {deviceValues.map((value, idx) => (
                          <p key={`${value}-${idx}`}>{value}</p>
                        ))}
                      </div>
                    ) : null}
                    {browserInfo ? <p className="break-words text-sm text-slate-300">{browserInfo}</p> : null}
                  </div>
                ) : (
                  <div className="mt-4 space-y-2 border-t border-slate-800 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Device</p>
                    <p className="text-sm text-slate-200">Unknown</p>
                  </div>
                )}

                {userAgent ? (
                  <div className="mt-4 space-y-2 border-t border-slate-800 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">User agent</p>
                    <p className="break-words text-sm text-slate-200">{userAgent}</p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-2 border-t border-slate-800 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">User agent</p>
                    <p className="text-sm text-slate-200">Unknown</p>
                  </div>
                )}
              </article>
            );
          })}

          {loading && loginlogs?.length > 0 ? (
            <div className="col-span-full flex justify-center py-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                Loading more...
              </div>
            </div>
          ) : null}

          <div ref={loadMoreRef} className="col-span-full h-1" />

          {!loading && (!loginlogs || loginlogs.length === 0) ? (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 py-12 text-center text-slate-400">
              No login history found.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
