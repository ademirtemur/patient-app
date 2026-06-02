import { useTranslation } from "react-i18next";
import type { SortDir, SortKey } from "types/patient";

interface ControlsProps {
  query: string;
  setQuery: (v: string) => void;
  deptFilter: string;
  setDeptFilter: (v: string) => void;
  sortKey: SortKey;
  setSortKey: (v: SortKey) => void;
  sortDir: SortDir;
  setSortDir: (v: SortDir) => void;
  departments: string[];
  onAdd: () => void;
  visibleCount: number;
  totalCount: number;
}

export default function Controls({
  query,
  setQuery,
  deptFilter,
  setDeptFilter,
  sortKey,
  setSortKey,
  sortDir,
  setSortDir,
  departments,
  onAdd,
  visibleCount,
  totalCount,
}: ControlsProps) {
  const { t } = useTranslation();

  const filterActive = query.trim() !== "" || deptFilter !== "__all";

  return (
    <section className="py-4 flex items-end gap-5 flex-wrap">
      <div className="relative flex-1 basis-[280px] min-w-[240px]">
        <span className="absolute left-0 top-2 text-lg text-[#5a5a5a]">⌕</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search")}
          className="w-full border-0 border-b border-ink bg-transparent pl-[26px] pr-[110px] py-2 font-serif text-xl italic text-ink"
        />
        <span
          className={`absolute right-0 top-[10px] font-mono text-[11px] tracking-[0.05em] ${
            filterActive ? "text-rust" : "text-[#888]"
          }`}
        >
          {visibleCount} / {totalCount} {t("records")}
        </span>
      </div>

      <div className="flex items-end gap-2">
        <div>
          <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5a5a5a] block mb-[6px]">
            {t("filterDept")}
          </label>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="border border-ink bg-transparent px-[10px] py-[6px] font-sans text-[13px] text-ink cursor-pointer"
          >
            <option value="__all">{t("filterAll")}</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-end gap-2">
        <div>
          <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5a5a5a] block mb-[6px]">
            {t("sortBy")}
          </label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="border border-ink bg-transparent px-[10px] py-[6px] font-sans text-[13px] text-ink cursor-pointer"
          >
            <option value="appointmentDate">{t("sort_appointmentDate")}</option>
            <option value="createdAt">{t("sort_createdAt")}</option>
            <option value="fullName">{t("sort_fullName")}</option>
            <option value="priority">{t("sort_priority")}</option>
            <option value="score">{t("sort_score")}</option>
          </select>
        </div>
        <button
          onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
          aria-label="sort direction"
          className="border border-ink bg-ink text-cream w-[30px] h-[30px] font-mono text-sm"
        >
          {sortDir === "asc" ? "↑" : "↓"}
        </button>
      </div>

      <button
        onClick={onAdd}
        className="ml-auto border border-rust bg-rust text-cream px-5 h-[30px] font-sans text-[11px] tracking-[0.12em] uppercase font-medium"
      >
        {t("addNew")}
      </button>
    </section>
  );
}
