import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Romeo Culp",
};

export default function NotFound() {
  return (
    <main>
      <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ink px-5 pt-32 pb-16 text-center text-paper md:px-10 lg:px-14">
        <div className="relative z-10 mb-8 w-20 sm:w-24">
          <Image src="/images/RCLOGO.png" alt="Romeo Culp" width={110} height={110} className="h-auto w-full" priority />
        </div>

        <p className="relative z-10 mb-2 font-sans text-xs uppercase tracking-[0.3em] text-paper/50">
          404 — Page Not Found
        </p>
        <h1 className="relative z-10 select-none font-display uppercase leading-[0.92] text-[16vw] sm:text-[13vw] md:text-[9.4vw] lg:text-[7.8vw]">
          Nothing
          <br />
          <span className="italic font-serif normal-case text-paper/40">here.</span>
        </h1>
        <p className="relative z-10 mt-8 max-w-sm font-serif italic text-lg text-paper/60">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or moved somewhere else.
        </p>
        <Link
          href="/"
          className="relative z-10 mt-8 w-fit rounded-full bg-paper px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.14em] text-ink transition-transform hover:-translate-y-0.5"
        >
          Back To Home
        </Link>
      </section>
    </main>
  );
}
