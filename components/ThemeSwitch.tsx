"use client";

import { useIsClient } from "@lib/hooks";
import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "./ui/icons";

export default function ThemeSwitch() {
  const isClient = useIsClient();
  const { theme, setTheme } = useTheme();

  if (!isClient)
    return (
      <div className="size-7 rounded-full border-2 border-slate-300 "></div>
    );

  if (theme === "dark") {
    return (
      <button
        key="light-theme-btn"
        className="size-7 overflow-hidden rounded-full"
        aria-label="Toggle Light Mode"
        type="button"
        onClick={() => setTheme("light")}
      >
        <IconSun className="animate-movex" />
      </button>
    );
  } else {
    return (
      <button
        key="dark-theme-btn"
        className="size-7 overflow-hidden rounded-full"
        aria-label="Toggle Dark Mode"
        type="button"
        onClick={() => setTheme("dark")}
      >
        <IconMoon className="animate-movex" />
      </button>
    );
  }
}
