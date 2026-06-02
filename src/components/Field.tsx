import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  children: ReactNode;
}

export default function Field({ label, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-[6px]">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5a5a5a]">
        {label}
      </span>
      {children}
    </label>
  );
}
