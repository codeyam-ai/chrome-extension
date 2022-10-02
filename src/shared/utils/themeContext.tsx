import { createContext, useState, useEffect } from "react";

import type { ReactNode } from "react";

type ThemeName = "light" | "dark" | string;
type ThemeContextType = {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
};

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme:dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
  // returning default theme here
  return "light";
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export const ThemeProvider = ({
  initialTheme,
  children,
}: {
  initialTheme: ThemeName | undefined;
  children: ReactNode;
}) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const rawSetTheme = (theme: string) => {
    //Updated rawSetTheme to theme above//
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("color-theme", theme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
