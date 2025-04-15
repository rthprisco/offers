"use client";

import { useState } from "react";

export function InputField({ label, type, name, value = "", error }) {
  const [field, setField] = useState(value);

  return (
    <div className="flex flex-col">
      <span className="ml-1">{label}</span>
      <input
        type={type}
        name={name}
        value={field}
        onChange={(e) => setField(e.target.value)}
        className="rounded-xl border px-4 py-2"
        required
      />
      <span className="ml-1 text-sm text-red-500">{error}</span>
    </div>
  );
}
