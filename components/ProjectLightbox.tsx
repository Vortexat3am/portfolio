"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Project } from "@/lib/projects";

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
        className="fixed right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 bg-ink text-paper transition-colors hover:border-paper sm:right-8 sm:top-8"
      >
        ×
      </button>

      <div
        ref={cardRef}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-paper/15 bg-ink shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:flex-row"
      >
        <div className="relative flex h-[45vh] w-full flex-1 items-center justify-center bg-black/30 p-4 sm:p-8 md:h-auto">
          {project && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 90vw, 700px"
              className="object-contain"
              priority
            />
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
            <p className="mt-4 font-serif italic text-paper/60">{project?.blurb}</p>
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
              className="font-sans text-xs uppercase tracking-[0.2em] text-paper/50 transition-colors hover:text-paper"
            >
              ← Prev
            </button>
            <span className="font-sans text-xs text-paper/30">
              {isOpen ? `${(openIndex ?? 0) + 1} / ${projects.length}` : ""}
            </span>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              className="font-sans text-xs uppercase tracking-[0.2em] text-paper/50 transition-colors hover:text-paper"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
