type DotGridBackgroundProps = {
  className?: string;
  children: React.ReactNode;
};

export function DotGridBackground({
  className = "",
  children,
}: DotGridBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 dot-grid-mask"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}
