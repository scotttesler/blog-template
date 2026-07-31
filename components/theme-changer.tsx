"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeChanger() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex h-7 w-12 items-center rounded-full bg-neutral-400 transition-colors dark:bg-neutral-600"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      <span
        className={`absolute left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] shadow transition-transform ${
          isDark ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {isDark ? "☾" : "☀"}
      </span>
    </button>
  );
}
