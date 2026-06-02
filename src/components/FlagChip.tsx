interface FlagChipProps {
  on: boolean;
  label: string;
  title: string;
}

export default function FlagChip({ on, label, title }: FlagChipProps) {
  const onClasses = "bg-ink text-cream border-ink";
  const offClasses = "bg-transparent text-[#bbb] border-[#e3dccc]";
  return (
    <span
      title={title}
      aria-label={title}
      className={`font-mono text-[9px] px-[6px] py-[2px] tracking-[0.1em] border ${
        on ? onClasses : offClasses
      }`}
    >
      {label}
    </span>
  );
}
