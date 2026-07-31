const defaultPoints = [12, 28, 18, 36, 24, 42, 30];

type SimpleChartProps = {
  caption?: string;
  points?: number[];
};

export function SimpleChart({
  caption = "Weekly reads",
  points = defaultPoints,
}: SimpleChartProps) {
  const width = 360;
  const height = 140;
  const padding = 12;
  const max = Math.max(...points, 1);

  const coordinates = points.map((value, index) => {
    const x =
      padding +
      (index * (width - padding * 2)) / Math.max(points.length - 1, 1);
    const y = height - padding - (value / max) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <figure className="not-prose my-8 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <svg
        aria-label={caption}
        className="h-auto w-full"
        height={height}
        role="img"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
      >
        <polyline
          fill="none"
          points={coordinates.join(" ")}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        {coordinates.map((point, index) => {
          const [x, y] = point.split(",").map(Number);
          return (
            <circle
              cx={x}
              cy={y}
              fill="currentColor"
              key={`${point}-${index}`}
              r="4"
            />
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-sm opacity-70">
        {caption}
      </figcaption>
    </figure>
  );
}
