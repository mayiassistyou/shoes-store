"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";

function ThemeToggle(): JSX.Element {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      className="group p-3"
      variant={"secondary"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun
        className="duration-750 absolute transition-all ease-in-out group-hover:rotate-180 group-hover:text-yellow-600 dark:-rotate-90 dark:scale-0"
        size={16}
      />
      <Moon
        className="duration-750 rotate-90 scale-0 transition-all ease-in-out group-hover:text-blue-400 dark:rotate-0 dark:scale-100"
        size={16}
      />
    </Button>
  );
}

export default ThemeToggle;
