"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto max-w-screen-lg px-8 py-24 text-center">
      <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
      <p className="mb-8 opacity-70">
        An unexpected error occurred while loading this page.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
          onClick={reset}
          type="button"
        >
          Try again
        </button>
        <Link className="underline" href="/">
          Back home
        </Link>
      </div>
    </div>
  );
}
