"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const lines = ["WEB", "DEVELOPMENT &", "DIGITAL ART"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pos = { x: 0, y: 0 };
    function applyVars() {
      section!.style.setProperty("--mx", `${pos.x}px`);
      section!.style.setProperty("--my", `${pos.y}px`);
    }
    const xTo = gsap.quickTo(pos, "x", { duration: 0.45, ease: "power3", onUpdate: applyVars });
    const yTo = gsap.quickTo(pos, "y", { duration: 0.45, ease: "power3", onUpdate: applyVars });

    function onMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    }

    section.addEventListener("mousemove", onMove);

    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      ".hero-line-front, .hero-line-back, .hero-line-texture",
      { yPercent: 115 },
      { yPercent: 0, duration: 1, stagger: 0.08, ease: "power4.out" }
    )
      .fromTo(".hero-tag", { opacity: 0, scale: 0.85, y: -8 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(2)" }, "-=0.7")
      .fromTo(".hero-sub", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");

    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-ink px-5 pt-32 pb-16 md:px-10 lg:px-14"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" } as React.CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -right-[8%] -bottom-[12%] h-[80%] w-[70%] opacity-[0.22] mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_68%)] sm:h-[90%]">
          <Image
            src="/images/projects/FallingintoEyeGFX.png"
            alt=""
            fill
            sizes="70vw"
            className="object-cover grayscale blur-[1px]"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_35%,rgba(243,241,234,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="hero-tag relative z-10 mb-2 inline-flex w-fit -rotate-2 items-center gap-2 self-start rounded-md border border-paper/25 bg-paper px-4 py-2 opacity-0 sm:mb-4">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink sm:text-sm">
          Hey, I&rsquo;m Romeo.
        </span>
      </div>

      <h1 className="relative z-10 select-none font-display uppercase leading-[1.08] text-[16vw] sm:text-[13vw] md:text-[9.4vw] lg:text-[7.8vw]">
        {lines.map((line, i) => (
          <span key={i} className="relative block overflow-hidden">
            <span className="hero-line-back block text-paper/45" aria-hidden="true">
              {line}
            </span>
            <span
              className="hero-line-front spotlight-text absolute inset-0 block text-paper"
              aria-hidden="true"
            >
              {line}
            </span>
            <span className="hero-line-texture halftone-text absolute inset-0 block" aria-hidden="true">
              {line}
            </span>
          </span>
        ))}
        <span className="sr-only">Web development &amp; digital art</span>
      </h1>

      <div className="hero-sub relative z-10 mt-8 flex flex-col gap-6 opacity-0 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-sm font-serif italic text-lg text-paper/60">
          Interfaces that hold up on the clock. Halftones and poster edits off it.
        </p>
        <div className="flex shrink-0 gap-4">
          <a
            href="#work"
            className="rounded-full bg-paper px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.14em] text-ink transition-transform hover:-translate-y-0.5"
          >
            See Projects
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-paper/40 px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:border-paper"
          >
            Get In Touch
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/40 md:flex">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-paper/30" />
      </div>
    </section>
  );
}
