import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react"; // You can use any icon library

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "system" || theme === "light" ? "dark" : "light")}
      className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {theme === "system" || theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
     
    </button>
  );
}