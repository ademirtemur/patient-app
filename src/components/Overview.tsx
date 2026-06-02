import { useTranslation } from "react-i18next";
import Kpi from "./Kpi";
import type { Kpis } from "types/patient";

interface OverviewProps {
  kpis: Kpis;
}

export default function Overview({ kpis }: OverviewProps) {
  const { t } = useTranslation();
  return (
    <section className="py-2">
      <div className="font-mono text-[9px] tracking-[0.25em] text-[#888] mb-[6px]">
        {t("overview")}
      </div>
      <div className="grid grid-cols-4 gap-8">
        <Kpi label={t("totalPatients")} value={kpis.total} />
        <Kpi label={t("pending")} value={kpis.pending} accent="#8a6d1f" />
        <Kpi label={t("urgent")} value={kpis.urgent} accent="#c0392b" />
        <Kpi label={t("avgScore")} value={kpis.avg} suffix="/5" />
      </div>
    </section>
  );
}
