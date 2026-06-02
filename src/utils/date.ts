import type { Lang } from "types/patient";

export const fmtDate = (iso: string, lang: Lang): string => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
};

export const toDateInput = (iso: string): string => {
  if (!iso) return "";
  // API returns "2024-02-14T00:00:00" — just take the date part
  return iso.slice(0, 10);
};

export const fromDateInput = (date: string): string => `${date}T00:00:00`;

export const todayIso = (): string => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
