export default function Loading() {
  return (
    <div className="container mx-auto max-w-screen-lg px-8 py-24">
      <div className="mx-auto mb-16 h-12 max-w-lg animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      <div className="grid gap-16 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="space-y-4" key={index}>
            <div className="aspect-[3/2] animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            <div className="mx-auto h-5 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mx-auto h-4 w-1/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
