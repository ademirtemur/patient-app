import { useTranslation } from "react-i18next";
import type { Lang, PatientRecord } from "types/patient";
import { PRIORITY_COLOR, STATUS_COLOR } from "constants/catalog";
import { fmtDate } from "utils/date";
import FlagChip from "./FlagChip";
import ScoreBar from "./ScoreBar";

interface PatientTableProps {
  rows: PatientRecord[];
  onEdit: (p: PatientRecord) => void;
  onDelete: (id: string) => void;
}

export default function PatientTable({
  rows,
  onEdit,
  onDelete,
}: PatientTableProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  return (
    <div className="border border-oat">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            <Th width="90px">ID</Th>
            <Th>{t("fullName")}</Th>
            <Th>{t("department")}</Th>
            <Th>{t("appointment")}</Th>
            <Th>{t("diagnosis")}</Th>
            <Th>{t("flags")}</Th>
            <Th>{t("priority")}</Th>
            <Th>{t("status")}</Th>
            <Th align="right">{t("score")}</Th>
            <Th align="right" width="140px">
              {t("actions")}
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p, i) => {
            const note = lang === "tr" ? p.note_tr : p.note_en;
            const diagnosis = lang === "tr" ? p.diagnosis_tr : p.diagnosis_en;
            return (
              <tr
                key={p.id}
                className="border-b border-[#ece4d2]"
                style={{
                  background: i % 2 === 0 ? "#fbf8f3" : "transparent",
                }}
              >
                <td className="p-[14px] align-middle text-ink font-mono">
                  {p.id}
                </td>
                <td className="p-[14px] align-middle text-ink">
                  <div className="flex flex-col gap-[2px]">
                    <span className="font-serif text-[17px] font-medium tracking-[-0.01em]">
                      {p.fullName}
                    </span>
                    <span className="font-mono text-[10px] text-[#888] tracking-[0.05em]">
                      {fmtDate(p.birthDate, lang)} · {p.bloodType}
                    </span>
                  </div>
                </td>
                <td className="p-[14px] align-middle">
                  <span className="inline-block px-2 py-[3px] bg-ink text-cream font-mono text-[10px] tracking-wider uppercase">
                    {p.department}
                  </span>
                </td>
                <td className="p-[14px] align-middle text-ink font-mono">
                  <div>{fmtDate(p.appointmentDate, lang)}</div>
                  <div className="text-[10px] text-[#888] mt-[2px]">
                    {t("createdAt")}: {fmtDate(p.createdAt, lang)}
                  </div>
                </td>
                <td className="p-[14px] align-middle text-ink">
                  <div className="font-serif text-[14px] italic mb-1">
                    {diagnosis}
                  </div>
                  {note && (
                    <div className="font-serif italic text-[11px] text-[#5a5a5a] mt-[2px] mb-1 max-w-[320px]">
                      “{note}”
                    </div>
                  )}
                  {p.notes && (
                    <div className="font-sans text-[11px] text-[#888] mt-[2px] mb-1 max-w-[320px]">
                      ※ {p.notes}
                    </div>
                  )}
                  {(p.tags || []).length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-1">
                      {p.tags.slice(0, 3).map((tg) => (
                        <span
                          key={tg}
                          className="font-mono text-[9px] px-[5px] py-[1px] border border-oat text-[#5a5a5a] tracking-[0.05em]"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="p-[14px] align-middle">
                  <div className="flex gap-1">
                    <FlagChip
                      on={p.isInsured}
                      label={t("flagInsured")}
                      title={t("insured")}
                    />
                    <FlagChip
                      on={p.isFollowUp}
                      label={t("flagFollowUp")}
                      title={t("followUp")}
                    />
                    <FlagChip
                      on={p.isVaccinated}
                      label={t("flagVaccinated")}
                      title={t("vaccinated")}
                    />
                  </div>
                </td>
                <td className="p-[14px] align-middle">
                  <span
                    className="inline-flex items-center gap-[6px] px-2 py-[3px] border font-sans text-[11px] font-medium tracking-[0.05em]"
                    style={{
                      color: PRIORITY_COLOR[p.priority],
                      borderColor: PRIORITY_COLOR[p.priority],
                    }}
                  >
                    <span
                      className="inline-block w-[6px] h-[6px] rounded-full"
                      style={{ background: PRIORITY_COLOR[p.priority] }}
                    />
                    {t(`priorities.${p.priority}`)}
                  </span>
                </td>
                <td className="p-[14px] align-middle">
                  <span
                    className="inline-block px-2 py-[2px] border font-mono text-[10px] tracking-[0.1em] uppercase"
                    style={{
                      color: STATUS_COLOR[p.status],
                      borderColor: STATUS_COLOR[p.status],
                    }}
                  >
                    {t(`statuses.${p.status}`)}
                  </span>
                </td>
                <td className="p-[14px] align-middle text-right font-mono text-[15px]">
                  <ScoreBar value={p.score} />
                </td>
                <td className="p-[14px] align-middle text-right">
                  <button
                    onClick={() => onEdit(p)}
                    className="border-0 bg-transparent text-ink font-sans text-xs px-1 py-[2px] underline underline-offset-[3px]"
                  >
                    {t("edit")}
                  </button>
                  <span className="text-[#ccc] mx-1">·</span>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="border-0 bg-transparent text-rust font-sans text-xs px-1 py-[2px] underline underline-offset-[3px]"
                  >
                    {t("delete")}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  children,
  align = "left",
  width,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  width?: string;
}) {
  return (
    <th
      className="sticky top-0 z-10 p-[12px_14px] font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-[#5a5a5a] bg-butter shadow-[inset_0_-1px_0_#1a1a1a]"
      style={{
        textAlign: align,
        ...(width ? { width } : {}),
      }}
    >
      {children}
    </th>
  );
}
