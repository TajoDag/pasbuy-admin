import React from "react";

export const useLocalStorage = (keyName: any, defaultValue: any) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(keyName);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(keyName, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return { value: storedValue, setValue };
};


export function splitText(string: string, length: any) {
  const count = string?.length;
  if (count > length) {
    const text = string.substring(0, length + 1).concat("...");
    return text;
  } else {
    return string;
  }
}
export const formatPrice = (price: number, currency: string): string => {
  const exchangeRates: { [key: string]: number } = {
    USD: 1,
    VND: 25000,
    CNY: 6.5,
  };

  const symbols: { [key: string]: string } = {
    USD: "$",
    VND: "₫",
    CNY: "¥",
  };

  const convertedPrice: number = price * (exchangeRates[currency] || 1);
  const symbol: string = symbols[currency] || "$";

  if (currency === "VND") {
    return `${convertedPrice.toLocaleString()} ${symbol}`;
  } else {
    return `${symbol} ${convertedPrice.toLocaleString()}`;
  }
};