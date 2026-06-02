import type { PatientRecord } from "types/patient";
import { todayIso } from "./date";

export const uid = (): string =>
  "pat-" +
  Date.now().toString(36) +
  "-" +
  Math.random().toString(36).slice(2, 6);

export const emptyPatient = (): PatientRecord => {
  const today = `${todayIso()}T00:00:00`;
  return {
    id: uid(),
    fullName: "",
    birthDate: "1990-01-01",
    appointmentDate: today,
    createdAt: today,
    department: "",
    status: "Bekliyor",
    priority: "normal",
    bloodType: "",
    score: 3,
    note_tr: "",
    note_en: "",
    diagnosis_tr: "",
    diagnosis_en: "",
    isInsured: true,
    isFollowUp: false,
    isVaccinated: false,
    tags: [],
    notes: null,
  };
};
