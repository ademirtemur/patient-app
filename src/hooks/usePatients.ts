import { useEffect, useState } from "react";
import type { PatientRecord } from "types/patient";
import { SEED } from "constants/seed";

export function usePatients() {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://v0-json-api-three.vercel.app/api/data"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const rows: PatientRecord[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.records)
          ? data.records
          : Array.isArray(data?.patients)
          ? data.patients
          : [];
        if (!cancelled) {
          setPatients(rows.length > 0 ? rows : SEED);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "unknown");
          setPatients(SEED);
          setLoading(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  return {
    patients,
    loading,
    error,
    retry: () => setReloadKey((k) => k + 1),
    add: (p: PatientRecord) =>
      setPatients((prev) => [p, ...prev]),
    update: (p: PatientRecord) =>
      setPatients((prev) => prev.map((x) => (x.id === p.id ? p : x))),
    remove: (id: string) =>
      setPatients((prev) => prev.filter((x) => x.id !== id)),
  };
}
