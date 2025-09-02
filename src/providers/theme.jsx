import { createContext, useState, useEffect } from "react";
import { getTheme } from "../utils";
import { THEME_LS_KEY } from "../constants";

export const ThemeContext = createContext({
  theme: null,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getTheme());

  useEffect(() => {
    localStorage.setItem(THEME_LS_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
