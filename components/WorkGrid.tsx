"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";
import ProjectLightbox from "@/components/ProjectLightbox";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WorkGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function handleNavigate(direction: 1 | -1) {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + direction + projects.length) % projects.length;
    });
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink px-5 pt-32 pb-24 text-paper md:px-10 md:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="work-reveal mb-3 font-sans text-xs uppercase tracking-[0.3em] text-paper/60">
          Full Archive
        </p>
        <h1 className="work-reveal font-display text-[13vw] uppercase leading-[0.85] sm:text-[9vw] lg:text-[5.5vw]">
          All Work
        </h1>
        <p className="work-reveal mt-6 max-w-xl font-serif text-lg text-paper/60">
          Every project so far, laid out in full — concept builds, fan art, and brand explorations. Click any piece to dive in.
        </p>

        <div className="mt-16 grid gap-16 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-20 md:mt-20">
          {projects.map((project, i) => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => setOpenIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setOpenIndex(i);
              }}
              className="work-reveal group cursor-pointer outline-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-paper/10 bg-paper/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-paper/60">
                    {project.index} — {project.category}
                  </p>
                  <h2 className="mt-1 font-display text-3xl uppercase leading-none transition-all duration-300 group-hover:italic sm:text-4xl">
                    {project.title}
                  </h2>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 font-sans text-sm text-paper/60 transition group-hover:translate-x-1 group-hover:text-paper"
                >
                  →
                </span>
              </div>
              <p className="mt-3 max-w-md font-serif text-sm leading-relaxed text-paper/60 sm:text-base">
                {project.blurb}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ProjectLightbox
        projects={projects}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={handleNavigate}
      />
    </section>
  );
}
