"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(panelRef.current, { display: "flex" });
      gsap.fromTo(
        panelRef.current,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.6, ease: "power4.inOut" }
      );
      gsap.fromTo(
        panelRef.current.querySelectorAll(".menu-link"),
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.2, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(panelRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => gsap.set(panelRef.current, { display: "none" }),
      });
    }
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between p-4 md:p-6 pointer-events-none">
        <Link
          href="/"
          aria-label="Romeo Culp — home"
          onClick={() => setOpen(false)}
          className="pointer-events-auto transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-3deg]"
        >
          <Image
            src="/images/RCLOGO.png"
            alt="Romeo Culp emblem"
            width={110}
            height={110}
            className="w-16 sm:w-20 md:w-24 h-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            priority
          />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-paper/25 bg-ink/60 backdrop-blur px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:border-paper/60"
        >
          {open ? "Close" : "Menu"}
          <span className="relative flex h-3 w-4 flex-col justify-between">
            <span
              className={`h-[1.5px] w-full bg-paper transition-transform duration-300 ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-full bg-paper transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-[1.5px] w-full bg-paper transition-transform duration-300 ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </header>

      <div
        ref={panelRef}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center gap-6 bg-ink text-paper"
        style={{ display: "none" }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="menu-link font-display text-5xl sm:text-6xl uppercase tracking-tight hover:italic hover:text-bone transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <span className="mt-8 font-serif italic text-paper/40">romeoculp@icloud.com</span>
      </div>
    </>
  );
}
