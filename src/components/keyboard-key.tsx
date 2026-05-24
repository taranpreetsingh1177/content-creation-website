type KeyboardKeyProps = {
  children: React.ReactNode;
  className?: string;
};

export function KeyboardKey({ children, className = "" }: KeyboardKeyProps) {
  return (
    <kbd
      className={`inline-flex min-w-[1.6rem] h-6 items-center justify-center rounded-[5px] bg-[#1c1c1c] px-2 font-mono text-base font-medium text-muted-text shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_1px_1px_rgba(0,0,0,0.3)] border-none select-none transition-colors duration-200 hover:text-white ${className}`}
    >
      {children}
    </kbd>
  );
}
