"use client";

import { useTheme } from "next-themes";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export const ToogleTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <DarkModeSwitch
      checked={theme === "dark"}
      onChange={toggleDarkMode}
      size={30}
      sunColor="#facc15"
      moonColor="#facc15"
    />
  );
};
