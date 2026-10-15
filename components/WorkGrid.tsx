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
      className="relative bg-ink px-5 pt-32 pb-24 text-paper md:px-10 md:pb-32 lg:px-14"
    >
      <div className="mx-auto max-w-6xl">
        <p className="work-reveal mb-4 font-sans text-base font-bold uppercase tracking-[0.3em] text-paper/60 sm:text-lg">
          Full Archive
        </p>
        <h1 className="work-reveal font-display text-[13vw] uppercase leading-[0.85] sm:text-[9vw] lg:text-[5.5vw]">
          All Work
        </h1>
        <p className="work-reveal mt-6 max-w-xl font-serif text-lg text-paper/60">
          Every project so far, laid out in full — a concept build, illustration, and brand identity work.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 md:mt-20">
          {projects.map((project, i) => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => setOpenIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenIndex(i);
                }
              }}
              className="work-reveal group relative block aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl border border-paper/15 bg-[#161616] outline-none focus-visible:outline-paper sm:aspect-[3/4] lg:aspect-[4/3]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                style={{ objectPosition: project.imagePosition }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/70 via-[34%] to-transparent to-[64%]"
              />
              {project.link && (
                <span className="absolute left-6 top-6 rounded bg-paper px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink lg:left-8 lg:top-8">
                  Live site
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-paper/80">
                  {project.index} — {project.category}
                </p>
                <h2 className="mt-1.5 font-display text-3xl uppercase leading-none sm:text-4xl lg:text-5xl">
                  {project.title}
                </h2>
                <p className="line-clamp-3 max-h-0 overflow-hidden font-sans text-sm leading-normal text-paper/85 opacity-0 transition-all duration-300 group-hover:mt-2.5 group-hover:max-h-[72px] group-hover:opacity-100 group-focus-visible:mt-2.5 group-focus-visible:max-h-[72px] group-focus-visible:opacity-100">
                  {project.blurb}
                </p>
              </div>
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
