import { createContext } from "react";
import { useToggleTheme } from "../hooks/useToggleTheme";
import { DarkTheme, LightTheme } from "../components/Theme";

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useToggleTheme();
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
