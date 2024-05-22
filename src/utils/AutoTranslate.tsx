// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect } from "react";

const AutoTranslate: React.FC = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    const googleTranslateElementInit = () => {
      const lang = localStorage.getItem("language") || "en";
      console.log("Selected language:", lang); // Log the selected language
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: lang,
            includedLanguages: "vi,en,zh-CN", // Include the languages you want to support
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    if (!(window as any).googleTranslateInitialized) {
      (window as any).googleTranslateElementInit = googleTranslateElementInit;
      addGoogleTranslateScript().then(() => {
        (window as any).googleTranslateElementInit();
        (window as any).googleTranslateInitialized = true;
      });
    } else {
      googleTranslateElementInit();
    }

    window.addEventListener("languageChange", googleTranslateElementInit);

    return () => {
      window.removeEventListener("languageChange", googleTranslateElementInit);
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default AutoTranslate;
