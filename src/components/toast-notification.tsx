"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ToastState {
  message: string;
  id: number;
}

interface ShowToastEventDetail {
  message: string;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function ToastNotification() {
  const containerRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Keep track of the last non-empty message to avoid empty text when toast is null
  const lastMessageRef = useRef("");
  if (toast) {
    lastMessageRef.current = toast.message;
  }
  const messageToDisplay = toast ? toast.message : lastMessageRef.current;

  // Set up the GSAP animation inside the useGSAP hook.
  // Re-run the timeline whenever a new toast event is received.
  useGSAP(
    () => {
      if (!toast) return;

      // Initialize/reset the toast element to hidden and positioned slightly down
      gsap.set(toastRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.95,
        pointerEvents: "none",
      });

      // Build the timeline for showing, holding, and hiding the toast
      const tl = gsap.timeline();

      tl.to(toastRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power3.out",
      })
        // Hold state for 2.5 seconds
        .to({}, { duration: 2.5 })
        // Fade and slide out gracefully
        .to(toastRef.current, {
          opacity: 0,
          y: 12,
          scale: 0.95,
          pointerEvents: "none",
          duration: 0.35,
          ease: "power3.in",
          onComplete: () => {
            setToast(null);
          },
        });
    },
    {
      dependencies: [toast],
      scope: containerRef,
      revertOnUpdate: true,
    }
  );

  useEffect(() => {
    const handleShowToast = (e: Event) => {
      const customEvent = e as CustomEvent<ShowToastEventDetail>;
      if (customEvent.detail && typeof customEvent.detail.message === "string") {
        setToast({
          message: customEvent.detail.message,
          id: Date.now(),
        });
      }
    };

    window.addEventListener("show-toast", handleShowToast as EventListener);
    return () => {
      window.removeEventListener("show-toast", handleShowToast as EventListener);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      {/* Toast Notification Container */}
      <div
        ref={toastRef}
        style={{ opacity: 0 }} // Prevent visual flash before GSAP sets initial states
        className="flex items-center gap-3 px-5 py-3 rounded-full border border-zinc-800/60 bg-zinc-950/85 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)] pointer-events-none select-none transition-shadow duration-300"
      >
        {/* Subtle, premium zinc indicator dot */}
        <div className="h-1.5 w-1.5 rounded-full bg-zinc-500 flex-shrink-0" />

        {/* Success text */}
        <span className="text-[13px] font-mono tracking-tight text-zinc-300 font-medium whitespace-nowrap">
          {messageToDisplay}
        </span>
      </div>
    </div>
  );
}
