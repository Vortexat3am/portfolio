"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-line",
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.08, ease: "power4.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.7, ease: "power3.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-[65svh] w-full flex-col justify-center overflow-hidden bg-ink px-5 pt-32 pb-16 text-paper md:px-10">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.4] mix-blend-screen [mask-image:linear-gradient(to_right,transparent_0%,transparent_25%,black_55%)]">
          <Image
            src="/images/projects/DragonBallGFX.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-right grayscale blur-[1px]"
          />
        </div>
      </div>

      <p className="contact-reveal relative mb-4 font-sans text-xs uppercase tracking-[0.3em] text-paper/50 opacity-0">
        Say Hello
      </p>

      <div ref={headlineRef} className="relative overflow-hidden">
        <h1 className="font-display uppercase leading-[0.92] text-[16vw] sm:text-[13vw] lg:text-[9vw]">
          <span className="contact-line block overflow-hidden">
            <span className="block">Let's</span>
          </span>
          <span className="contact-line block overflow-hidden">
            <span className="block italic font-serif normal-case text-paper/40 [transform:translateY(-0.12em)]">make</span>
          </span>
          <span className="contact-line block overflow-hidden">
            <span className="block">something.</span>
          </span>
        </h1>
      </div>

      <p className="contact-reveal mt-8 max-w-lg font-serif text-lg text-paper/60 opacity-0">
        Got a project, a collab, or just want to talk shop? Drop the details below.
      </p>
    </section>
  );
}
