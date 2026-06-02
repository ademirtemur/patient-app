import type { Priority, Status } from "types/patient";

export const PRIORITY_WEIGHT: Record<Priority, number> = {
  acil: 2,
  normal: 1,
};

export const PRIORITY_COLOR: Record<Priority, string> = {
  acil: "#c0392b",
  normal: "#3b6064",
};

export const STATUS_COLOR: Record<Status, string> = {
  Bekliyor: "#8a6d1f",
  Muayenede: "#1f4d2e",
  Tamamlandı: "#2a3b5f",
  İptal: "#7a6a6a",
};

export const STATUS_ORDER: Status[] = [
  "Bekliyor",
  "Muayenede",
  "Tamamlandı",
  "İptal",
];

export const PRIORITY_ORDER: Priority[] = ["acil", "normal"];

export const BLOOD_TYPES = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "0+",
  "0-",
];

export const DEPARTMENTS = [
  "Dahiliye",
  "Kardiyoloji",
  "Nöroloji",
  "Ortopedi",
  "Pediatri",
  "Dermatoloji",
  "Göz",
  "KBB",
  "Üroloji",
  "Kadın Doğum",
  "Psikiyatri",
  "Genel Cerrahi",
];
