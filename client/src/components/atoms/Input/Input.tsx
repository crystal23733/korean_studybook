"use client";

import React, { forwardRef } from "react";

// ref 없는 기본 속성 타입(가독성용)
type InputProps = React.ComponentPropsWithoutRef<"input">;
// 실제 ref 타입
type InputRef = React.ComponentRef<"input">;

const Input = forwardRef<InputRef, InputProps>(function Input({ className = "", ...props }, ref) {
  return (
    <input ref={ref} {...props} className={`w-full rounded-lg border px-3 py-2 ${className}`} />
  );
});

export default Input;
