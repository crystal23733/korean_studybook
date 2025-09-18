"use client";

export default function Badge({
  children,
  tone = "ok",
}: {
  children: React.ReactNode;
  tone?: "ok" | "error";
}) {
  const cls = tone === "ok" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700";
  return <span className={`rounded-full px-2 py-0.5 text-xs ${cls}`}>{children}</span>;
}
