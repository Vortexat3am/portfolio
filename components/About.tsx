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
    <section id="about" ref={sectionRef} className="relative bg-paper px-5 py-24 text-ink md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <p className="about-reveal mb-6 font-sans text-base font-bold uppercase tracking-[0.3em] text-ink/40 sm:mb-8 sm:text-lg">
          About
        </p>
        <h2 className="about-reveal font-display text-[14vw] leading-[0.85] tracking-normal sm:text-[9vw] lg:text-[6vw]">
          So, Who Am I?
        </h2>
        <p className="about-reveal mt-10 font-sans text-2xl leading-relaxed text-ink/70 sm:mt-12 sm:text-3xl">
          Hi! I am Romeo Culp. Professionally speaking, I am a web developer, but truly, I have
          always simply been fascinated with technology overall. There is just so much to
          figure out about the technology that we have and then there are the newest
          technologies coming out all the time that just pique my interest.
        </p>

        <div className="mt-16 grid gap-10 border-t border-ink/15 pt-10 sm:mt-20 sm:pt-12 md:grid-cols-3 md:gap-8">
          {facts.map((fact, i) => (
            <div key={fact.title} className="about-reveal">
              <p className="font-sans text-base text-ink/35">{`0${i + 1}`}</p>
              <h3 className="mt-2 font-sans text-lg font-bold uppercase tracking-[0.2em] text-ink/40">
                {fact.title}
              </h3>
              <p className="mt-2 font-sans text-2xl text-ink/80">{fact.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
