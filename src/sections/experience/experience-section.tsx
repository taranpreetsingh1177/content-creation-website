"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/lib/site-config";

const COMPANY_LOGOS: Record<string, { src: string; alt: string }> = {
  okcredit: { src: "/logos/okcredit.jpeg", alt: "OkCredit" },
  angelone: { src: "/logos/angleone.png", alt: "Angel One" },
  lenskart: { src: "/logos/lenskart.jpeg", alt: "Lenskart" },
  undp: { src: "/logos/undp.png", alt: "UNDP" },
  bajaj: { src: "/logos/bajaj%20auto.png", alt: "Bajaj Auto" },
};

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { label, description, items } = siteConfig.experience;

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(".gsap-exp-header", 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
      .fromTo(".gsap-exp-description", 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.45"
      )
      .fromTo(".gsap-exp-item", 
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  const renderCompanyLogo = (logoType: string) => {
    const logo = COMPANY_LOGOS[logoType];
    if (!logo) return null;
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center overflow-hidden rounded bg-white/5 ring-1 ring-white/10">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={16}
          height={16}
          className="h-4 w-4 object-contain"
        />
      </span>
    );
  };

  return (
    <section ref={containerRef} className="max-w-[640px] mx-auto w-full px-5 pb-16 pt-12 text-left">
      {/* Header */}
      <div className="gsap-exp-header flex items-center gap-2 mb-3">
        <p className="text-base font-medium tracking-[0.25em] text-muted-text uppercase select-none">
          {label}
        </p>
      </div>

      {/* Intro Description */}
      <p className="gsap-exp-description mb-12 text-base leading-relaxed text-muted-text max-w-[480px]">
        {description}
      </p>

      {/* Timeline Items */}
      <div className="flex flex-col gap-12">
        {items.map((item, index) => (
          <div key={index} className="gsap-exp-item flex flex-col gap-2">
            <div className="text-base font-medium tracking-wider text-muted-text font-mono">
              {item.period}
            </div>

            <div className="flex flex-col items-start gap-2">
              {/* Title & Company & Badge row */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-base text-muted-text">
                <span className="font-medium text-white">{item.role}</span>
                <span className="text-muted-text">at</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-white hover:text-zinc-200 hover:underline cursor-pointer transition-colors"
                >
                  {item.company}
                  {renderCompanyLogo(item.logoType)}
                </a>
                
                {/* Badge on the right side */}
                <span className="ml-1 inline-flex items-center rounded-full border border-zinc-800/80 bg-zinc-900/50 px-2 py-0.5 text-base font-medium text-muted-text select-none">
                  {item.badge}
                </span>
              </div>

              {/* Description */}
              <p className="text-base leading-relaxed text-muted-text">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
