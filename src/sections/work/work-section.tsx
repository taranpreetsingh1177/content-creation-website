"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DotGridBackground } from "@/components/dot-grid-background";
import { ProjectCard } from "@/components/project-card";
import { siteConfig } from "@/lib/site-config";

type Project = {
  title: string;
  description: string;
  imageUrl: string;
  isLight?: boolean;
  className?: string;
};

const projectCards: Project[] = [
  {
    title: "Analytica Dashboard",
    description: "A gorgeous dark-mode SaaS analytics interface with customizable charts, funnel mapping, and user retention tracking.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    isLight: false,
    className: "md:left-[0%] md:top-[5rem] lg:top-[6rem] md:-rotate-[6deg]",
  },
  {
    title: "Creative Canvas",
    description: "An infinite visual layout editor for real-time prototyping, responsive wireframing, and interactive design tokens.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    isLight: false,
    className: "md:left-[25%] md:top-[1rem] lg:top-[1.5rem] md:rotate-[4deg]",
  },
  {
    title: "Vault Invoicing",
    description: "A clean, modern light-mode invoicing portal supporting multi-currency billing, recurring fees, and instant payouts.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    isLight: true,
    className: "md:left-[50%] md:top-[6rem] lg:top-[7rem] md:-rotate-[3deg]",
  },
  {
    title: "Linear issue tracker",
    description: "Keyboard-first software task tracker featuring sub-millisecond filtering, offline support, and backlog timelines.",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    isLight: false,
    className: "md:left-[75%] md:top-[2rem] lg:top-[2.5rem] md:rotate-[5deg]",
  },
];

export function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      // Gentle fade-in for the header and description
      tl.from(".gsap-work-header", {
        opacity: 0,
        y: 10,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      })
      // Staggered, smooth entrance for project cards
      .from(".gsap-work-card", {
        opacity: 0,
        scale: 0.92,
        y: 25,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.2)",
        clearProps: "all", // Clears transforms and opacity inline styles to let hover transitions take over!
      }, "-=0.3");
    },
    { scope: containerRef }
  );

  // Animates the opening of the lightbox modal
  useGSAP(
    () => {
      if (!activeProject) return;

      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        modalContentRef.current,
        { opacity: 0, scale: 0.92, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.05 }
      );
    },
    { dependencies: [activeProject] }
  );

  const handleClose = () => {
    if (!modalRef.current || !modalContentRef.current) {
      setActiveProject(null);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProject(null);
      },
    });

    tl.to(modalContentRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
    });

    tl.to(modalRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    }, "-=0.2");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (activeProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <section ref={containerRef} className="w-full border-y border-zinc-900/60 bg-[#121212]/50 text-left relative overflow-hidden">
      {/* Header Container (outside dotted area, left-aligned) */}
      <div className="max-w-[640px] mx-auto w-full px-5 pt-8 pb-4">
        <div className="gsap-work-header flex items-center gap-2 mb-3">
          <p className="text-base font-medium tracking-[0.25em] text-muted-text uppercase select-none font-mono">
            {siteConfig.work.label}
          </p>
        </div>
        <p className="gsap-work-header mb-6 text-base leading-relaxed text-muted-text max-w-[480px]">
          {siteConfig.work.description}
        </p>
      </div>

      <DotGridBackground className="w-full pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="mx-auto flex w-full max-w-[640px] md:max-w-[1000px] lg:max-w-[1100px] xl:max-w-[1200px] flex-col px-5">
          {/* Cards container: stacks vertically on mobile, scatters horizontally on desktop */}
          <div className="flex flex-col gap-10 items-center w-full max-w-[420px] mx-auto md:block md:relative md:h-[21rem] lg:h-[23rem] xl:h-[25rem] md:max-w-none md:mx-0">
            {projectCards.map((card) => (
              <ProjectCard
                key={card.title}
                title={card.title}
                description={card.description}
                imageUrl={card.imageUrl}
                isLight={card.isLight}
                className={`${card.className} gsap-work-card`}
                onClick={() => setActiveProject(card)}
              />
            ))}
          </div>
        </div>
      </DotGridBackground>

      {/* Fullscreen Lightbox Modal */}
      {activeProject && (
        <div
          ref={modalRef}
          onClick={handleClose}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-10 cursor-pointer animate-fade-in"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 h-10 w-10 rounded-full bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-105 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-700 z-[110]"
            aria-label="Close lightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Modal Content container */}
          <div
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center max-w-4xl w-full gap-6 select-none cursor-default"
          >
            {/* Image container */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950/50 shadow-2xl">
              <Image
                src={activeProject.imageUrl}
                alt={activeProject.title}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
            {/* Caption text */}
            <div className="w-full text-center px-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
                {activeProject.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                {activeProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
