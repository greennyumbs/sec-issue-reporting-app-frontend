"use client"; // This directive ensures the code runs on the client side

import i18n from "../../i18n"; // Adjust the path if necessary
import { I18nextProvider } from "react-i18next";
import { ReactNode, useState, useEffect } from "react";

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    i18n.init().then(() => setIsInitialized(true));
  }, []);

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
