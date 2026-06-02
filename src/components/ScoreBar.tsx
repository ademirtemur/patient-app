interface ScoreBarProps {
  value: number;
}

export default function ScoreBar({ value }: ScoreBarProps) {
  const v = Math.max(1, Math.min(5, value));
  const pct = (v / 5) * 100;
  const color = v >= 4 ? "#1f4d2e" : v >= 3 ? "#8a6d1f" : "#c0392b";
  return (
    <div className="flex items-center gap-2 justify-end">
      <span className="font-mono text-sm" style={{ color }}>
        {v}/5
      </span>
      <div className="w-[60px] h-1 bg-[#ece4d2] relative">
        <div
          className="absolute left-0 top-0 h-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
