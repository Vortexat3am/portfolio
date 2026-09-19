"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const items = [
  "BRAND IDENTITY",
  "REACT",
  "NEXT.JS",
  "TAILWIND",
  "POSTER CREATION & DESIGN",
  "UI / UX",
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!track || !copy) return;

    let tween: gsap.core.Tween | undefined;

    function measure() {
      const width = copy!.getBoundingClientRect().width;
      if (!width) return;

      // Always render enough copies to cover at least two full viewport
      // widths, so there is never a stretch of empty track between the
      // scrolling copies — the classic cause of a visible "gap" in a
      // duplicated-content marquee on wide screens.
      const needed = Math.max(2, Math.ceil((window.innerWidth * 2) / width));
      setCopies((prev) => (prev === needed ? prev : needed));

      tween?.kill();
      gsap.set(track!, { x: 0 });
      tween = gsap.to(track, {
        x: -width,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    return () => {
      tween?.kill();
      window.removeEventListener("resize", measure);
    };
  }, [copies]);

  const content = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-display text-3xl uppercase text-paper sm:text-4xl md:text-5xl">
            {item}
          </span>
          <span className="font-serif text-2xl italic text-paper/30">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden border-y border-paper/15 bg-ink py-6">
      <div ref={trackRef} className="marquee-track">
        {Array.from({ length: copies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? copyRef : undefined}
            className="flex items-center"
            aria-hidden={i !== 0}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}
