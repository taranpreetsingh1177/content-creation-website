import { LiveClock } from "@/components/live-clock";
import { siteConfig } from "@/lib/site-config";

export function HeaderSection() {
  return (
    <header className="flex w-full items-center justify-between pt-2 pb-6 sm:pt-3 sm:pb-8">
      <div className="flex items-center gap-2">
        <span className="text-base font-medium tracking-[0.25em] text-muted-text uppercase select-none font-mono">
          {siteConfig.established}
        </span>
      </div>
      <LiveClock />
    </header>
  );
}
