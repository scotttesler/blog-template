"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <div className="mx-auto max-w-lg px-8 py-24 text-center">
          <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
          <p className="mb-2 opacity-70">
            A critical error occurred in the application shell.
          </p>
          {error.digest ? (
            <p className="mb-8 font-mono text-xs opacity-50">
              Digest: {error.digest}
            </p>
          ) : (
            <div className="mb-8" />
          )}
          <button
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
            onClick={reset}
            type="button"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
