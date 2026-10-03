"use client";

import type * as MetalFxModule from "metal-fx";
import type { MetalFxVariant, PresetName, PresetTheme } from "metal-fx";
import { useTheme } from "next-themes";
import {
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type ReactElement,
} from "react";

const preset: PresetName = "chromatic";

let metalFx: typeof MetalFxModule | null = null;
let metalFxLoad: Promise<void> | undefined;
const metalFxListeners = new Set<() => void>();

async function loadMetalFx() {
  // As of metal-fx 2.0.11, a ring hides the control it wraps when the browser
  // cannot draw the ring's outline with canvas roundRect, as in Firefox 111.
  if (!("roundRect" in CanvasRenderingContext2D.prototype)) {
    return;
  }

  const metalFxModule = await import("metal-fx");

  if (!metalFxModule.isMetalFxSupported()) {
    return;
  }

  // As of metal-fx 2.0.11, unmounting the last ring disposes the shared
  // WebGL renderer, and the old context's late "context lost" event then
  // stops the next renderer, so rings that remount after a page navigation
  // never appear. An idle, detached instance keeps the renderer alive.
  metalFxModule.createInstance({
    cornerRadius: 0,
    cssHeight: 8,
    cssWidth: 8,
    hostCanvas: document.createElement("canvas"),
    kind: "pill",
    paused: true,
  });

  metalFx = metalFxModule;
  metalFxListeners.forEach((onLoad) => onLoad());
}

function startLoadingMetalFx() {
  metalFxLoad ??= loadMetalFx().catch(() => {});
}

function subscribeToMetalFx(onLoad: () => void) {
  // The rings are decoration, so their code waits for the page to load.
  if (document.readyState === "complete") {
    startLoadingMetalFx();
  } else {
    window.addEventListener("load", startLoadingMetalFx, { once: true });
  }
  metalFxListeners.add(onLoad);
  return () => {
    metalFxListeners.delete(onLoad);
  };
}

function getMetalFxLoaded() {
  return metalFx !== null;
}

function getServerMetalFxLoaded() {
  return false;
}

function LoadedMetalFx(
  props: ComponentProps<typeof MetalFxModule.MetalFx>,
) {
  const { MetalFx } = metalFx!;
  return <MetalFx {...props} />;
}

// Touch browsers fire a tap's click a moment after the finger lifts.
const pressSettleMs = 500;

// Swapping in the metal ring replaces the control's element, which would
// drop its keyboard focus or a click in progress. The plain control stays
// while it is focused or pressed.
function createPlainControlStore(plainControlId: string) {
  const findPlainControl = () =>
    document.querySelector(`[data-metal-ring-plain="${plainControlId}"]`);
  let pressed = false;
  let settleTimeout: ReturnType<typeof setTimeout> | undefined;

  return {
    getInUse: () => {
      const plainControl = findPlainControl();
      return (
        plainControl !== null &&
        (pressed || plainControl.contains(document.activeElement))
      );
    },
    subscribe: (onChange: () => void) => {
      const startPress = ({ target }: PointerEvent) => {
        if (target instanceof Node && findPlainControl()?.contains(target)) {
          clearTimeout(settleTimeout);
          pressed = true;
          onChange();
        }
      };
      const endPress = () => {
        if (!pressed) {
          return;
        }
        clearTimeout(settleTimeout);
        settleTimeout = setTimeout(() => {
          pressed = false;
          onChange();
        }, pressSettleMs);
      };

      document.addEventListener("focusin", onChange);
      document.addEventListener("focusout", onChange);
      document.addEventListener("pointerdown", startPress, true);
      document.addEventListener("pointerup", endPress, true);
      document.addEventListener("pointercancel", endPress, true);
      // Catch a press that began before these listeners were added.
      pressed = findPlainControl()?.querySelector(":active") != null;
      return () => {
        document.removeEventListener("focusin", onChange);
        document.removeEventListener("focusout", onChange);
        document.removeEventListener("pointerdown", startPress, true);
        document.removeEventListener("pointerup", endPress, true);
        document.removeEventListener("pointercancel", endPress, true);
        clearTimeout(settleTimeout);
        pressed = false;
      };
    },
  };
}

function getServerPlainControlInUse() {
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

// A paused ring would keep its last frame through a theme change, so under
// reduced motion the rings keep drawing with the shader clock stopped.
function syncSharedPreset(reducedMotion: boolean, theme: PresetTheme) {
  const { PRESETS, setSharedPreset, setSharedPresetMode } = metalFx!;
  if (reducedMotion) {
    setSharedPresetMode({ ...PRESETS[preset].modes[theme], speed: 0 });
  } else {
    setSharedPresetMode(null);
    setSharedPreset(preset, theme);
  }
}

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
  const [plainControlStore] = useState(() =>
    createPlainControlStore(plainControlId),
  );
  const plainControlInUse = useSyncExternalStore(
    plainControlStore.subscribe,
    plainControlStore.getInUse,
    getServerPlainControlInUse,
  );
  const showMetal = metalFxLoaded && !plainControlInUse;
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? "light" : "dark";
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  useEffect(() => {
    if (metalFxLoaded) {
      syncSharedPreset(reducedMotion, theme);
    }
  }, [metalFxLoaded, reducedMotion, theme]);

  if (!showMetal) {
    return (
      <span className="contents" data-metal-ring-plain={plainControlId}>
        {children}
      </span>
    );
  }

  return (
    <LoadedMetalFx
      disableGlow={reducedMotion}
      preset={preset}
      theme={theme}
      variant={variant}
    >
      {children}
    </LoadedMetalFx>
  );
}
