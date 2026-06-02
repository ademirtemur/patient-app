import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <header className="flex items-center justify-between pb-2">
      <div className="flex items-center gap-[10px]">
        <span className="inline-flex items-center justify-center w-7 h-7 bg-ink text-cream font-serif text-[18px] font-semibold italic tracking-[-0.02em]">
          P
        </span>
        <div>
          <div className="font-serif text-[18px] font-semibold tracking-[-0.02em] leading-none">
            {t("brand")}
          </div>
          <div className="font-sans text-[9px] tracking-[0.18em] uppercase mt-[2px] text-[#5a5a5a]">
            {t("sub")}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[6px] font-mono text-xs">
        <button
          onClick={() => i18n.changeLanguage("tr")}
          className={`bg-transparent border-0 px-[6px] py-1 font-mono text-xs tracking-[0.1em] ${
            lang === "tr"
              ? "text-ink font-semibold border-b-[1.5px] border-rust"
              : "text-[#888]"
          }`}
        >
          TR
        </button>
        <span className="text-[#ccc]">·</span>
        <button
          onClick={() => i18n.changeLanguage("en")}
          className={`bg-transparent border-0 px-[6px] py-1 font-mono text-xs tracking-[0.1em] ${
            lang === "en"
              ? "text-ink font-semibold border-b-[1.5px] border-rust"
              : "text-[#888]"
          }`}
        >
          EN
        </button>
      </div>
    </header>
  );
}
