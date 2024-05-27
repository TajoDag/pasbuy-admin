import React, { createContext, useContext, useState, ReactNode } from "react";

interface CurrencyContextProps {
  currency: string;
  switchCurrency: (newCurrency: string) => void;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined
);

export const useCurrency = (): CurrencyContextProps => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
}) => {
  const storedCurrency = localStorage.getItem("currency") || "USD";
  const [currency, setCurrency] = useState<string>(storedCurrency);

  const switchCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, switchCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
