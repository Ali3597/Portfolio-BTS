import { useCallback, useState } from "react";
import { DarkTheme, LightTheme } from "../components/Theme";

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

export function useToggleTheme(initial = themes.light) {
  const [state, setState] = useState(initial);
  const toggleTheme = function () {
    if (state == themes.light) {
      setState(themes.dark);
    } else {
      setState(themes.light);
    }
  };
  return [state, useCallback(toggleTheme)];
}
