import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import tr from "./tr/tr.json";
import en from "./en/en.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: { lang: tr },
      en: { lang: en },
    },
    fallbackLng: "tr",
    supportedLngs: ["tr", "en"],
    ns: ["lang"],
    defaultNS: "lang",
    nsSeparator: ".",
    keySeparator: ".",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
