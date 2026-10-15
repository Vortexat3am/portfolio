type Direction = "right" | "left" | "up-right";

const paths: Record<Direction, string> = {
  right: "M4 12h16M14 6l6 6-6 6",
  left: "M20 12H4M10 6l-6 6 6 6",
  "up-right": "M7 17 17 7M8 7h9v9",
};

export default function ArrowIcon({
  direction = "right",
  className = "h-4 w-4",
}: {
  direction?: Direction;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <path d={paths[direction]} />
    </svg>
  );
}
