export default function PostLoading() {
  return (
    <div className="container mx-auto max-w-screen-lg px-8 py-16">
      <div className="mb-16 h-16 max-w-3xl animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      <div className="mb-10 flex gap-16">
        <div className="h-10 w-28 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-10 w-28 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-10 w-28 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="h-4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"
            key={index}
            style={{ width: `${90 - index * 8}%` }}
          />
        ))}
      </div>
    </div>
  );
}
