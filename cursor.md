# Project rules

## Architecture

The site is built as a single page composed of **sections**. Each major visual block on the page is its own section.

### Sections (`src/sections/`)

- One folder per section (e.g. `header/`, `hero/`, `work/`, `experience/`, `contact/`).
- Each section folder contains the section component (e.g. `header-section.tsx`, `contact-section.tsx`).
- Sections are **page-specific layout blocks**: they orchestrate content and spacing for that part of the page.
- Do not put reusable UI primitives inside `sections/`; import those from `components/`.

### Components (`src/components/`)

- Reusable UI used across one or more sections (buttons, cards, clocks, badges, mockups, etc.).
- If a piece of UI appears in more than one place, or is a clear standalone unit (e.g. `KeyboardKey`, `ProjectCard`), it belongs in `components/`.
- Client-only behavior (e.g. live clock, keyboard shortcuts) lives in client components under `components/` or thin client wrappers used by sections.

### App (`src/app/`)

- `page.tsx` only composes sections in order; no large inline markup.
- Shared styles and theme tokens live in `globals.css`.
- Site copy and constants (name, email, links) live in `src/lib/site-config.ts`.

## Styling

- Tailwind CSS utility classes; dark-first portfolio theme (black background `#0d0d0d`, white text `#ffffff`, muted text `#8f8f8f`).
- Core colors are mapped to CSS custom properties in `src/app/globals.css`:
  - `--background: #0d0d0d` (Framer Core base black)
  - `--foreground: #ffffff` (Framer Core primary white)
  - `--muted: #8f8f8f` (Framer Core secondary/muted gray)
- Use standard classes:
  - `text-white` or `text-foreground` for primary headers and high-contrast text.
  - `text-muted-text` (mapped to `var(--muted)`) for secondary paragraphs, labels, dates, and metadata.
- Match existing naming and file layout when adding new sections or components.

## Animations

- Built using **GSAP** and the `@gsap/react` standard hook (`useGSAP`).
- Keep all animations subtle, elegant, responsive, and lightweight.
- Animations should run on mount/scroll using the CSS-established styles as final targets via `gsap.from()`, which serves as a fallback to ensure full readability if JavaScript is disabled.
- Follow these best practices:
  1. Add `"use client"` at the top of components that execute GSAP animations.
  2. Use a scoped container reference (`useRef`) to avoid global selector collisions:
     ```tsx
     const containerRef = useRef<HTMLDivElement>(null);
     useGSAP(() => {
       gsap.from(".gsap-element", { opacity: 0, y: 10, stagger: 0.1 });
     }, { scope: containerRef });
     ```
  3. Avoid complex layout shifting; restrict movement to small transformations (e.g. `y: 10` to `y: 15`).

## When adding features

1. Decide if it is a new **section** (a distinct page region) or a **component** (reusable UI).
2. Add the section under `src/sections/<name>/` or the component under `src/components/`.
3. Import the section in `src/app/page.tsx` in top-to-bottom order.
