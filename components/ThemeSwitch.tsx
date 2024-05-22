"use client";

import { useIsClient } from "@lib/hooks";
import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "./ui/icons";

export default function ThemeSwitch() {
  const isClient = useIsClient();
  const { setTheme, resolvedTheme } = useTheme();
  //! important use {setTheme, resolvedTheme} instead of { theme, setTheme} - otherwise the initial theme based on system preferences might not be caught in the if / else logic below

  // Placeholder for SSR to avaoid layout shift
  if (!isClient)
    return (
      <div className="size-7 rounded-full border-2 border-slate-300 "></div>
    );

  if (resolvedTheme === "dark") {
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
