import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePatients } from "hooks/usePatients";
import type {
  Lang,
  PatientRecord,
  SortDir,
  SortKey,
} from "types/patient";
import { PRIORITY_WEIGHT } from "constants/catalog";
import { emptyPatient } from "utils/patient";
import Header from "./Header";
import Overview from "./Overview";
import Controls from "./Controls";
import PatientTable from "./PatientTable";
import PatientModal from "./PatientModal";
import ErrorBanner from "./ErrorBanner";

export default function PatientDashboard() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const { patients, loading, error, retry, add, update, remove } =
    usePatients();

  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("__all");
  const [sortKey, setSortKey] = useState<SortKey>("appointmentDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const [editing, setEditing] = useState<PatientRecord | null>(null);
  const [isNew, setIsNew] = useState(false);

  const departments = useMemo(() => {
    const set = new Set(patients.map((p) => p.department).filter(Boolean));
    return Array.from(set).sort();
  }, [patients]);

  const visible = useMemo(() => {
    const locale = lang === "tr" ? "tr-TR" : "en-GB";
    const q = query.trim().toLocaleLowerCase(locale);
    let rows = patients.filter((p) => {
      if (deptFilter !== "__all" && p.department !== deptFilter) return false;
      if (!q) return true;
      const hay = [
        p.fullName,
        p.id,
        p.department,
        p.diagnosis_tr,
        p.diagnosis_en,
        p.note_tr,
        p.note_en,
        p.notes || "",
        (p.tags || []).join(" "),
      ]
        .join(" ")
        .toLocaleLowerCase(locale);
      return hay.includes(q);
    });

    rows = [...rows].sort((a, b) => {
      let av: number | string = "";
      let bv: number | string = "";
      switch (sortKey) {
        case "appointmentDate":
          av = new Date(a.appointmentDate).getTime();
          bv = new Date(b.appointmentDate).getTime();
          break;
        case "createdAt":
          av = new Date(a.createdAt).getTime();
          bv = new Date(b.createdAt).getTime();
          break;
        case "fullName":
          av = a.fullName.toLocaleLowerCase(locale);
          bv = b.fullName.toLocaleLowerCase(locale);
          break;
        case "priority":
          av = PRIORITY_WEIGHT[a.priority] || 0;
          bv = PRIORITY_WEIGHT[b.priority] || 0;
          break;
        case "score":
          av = a.score;
          bv = b.score;
          break;
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return rows;
  }, [patients, query, deptFilter, sortKey, sortDir, lang]);

  const kpis = useMemo(() => {
    const total = patients.length;
    const pending = patients.filter((p) => p.status === "Bekliyor").length;
    const urgent = patients.filter((p) => p.priority === "acil").length;
    const avg =
      total === 0
        ? 0
        : Math.round(
          (patients.reduce((s, p) => s + (p.score || 0), 0) / total) * 10
        ) / 10;
    return { total, pending, urgent, avg };
  }, [patients]);

  const startAdd = () => {
    setEditing(emptyPatient());
    setIsNew(true);
  };
  const startEdit = (p: PatientRecord) => {
    setEditing({ ...p });
    setIsNew(false);
  };
  const cancelEdit = () => {
    setEditing(null);
    setIsNew(false);
  };
  const saveEdit = (data: PatientRecord) => {
    if (isNew) add(data);
    else update(data);
    setEditing(null);
    setIsNew(false);
  };
  const handleDelete = (id: string) => {
    if (!confirm(t("confirm"))) return;
    remove(id);
  };

  return (
    <div
      className="h-[100dvh] flex flex-col text-ink font-sans text-sm overflow-hidden"
      style={{
        background:
          "radial-gradient(at 20% 0%, #fdfbf6 0%, #f3ede1 100%)",
      }}
    >
      <div className="shrink-0 px-10 pt-3">
        <Header />
        <div className="h-px bg-ink -mx-10" />
        <Overview kpis={kpis} />
        <div className="h-px bg-ink -mx-10" />
        <Controls
          query={query}
          setQuery={setQuery}
          deptFilter={deptFilter}
          setDeptFilter={setDeptFilter}
          sortKey={sortKey}
          setSortKey={setSortKey}
          sortDir={sortDir}
          setSortDir={setSortDir}
          departments={departments}
          onAdd={startAdd}
          visibleCount={visible.length}
          totalCount={patients.length}
        />
      </div>

      <div className="flex-1 overflow-auto px-10 min-h-0">
        {error && !loading && <ErrorBanner onRetry={retry} />}

        {loading ? (
          <div className="p-10 text-center font-sans text-xs text-[#5a5a5a] tracking-[0.1em] uppercase">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="ml-3">{t("loading")}</span>
          </div>
        ) : visible.length === 0 ? (
          <div className="py-[60px] text-center font-serif italic text-xl text-[#888]">
            — {t("empty")} —
          </div>
        ) : (
          <PatientTable
            rows={visible}
            onEdit={startEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {editing && (
        <PatientModal
          editing={editing}
          isNew={isNew}
          onSave={saveEdit}
          onCancel={cancelEdit}
        />
      )}
    </div>
  );
}
