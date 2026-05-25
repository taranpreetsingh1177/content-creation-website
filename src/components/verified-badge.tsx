export function VerifiedBadge() {
  return (
    <span
      className="inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#1d9bf0] select-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
      aria-label="Verified"
      role="img"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-2.5 w-2.5"
        aria-hidden
      >
        <path
          d="M5 12.5L9.5 17 19 7.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
