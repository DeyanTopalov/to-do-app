"use client";

import { useIsClient } from "@lib/hooks";
import { useTheme } from "next-themes";
import { BackgroundLight, BackgroundDark } from "./ui/icons";

export default function ThemeBgImage() {
  const isClient = useIsClient();
  const { resolvedTheme } = useTheme();

  if (!isClient) return <div className="h-full w-full "></div>;

  if (resolvedTheme === "dark") {
    return <BackgroundDark />;
  } else {
    return <BackgroundLight />;
  }
}
