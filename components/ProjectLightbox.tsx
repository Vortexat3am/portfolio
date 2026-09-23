"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { Project } from "@/lib/projects";

const IMAGE_SIZES = "(max-width: 768px) 90vw, 700px";

export default function ProjectLightbox({
  projects,
  openIndex,
  onClose,
  onNavigate,
}: {
  projects: Project[];
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (direction: 1 | -1) => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isOpen = openIndex !== null;
  const project = isOpen ? projects[openIndex] : null;

  // Keep showing the previous project's image until the next one has
  // actually loaded, instead of swapping `src` immediately and leaving a
  // blank/black frame while it fetches through the image optimizer.
  const [visibleIndex, setVisibleIndex] = useState<number | null>(openIndex);
  useEffect(() => {
    if (openIndex === null) {
      setVisibleIndex(null);
      return;
    }
    if (visibleIndex === null) {
      setVisibleIndex(openIndex);
      return;
    }
    if (openIndex === visibleIndex) return;

    const fallback = window.setTimeout(() => setVisibleIndex(openIndex), 1500);
    return () => window.clearTimeout(fallback);
  }, [openIndex, visibleIndex]);

  const visibleProject = visibleIndex !== null ? projects[visibleIndex] : null;
  const preloadProject = isOpen && openIndex !== visibleIndex ? projects[openIndex!] : null;

  useEffect(() => {
    if (!overlayRef.current || !cardRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
      );
    } else if (overlayRef.current.style.display !== "none") {
      document.body.style.overflow = "";
      gsap.to(cardRef.current, { opacity: 0, y: 16, scale: 0.97, duration: 0.25, ease: "power2.in" });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, onNavigate]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] hidden items-center justify-center p-4 sm:p-8"
      style={{ display: "none" }}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-ink/92 backdrop-blur-md" onClick={onClose} />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 bg-ink text-paper transition hover:scale-105 hover:border-paper sm:right-8 sm:top-8"
      >
        ×
      </button>

      <div
        ref={cardRef}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl border border-paper/15 bg-ink shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:flex-row md:overflow-hidden"
      >
        <div className="relative flex aspect-[4/3] w-full shrink-0 items-center justify-center bg-black/30 p-4 sm:aspect-video sm:p-8 md:aspect-auto md:h-auto md:flex-1">
          {visibleProject && (
            <Image
              key={visibleProject.id}
              src={visibleProject.image}
              alt={visibleProject.title}
              fill
              sizes={IMAGE_SIZES}
              className="object-contain"
              priority
            />
          )}
          {preloadProject && (
            <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true">
              <Image
                key={preloadProject.id}
                src={preloadProject.image}
                alt=""
                fill
                sizes={IMAGE_SIZES}
                onLoad={() => setVisibleIndex(openIndex)}
              />
            </div>
          )}
        </div>

        <div className="flex w-full shrink-0 flex-col justify-between gap-6 border-t border-paper/15 p-6 md:w-[300px] md:border-l md:border-t-0 md:p-8">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-paper/40">
              {project ? `${project.index} — ${project.category}` : ""}
            </p>
            <h3 className="mt-2 font-display text-4xl uppercase leading-[0.9] text-paper">
              {project?.title}
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-paper/60">{project?.blurb}</p>
            {project?.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink transition-transform hover:-translate-y-0.5"
              >
                Visit Live Site ↗
              </a>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-paper/15 pt-4">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              className="rounded-full border border-paper/40 px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-paper/70 transition hover:scale-105 hover:border-paper hover:text-paper"
            >
              ← Prev
            </button>
            <span className="font-sans text-xs text-paper/30">
              {isOpen ? `${(openIndex ?? 0) + 1} / ${projects.length}` : ""}
            </span>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              className="rounded-full border border-paper/40 px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-paper/70 transition hover:scale-105 hover:border-paper hover:text-paper"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
