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

  const setValue = (value:any) => {
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
