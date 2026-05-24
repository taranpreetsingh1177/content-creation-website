"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { KeyboardKey } from "@/components/keyboard-key";
import { VerifiedBadge } from "@/components/verified-badge";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Staggered premium slide-up and fade-in for Hero components
      const tl = gsap.timeline();
      tl.fromTo(".gsap-hero-avatar", 
        { scale: 0.9, y: 15, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      )
      .fromTo(".gsap-hero-name", 
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(".gsap-hero-title", 
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.35"
      )
      .fromTo(".gsap-hero-bio", 
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(".gsap-hero-tip", 
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="flex flex-col items-start pb-12 pt-4 text-left w-full">
      <div className="flex flex-col items-start gap-4 mb-6">
        <div className="gsap-hero-avatar overflow-hidden rounded-2xl p-0.5 bg-zinc-900/50 flex-shrink-0 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_20px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.03]">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
            alt={`${siteConfig.name} profile`}
            width={56}
            height={56}
            className="h-14 w-14 rounded-[14px] object-cover"
            priority
          />
        </div>

        <div className="flex flex-col items-start text-left">
          <div className="gsap-hero-name flex items-center gap-1.5 mb-0.5">
            <h1 className="text-base font-medium tracking-tight text-white">
              {siteConfig.name}
            </h1>
            <VerifiedBadge />
          </div>
          <p className="gsap-hero-title text-base font-normal text-muted-text tracking-wide font-mono select-none">
            {siteConfig.title}
          </p>
        </div>
      </div>

      <p className="gsap-hero-bio w-full text-base leading-relaxed text-muted-text font-normal">
        {siteConfig.bio.intro}{" "}
        <span className="inline-flex items-center gap-1 font-medium text-white hover:underline cursor-pointer">
          {siteConfig.bio.company}
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded bg-[#84cc16] text-[0.55rem] font-bold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] select-none">
            W
          </span>
        </span>{" "}
        based in{" "}
        <span className="text-white hover:underline cursor-pointer">
          {siteConfig.bio.location}
        </span>{" "}
        <span role="img" aria-label="Portugal flag" className="text-base select-none">
          🇵🇹
        </span>{" "}
        {siteConfig.bio.specialty}
      </p>

      <div className="gsap-hero-tip mt-8 flex items-center justify-center w-full">
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent("copy-email"));
          }}
          className="group flex items-center gap-1.5 md:gap-2 px-4 py-2 rounded-full border border-zinc-900 bg-zinc-950/20 backdrop-blur-sm text-sm text-muted-text hover:text-white hover:bg-zinc-900/45 hover:border-zinc-800 active:scale-[0.98] transition-all duration-300 cursor-pointer font-mono shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] outline-none focus:ring-1 focus:ring-zinc-700/50"
          title="Click to copy email, or press C on your keyboard"
          aria-label="Copy email address"
        >
          <span>Press</span>
          <KeyboardKey className="hidden md:inline-flex group-hover:bg-[#2c2c2c] group-hover:text-white transition-all duration-300">
            C
          </KeyboardKey>
          <span>to copy my email</span>
        </button>
      </div>
    </section>
  );
}
