import Link from "next/link";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "GitHub", href: "https://github.com/Vortexat3am" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink px-5 pb-8 pt-24 text-paper md:px-10 md:pt-32">
      <div className="flex flex-col items-start justify-between gap-10 border-b border-paper/15 pb-16 md:flex-row md:items-end">
        <h2 className="font-display text-[14vw] uppercase leading-[1.05] tracking-wider sm:text-[10vw] lg:text-[6.5vw]">
          Let's build
          <br />
          something bold.
        </h2>
        <Link
          href="/contact"
          className="shrink-0 rounded-full bg-paper px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.14em] text-ink transition-transform hover:-translate-y-1"
        >
          Get In Touch
        </Link>
      </div>

      <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-paper/40">
          © {new Date().getFullYear()} Romeo Culp
        </p>
        <div className="flex gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-sans text-xs uppercase tracking-[0.2em] text-paper/50 transition-colors hover:text-paper"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
