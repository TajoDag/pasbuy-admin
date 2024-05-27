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

interface LocalizationContextProps {
  locale: string;
  switchLocale: (newLocale: string) => void;
}

const LocalizationContext = createContext<LocalizationContextProps | undefined>(
  undefined
);

export const useLocalization = (): LocalizationContextProps => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }
  return context;
};

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  const storedLocale = localStorage.getItem("locale");
  const [locale, setLocale] = useState<string>(storedLocale || "en");

  const messages: { [key: string]: any } = {
    en: enLocale,
    vi: viLocale,
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
