"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { label, description, socials } = siteConfig.contact;

  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(".gsap-contact-header", 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
      .fromTo(".gsap-contact-description", 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.45"
      )
      .fromTo(".gsap-contact-input", 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(".gsap-contact-btn-row", 
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(".gsap-contact-social-link", 
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        "-=0.35"
      );
    },
    { scope: containerRef }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showToast = (message: string) => {
    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: { message },
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        showToast(data.error ?? "Failed to send message. Please try again.");
        return;
      }

      showToast("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      showToast("Failed to send message. Please try again.");
    } finally {
      setFormState("idle");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // If user presses Enter (without Shift) in any field, submit form
    if (e.key === "Enter" && !e.shiftKey) {
      if (e.currentTarget.tagName === "TEXTAREA" && e.shiftKey) {
        // allow newline in textarea with shift key
        return;
      }
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <section ref={containerRef} className="max-w-[640px] mx-auto w-full px-5 pb-24 pt-12 text-left relative z-10">
      {/* Header */}
      <div className="gsap-contact-header flex items-center gap-2 mb-3">
        <p className="text-base font-medium tracking-[0.25em] text-muted-text uppercase select-none font-mono">
          {label}
        </p>
      </div>

      {/* Intro Description */}
      <p className="gsap-contact-description mb-8 text-base leading-relaxed text-muted-text max-w-[480px]">
        {description}
      </p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Name input */}
          <div className="gsap-contact-input relative">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Name"
              disabled={formState === "submitting"}
              className="w-full bg-[#121212]/40 border border-zinc-800/80 rounded-lg px-3 py-2 text-base text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition-all duration-200 disabled:opacity-50"
            />
          </div>

          {/* Email input */}
          <div className="gsap-contact-input relative">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Email"
              disabled={formState === "submitting"}
              className="w-full bg-[#121212]/40 border border-zinc-800/80 rounded-lg px-3 py-2 text-base text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition-all duration-200 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Message input */}
        <div className="gsap-contact-input relative">
          <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Message"
            disabled={formState === "submitting"}
            className="w-full bg-[#121212]/40 border border-zinc-800/80 rounded-lg px-3 py-2 text-base text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 transition-all duration-200 disabled:opacity-50 resize-none"
          />
        </div>

        {/* Action Row */}
        <div className="gsap-contact-btn-row flex items-center justify-start mt-1">
          <button
            type="submit"
            disabled={formState === "submitting"}
            className="flex items-center justify-center gap-2 px-5 py-2 text-base font-medium text-white bg-[#1c1c1c] rounded-full border border-zinc-800/50 hover:bg-zinc-800/80 active:scale-[0.98] transition-all duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {formState === "submitting" && (
              <svg className="animate-spin h-4 w-4 text-white shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span>Send message</span>
          </button>
        </div>
      </form>

      {/* Social Links List */}
      <div className="flex flex-col gap-2 mt-8">
        {socials.map((social) => (
          <a
            key={social.platform}
            href={social.href}
            target={social.platform === "Email" ? undefined : "_blank"}
            rel={social.platform === "Email" ? undefined : "noopener noreferrer"}
            className="gsap-contact-social-link group flex items-center justify-between py-2.5 px-3 rounded-lg bg-zinc-900/10 border border-transparent hover:bg-zinc-900/40 hover:border-zinc-800/40 hover:shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-all duration-200"
          >
            <span className="text-base text-muted-text group-hover:text-zinc-200 transition-colors">
              {social.platform}
            </span>
            <div className="flex items-center gap-1 text-base text-muted-text group-hover:text-zinc-300 transition-colors font-mono">
              <span>{social.handle}</span>
              <span className="text-muted-text group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ease-out">
                ↗
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer credit */}
      <footer className="mt-24 pt-8 border-t border-zinc-900/40 text-center text-base text-muted-text font-mono select-none">
        Made with ❤️ using <span className="text-zinc-200 font-medium">Cursor</span>
      </footer>
    </section>
  );
}
