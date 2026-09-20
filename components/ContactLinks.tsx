"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EMAIL = "romeoculp@icloud.com";

const methods = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Instagram", value: "@romeoculp", href: "#" },
  { label: "GitHub", value: "Vortexat3am", href: "https://github.com/Vortexat3am" },
];

export default function ContactLinks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-links-reveal",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-paper/10 bg-ink px-5 pb-28 pt-20 text-paper md:px-10 md:pb-32">
      <div className="mx-auto max-w-2xl">
        <p className="contact-links-reveal mb-8 font-sans text-xs font-bold uppercase tracking-[0.3em] text-paper/40">
          Find Me Elsewhere
        </p>
        <div className="contact-links-reveal flex flex-col gap-1">
          {methods.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target={m.href.startsWith("http") ? "_blank" : undefined}
              rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col border-b border-paper/15 py-5 transition-colors hover:border-paper/40 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-paper/40">
                {m.label}
              </span>
              <span className="font-display text-3xl uppercase transition-all duration-300 group-hover:italic group-hover:tracking-wide sm:text-4xl">
                {m.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
