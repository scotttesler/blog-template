"use client";

import type { MetalFxProps, MetalFxVariant } from "metal-fx";
import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactElement,
} from "react";

let loadedMetalFx: ComponentType<MetalFxProps> | null = null;
let metalFxLoad: Promise<void> | undefined;
const metalFxListeners = new Set<() => void>();

async function loadMetalFx() {
  const { createInstance, isMetalFxSupported, MetalFx } =
    await import("metal-fx");

  if (!isMetalFxSupported()) {
    return;
  }

  // As of metal-fx 2.0.11, unmounting the last ring disposes the shared
  // WebGL renderer, and the old context's late "context lost" event then
  // stops the next renderer, so rings that remount after a page navigation
  // never appear. An idle, detached instance keeps the renderer alive.
  createInstance({
    cornerRadius: 0,
    cssHeight: 8,
    cssWidth: 8,
    hostCanvas: document.createElement("canvas"),
    kind: "pill",
    paused: true,
  });

  loadedMetalFx = MetalFx;
  metalFxListeners.forEach((onLoad) => onLoad());
}

function subscribeToMetalFx(onLoad: () => void) {
  metalFxLoad ??= loadMetalFx().catch(() => {});
  metalFxListeners.add(onLoad);
  return () => {
    metalFxListeners.delete(onLoad);
  };
}

function getMetalFxLoaded() {
  return loadedMetalFx !== null;
}

function getServerMetalFxLoaded() {
  return false;
}

function LoadedMetalFx(props: MetalFxProps) {
  const MetalFx = loadedMetalFx;
  return MetalFx && <MetalFx {...props} />;
}

function subscribeToFocus(onFocusChange: () => void) {
  document.addEventListener("focusin", onFocusChange);
  document.addEventListener("focusout", onFocusChange);
  return () => {
    document.removeEventListener("focusin", onFocusChange);
    document.removeEventListener("focusout", onFocusChange);
  };
}

function getServerFocus() {
  return false;
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQueryList = window.matchMedia(reducedMotionQuery);
  mediaQueryList.addEventListener("change", onChange);
  return () => mediaQueryList.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotion() {
  return false;
}

const themeRepaintMs = 250;

type MetalRingProps = {
  children: ReactElement;
  variant: MetalFxVariant;
};

export function MetalRing({ children, variant }: MetalRingProps) {
  const plainControlId = useId();
  const metalFxLoaded = useSyncExternalStore(
    subscribeToMetalFx,
    getMetalFxLoaded,
    getServerMetalFxLoaded,
  );
  const getPlainControlFocused = useCallback(
    () =>
      document.activeElement?.closest(
        `[data-metal-ring-plain="${plainControlId}"]`,
      ) != null,
    [plainControlId],
  );
  const plainControlFocused = useSyncExternalStore(
    subscribeToFocus,
    getPlainControlFocused,
    getServerFocus,
  );
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? "light" : "dark";
  const [themeRepaint, setThemeRepaint] = useState({ done: true, theme });
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  // A paused ring keeps showing its last frame, so after a theme change it
  // runs briefly to draw the new colors before it freezes again.
  if (themeRepaint.theme !== theme) {
    setThemeRepaint({ done: false, theme });
  }

  useEffect(() => {
    if (themeRepaint.done) {
      return;
    }

    const timeout = setTimeout(
      () => setThemeRepaint({ done: true, theme: themeRepaint.theme }),
      themeRepaintMs,
    );
    return () => clearTimeout(timeout);
  }, [themeRepaint]);

  if (!metalFxLoaded || plainControlFocused) {
    return (
      <span className="contents" data-metal-ring-plain={plainControlId}>
        {children}
      </span>
    );
  }

  return (
    <LoadedMetalFx
      paused={reducedMotion && themeRepaint.done}
      theme={theme}
      variant={variant}
    >
      {children}
    </LoadedMetalFx>
  );
}
