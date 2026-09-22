"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { projects } from "@/lib/projects";
import ProjectLightbox from "@/components/ProjectLightbox";

export default function ProjectsList() {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  function moveHandlers() {
    if (!previewRef.current) return null;
    return {
      xTo: gsap.quickTo(previewRef.current, "x", { duration: 0.55, ease: "power3" }),
      yTo: gsap.quickTo(previewRef.current, "y", { duration: 0.55, ease: "power3" }),
    };
  }
  const quick = useRef<ReturnType<typeof moveHandlers>>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (!active) return;
    pos.current = { x: e.clientX, y: e.clientY };
    if (!quick.current) quick.current = moveHandlers();
    quick.current?.xTo(e.clientX);
    quick.current?.yTo(e.clientY);
  }

  function handleEnter(id: string, x: number, y: number) {
    pos.current = { x, y };
    setActive(id);
  }

  function handleLeave() {
    setActive(null);
    quick.current = null;
  }

  // The preview card is only ever in the DOM while a project is active — no
  // opacity/scale animation is relied on to hide it, so it can't get stuck
  // half-visible if a tween is ever interrupted.
  useEffect(() => {
    if (active && previewRef.current) {
      gsap.set(previewRef.current, { x: pos.current.x, y: pos.current.y });
    }
  }, [active]);

  useEffect(() => {
    function hideOnScroll() {
      setActive(null);
      quick.current = null;
    }
    window.addEventListener("scroll", hideOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", hideOnScroll);
  }, []);

  // Warm the hover-preview image cache, but only once the browser is
  // actually idle — deferring this keeps it from competing with anything
  // time-sensitive right after page load, like an immediate nav click.
  const [warmThumbs, setWarmThumbs] = useState(false);
  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setWarmThumbs(true));
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setWarmThumbs(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  const activeProject = projects.find((p) => p.id === active) ?? null;

  function handleNavigate(direction: 1 | -1) {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + direction + projects.length) % projects.length;
    });
  }

  return (
    <section id="work" className="relative bg-ink px-5 py-24 md:px-10 md:py-32">
      <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-paper/40">
            Selected Work
          </p>
          <h2 className="font-display text-[13vw] uppercase leading-[0.85] text-paper sm:text-[9vw] lg:text-[5.5vw]">
            Projects
          </h2>
        </div>
        <p className="max-w-xs font-serif text-paper/50">
          Six pieces — a live concept build and a run of photo-edited chaos. Click a title to dive in.
        </p>
      </div>

      <div
        ref={listRef}
        onMouseMove={handleMouseMove}
        className="border-t border-paper/15"
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            role="button"
            tabIndex={0}
            onMouseEnter={(e) => handleEnter(project.id, e.clientX, e.clientY)}
            onMouseLeave={handleLeave}
            onFocus={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              handleEnter(project.id, r.left + 60, r.top + r.height / 2);
            }}
            onBlur={handleLeave}
            onClick={() => setOpenIndex(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setOpenIndex(i);
            }}
            className="group flex cursor-pointer flex-col gap-4 border-b border-paper/15 py-6 outline-none transition-colors md:flex-row md:items-center md:gap-8 md:py-8 hover:bg-paper/[0.03] focus-visible:bg-paper/[0.03]"
          >
            <span className="font-sans text-sm text-paper/35 md:w-12">{project.index}</span>

            <div className="block h-40 w-full overflow-hidden rounded-lg border border-paper/10 md:hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="font-display text-4xl uppercase text-paper transition-all duration-300 group-hover:italic group-hover:tracking-wide sm:text-5xl md:flex-1 md:text-6xl">
              {project.title}
            </span>

            <span className="font-sans text-xs uppercase tracking-[0.2em] text-paper/40 md:text-right">
              {project.category}
            </span>
          </div>
        ))}
      </div>

      {/* Warms every thumbnail at the exact size/URL the hover preview below
          uses, so the browser already has it cached before it's ever hovered —
          without this, the first hover on any not-yet-loaded project shows a
          blank box while the lazy-loaded image fetches. Deferred to idle time
          (see warmThumbs above) so it never competes with page load or an
          immediate nav click, and `loading="eager"` (not `priority`) keeps it
          off the high-priority fetch queue those clicks need. */}
      {warmThumbs && (
        <div className="sr-only" aria-hidden="true">
          {projects.map((p) => (
            <Image key={p.id} src={p.image} alt="" width={520} height={640} sizes="260px" loading="eager" />
          ))}
        </div>
      )}

      {activeProject && (
        <div
          ref={previewRef}
          className={`pointer-events-none fixed left-0 top-0 z-30 hidden w-[260px] -translate-x-1/2 -translate-y-1/2 md:block ${activeProject.rotate}`}
        >
          <div className="overflow-hidden rounded-xl border border-paper/20 bg-ink shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <Image
              src={activeProject.image}
              alt={activeProject.title}
              width={520}
              height={640}
              sizes="260px"
              loading="eager"
              className="h-[320px] w-full object-cover"
            />
          </div>
        </div>
      )}

      <ProjectLightbox
        projects={projects}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={handleNavigate}
      />
    </section>
  );
}
