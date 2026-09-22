"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

type Status = "idle" | "sending" | "success" | "error" | "blocked";

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-form-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio inquiry from ${name || "a visitor"}`,
          name,
          email,
          message,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      // A network-level failure here (as opposed to the API responding
      // with an error) almost always means something on the visitor's
      // end — most commonly an ad blocker or privacy extension — kept
      // the request from ever reaching Web3Forms.
      setStatus("blocked");
    }
  }

  return (
    <section ref={sectionRef} className="bg-paper px-5 py-28 text-ink md:px-10 md:py-36">
      <div className="mx-auto max-w-2xl">
        <p className="contact-form-reveal mb-6 font-sans text-xs font-bold uppercase tracking-[0.3em] text-ink/40">
          Get In Touch
        </p>
        <h2 className="contact-form-reveal font-display text-[11vw] uppercase leading-[0.95] sm:text-[6vw]">
          Send A Message
        </h2>
        <p className="contact-form-reveal mt-8 max-w-md font-serif text-lg text-ink/60">
          Fill this out and it comes straight to my inbox.
        </p>

        {status === "success" ? (
          <div className="contact-form-reveal mt-14 border-t border-ink/15 pt-8">
            <p className="font-display text-3xl uppercase">Got it.</p>
            <p className="mt-3 max-w-sm font-serif text-ink/60">
              Thanks for reaching out — I'll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink/50 underline underline-offset-4 transition-colors hover:text-ink"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form-reveal mt-14 flex flex-col gap-8">
            <label className="flex flex-col gap-2">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink/40">
                Name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="border-b border-ink/20 bg-transparent py-3 font-sans text-lg text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-ink"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink/40">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="border-b border-ink/20 bg-transparent py-3 font-sans text-lg text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-ink"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink/40">
                Message
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="What's on your mind?"
                className="resize-none border-b border-ink/20 bg-transparent py-3 font-sans text-lg text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-ink"
              />
            </label>

            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            <div className="flex items-center gap-5">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-fit rounded-full bg-ink px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.14em] text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "error" && (
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-red-700">
                  Something went wrong — try again?
                </p>
              )}
              {status === "blocked" && (
                <p className="max-w-[220px] font-sans text-xs uppercase tracking-[0.15em] text-red-700">
                  Request blocked — try disabling your ad blocker, or email me directly below.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
