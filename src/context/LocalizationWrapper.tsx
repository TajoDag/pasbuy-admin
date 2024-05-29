import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IntlProvider } from "react-intl";
import enLocale from "../locales/en.json";
import viLocale from "../locales/vi.json";
import zhLocale from "../locales/zh.json";

type LocalizationContextType = {
  locale: string;
  switchLocale: (newLocale: string) => void;
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined
);

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }
  return context;
};

type LocalizationProviderProps = {
  children: ReactNode;
};

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  const storedLocale = localStorage.getItem("locale");
  const [locale, setLocale] = useState<string>(storedLocale || "en");

  const messages: any = {
    en: enLocale,
    vi: viLocale,
    zh: zhLocale,
  };

  const switchLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    switchLocale(locale);
  }, [locale]);

  return (
    <LocalizationContext.Provider value={{ locale, switchLocale }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div dir={dir}>{children}</div>
      </IntlProvider>
    </LocalizationContext.Provider>
  );
};
