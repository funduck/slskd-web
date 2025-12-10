"use client";

import { MantineProvider } from "@mantine/core";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { darkTheme, lightTheme } from "./theme";

type ColorScheme = "light" | "dark" | "auto";

interface ThemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  resolvedColorScheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>("auto");
  const [resolvedColorScheme, setResolvedColorScheme] = useState<"light" | "dark">("light");

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("color-scheme") as ColorScheme;
    if (stored) {
      setColorSchemeState(stored);
    }
  }, []);

  // Resolve the actual color scheme based on user preference and system preference
  useEffect(() => {
    const updateResolvedScheme = () => {
      if (colorScheme === "auto") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setResolvedColorScheme(prefersDark ? "dark" : "light");
      } else {
        setResolvedColorScheme(colorScheme);
      }
    };

    updateResolvedScheme();

    // Listen for system theme changes when in auto mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateResolvedScheme);

    return () => mediaQuery.removeEventListener("change", updateResolvedScheme);
  }, [colorScheme]);

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
    localStorage.setItem("color-scheme", scheme);
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, resolvedColorScheme }}>
      <MantineProvider
        theme={resolvedColorScheme === "dark" ? darkTheme : lightTheme}
        forceColorScheme={resolvedColorScheme}
      >
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
}
