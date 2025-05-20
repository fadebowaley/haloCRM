import React from "react";
import { useTheme } from "../../../lib/hooks/use-theme";
import { Button } from "rizzui";
import { Tooltip } from "./ui/tooltip";
import { FaMoon as Moon, FaSun as Sun } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip content={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-9 w-9 transition-all"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5 transition-transform" />
        ) : (
          <Sun className="h-5 w-5 transition-transform" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </Tooltip>
  );
}