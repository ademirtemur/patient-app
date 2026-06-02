export type Lang = "tr" | "en";

export type Status = "Bekliyor" | "Muayenede" | "Tamamlandı" | "İptal";

export type Priority = "acil" | "normal";

export interface PatientRecord {
  id: string;
  fullName: string;
  birthDate: string;
  appointmentDate: string;
  createdAt: string;
  department: string;
  status: Status;
  priority: Priority;
  bloodType: string;
  score: number; // 1–5
  note_tr: string;
  note_en: string;
  diagnosis_tr: string;
  diagnosis_en: string;
  isInsured: boolean;
  isFollowUp: boolean;
  isVaccinated: boolean;
  tags: string[];
  notes: string | null;
}

export type SortKey =
  | "appointmentDate"
  | "createdAt"
  | "fullName"
  | "priority"
  | "score";

export type SortDir = "asc" | "desc";

export interface Kpis {
  total: number;
  pending: number;
  urgent: number;
  avg: number;
}
