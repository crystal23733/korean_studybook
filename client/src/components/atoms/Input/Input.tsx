"use client";

import React from "react";

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className={`w-full rounded-lg border px-3 py-2 ${props.className ?? ""}`} />
  );
}
