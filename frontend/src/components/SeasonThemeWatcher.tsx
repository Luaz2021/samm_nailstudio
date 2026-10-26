"use client";

import { useEffect } from "react";
import { getActiveLimaThemeState, applySeasonTheme } from "@/data/catalog";

export function SeasonThemeWatcher() {
  useEffect(() => {
    try {
      const applyCurrentTheme = () => {
        const themeState = getActiveLimaThemeState();
        applySeasonTheme(themeState.activeTheme.colors);
      };

      applyCurrentTheme();

      const handleStorage = () => {
        applyCurrentTheme();
      };

      window.addEventListener("storage", handleStorage);
      window.addEventListener("samm-theme-change", handleStorage);
      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener("samm-theme-change", handleStorage);
      };
    } catch (e) {
      console.error(e);
    }
  }, []);

  return null;
}
