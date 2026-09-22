"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const facts = [
  {
    title: "Focus",
    body: "Front-end engineering paired with photo editing and poster work.",
  },
  {
    title: "Approach",
    body: "Clean, considered code on one side. Bold, graphic edits on the other.",
  },
  {
    title: "Currently",
    body: "Open to freelance work, collabs, and new projects.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative bg-paper pl-[clamp(2.5rem,6vw,12rem)] pr-5 py-24 text-ink md:pr-6 md:py-32 lg:pr-8">
      <div className="grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10">
        <div>
          <p className="about-reveal mb-6 font-sans text-sm font-bold uppercase tracking-[0.3em] text-ink/40 sm:mb-8 sm:text-base">
            About
          </p>
          <h2 className="about-reveal font-display text-[13vw] leading-[0.85] tracking-normal sm:text-[8vw] lg:text-[5vw]">
            So, Who Am I?
          </h2>
          <p className="about-reveal mt-12 max-w-2xl text-justify font-serif text-xl leading-relaxed text-ink/70 sm:mt-16 sm:text-2xl">
            Hi! I am Romeo Culp. Professionally speaking, I am a web developer, but truly, I have
            always simply been fascinated with technology overall. There is just so much to
            figure out about the technology that we have and then there are the newest
            technologies coming out all the time that just pique my interest.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:mt-32">
          {facts.map((fact) => (
            <div key={fact.title} className="about-reveal border-t border-ink/15 pt-4">
              <h3 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-ink/40">
                {fact.title}
              </h3>
              <p className="mt-2 font-sans text-lg text-ink/80">{fact.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
