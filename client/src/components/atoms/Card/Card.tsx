"use client";

import React from "react";

export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      </div>
      <div>{children}</div>
    </section>
  );
}
