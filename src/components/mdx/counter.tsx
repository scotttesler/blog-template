"use client";

import { useState } from "react";

export function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial);

  return (
    <div className="not-prose my-8 flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="m-0 flex-1 text-sm opacity-80">
        Interactive MDX component — click to update local state.
      </p>
      <button
        className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
        onClick={() => setCount((value) => value - 1)}
        type="button"
      >
        −
      </button>
      <span className="min-w-8 text-center text-lg font-semibold tabular-nums">
        {count}
      </span>
      <button
        className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
        onClick={() => setCount((value) => value + 1)}
        type="button"
      >
        +
      </button>
    </div>
  );
}
