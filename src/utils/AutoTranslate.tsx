import React, { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const AutoTranslate: React.FC = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,vi,zh-CN", // Thay đổi các ngôn ngữ bạn muốn hỗ trợ
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    addGoogleTranslateScript();

    const handleLanguageChange = () => {
      const lang = localStorage.getItem("language") || "en";
      const googleTranslateElement = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement;
      if (googleTranslateElement) {
        googleTranslateElement.value = lang;
        googleTranslateElement.dispatchEvent(new Event("change"));
      }
    };

    window.addEventListener("languageChange", handleLanguageChange);

    // Clean up event listener
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default AutoTranslate;
