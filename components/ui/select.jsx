"use client";

import * as React from "react";

// Componente Select principal
export function Select({ children, value, onChange, disabled }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      {children}
    </select>
  );
}

// Para compatibilidade com seu formulário
export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectValue({ value, placeholder }) {
  return <option value="">{value || placeholder}</option>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
