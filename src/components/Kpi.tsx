interface KpiProps {
  label: string;
  value: number;
  suffix?: string;
  accent?: string;
}

export default function Kpi({ label, value, suffix, accent }: KpiProps) {
  return (
    <div className="pl-[14px] border-l border-oat">
      <div className="font-sans text-[10px] tracking-[0.12em] uppercase text-[#5a5a5a] mb-[2px]">
        {label}
      </div>
      <div
        className="font-sans text-[30px] font-semibold leading-none tracking-[-0.02em] tabular-nums"
        style={{ color: accent || "#1a1a1a" }}
      >
        {value}
        {suffix && (
          <span className="font-mono text-[12px] text-[#888] ml-[4px] font-normal">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
