"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";

export default function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    if (mounted.current) {
      // Route change: snap the overlay back to fully covering before the
      // browser paints the already-swapped new page, so the transition
      // never flashes the raw, uncovered content.
      gsap.set(overlay, { autoAlpha: 1 });
    }
    mounted.current = true;
    gsap.set(logo, { opacity: 0, scale: 0.85 });

    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(logo, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" })
      .to(logo, { opacity: 0, scale: 0.9, duration: 0.25, ease: "power2.in" }, "+=0.3")
      .to(overlay, { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" }, "-=0.05");

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      aria-hidden="true"
    >
      <div ref={logoRef} className="w-28 sm:w-36">
        <Image src="/images/RCLOGO.png" alt="" width={110} height={110} className="h-auto w-full" priority />
      </div>
    </div>
  );
}
