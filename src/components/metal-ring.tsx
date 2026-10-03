"use client";

import type { MetalFxProps, MetalFxVariant } from "metal-fx";
import { useTheme } from "next-themes";
import {
  lazy,
  Suspense,
  useSyncExternalStore,
  type ComponentType,
  type ReactElement,
} from "react";
import { useMounted } from "@/lib/use-mounted";

function PlainControl({ children }: MetalFxProps) {
  return children;
}

const MetalFx = lazy<ComponentType<MetalFxProps>>(async () => {
  try {
    const { createInstance, isMetalFxSupported, MetalFx } =
      await import("metal-fx");

    // As of metal-fx 2.0.11, unmounting the last ring disposes the shared
    // WebGL renderer, and the old context's late "context lost" event then
    // stops the next renderer, so rings that remount after a page navigation
    // never appear. An idle, detached instance keeps the renderer alive.
    if (isMetalFxSupported()) {
      createInstance({
        cornerRadius: 0,
        cssHeight: 8,
        cssWidth: 8,
        hostCanvas: document.createElement("canvas"),
        kind: "pill",
        paused: true,
      });
    }

    return { default: MetalFx };
  } catch {
    return { default: PlainControl };
  }
});

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

type MetalRingProps = {
  children: ReactElement;
  variant: MetalFxVariant;
};

export function MetalRing({ children, variant }: MetalRingProps) {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  if (!mounted) {
    return children;
  }

  return (
    <Suspense fallback={children}>
      <MetalFx
        paused={reducedMotion}
        theme={resolvedTheme === "light" ? "light" : "dark"}
        variant={variant}
      >
        {children}
      </MetalFx>
    </Suspense>
  );
}
