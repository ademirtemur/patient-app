interface CheckProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export default function Check({ label, checked, onChange }: CheckProps) {
  return (
    <label className="flex items-center gap-[6px] text-[13px] font-sans">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
