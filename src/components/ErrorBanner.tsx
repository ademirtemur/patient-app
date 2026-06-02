import { useTranslation } from "react-i18next";

interface ErrorBannerProps {
  onRetry: () => void;
}

export default function ErrorBanner({ onRetry }: ErrorBannerProps) {
  const { t } = useTranslation();
  return (
    <div
      role="alert"
      className="flex items-center justify-between px-4 py-3 bg-[#fdecea] border border-rust text-[#7a1f15] mb-3 font-sans text-[13px]"
    >
      <span>{t("error")}</span>
      <button
        onClick={onRetry}
        className="bg-rust text-cream border-0 px-[14px] py-[6px] font-sans text-[11px] tracking-[0.12em] uppercase font-medium"
      >
        {t("retry")}
      </button>
    </div>
  );
}
