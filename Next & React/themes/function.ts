import { useTheme } from "next-themes";

function useThemesUpdate() {
  const { theme, setTheme, systemTheme } = useTheme();

  const effectiveTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    const next = effectiveTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };
}
