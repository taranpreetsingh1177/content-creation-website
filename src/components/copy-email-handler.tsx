"use client";

import { useEffect } from "react";

type CopyEmailHandlerProps = {
  email: string;
};

export function CopyEmailHandler({ email }: CopyEmailHandlerProps) {
  useEffect(() => {
    // Function to copy email and trigger the global toast notification
    const triggerCopy = () => {
      if (typeof window === "undefined") return;

      try {
        void navigator.clipboard.writeText(email);
      } catch {
        // Fallback for older browsers or insecure contexts
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed"; // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
        } catch (fallbackErr) {
          console.error("Fallback copy failed", fallbackErr);
        }
        document.body.removeChild(textArea);
      }

      // Dispatch the global show-toast custom event
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message: "Email copied to clipboard" },
        })
      );
    };

    // Listen for custom event 'copy-email'
    const handleCopyEvent = () => {
      triggerCopy();
    };

    // Keyboard shortcut 'C' / 'c' listener
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "c") return;

      // Ignore if user is currently typing in an input, textarea, or contentEditable element
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }

      e.preventDefault();
      triggerCopy();
    };

    window.addEventListener("copy-email", handleCopyEvent);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("copy-email", handleCopyEvent);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [email]);

  return null;
}
