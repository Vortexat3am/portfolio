import type { Metadata } from "next";
import Link from "next/link";
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import ContactLinks from "@/components/ContactLinks";

export const metadata: Metadata = {
  title: "Contact — Romeo Culp",
  description: "Get in touch with Romeo Culp.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <ContactLinks />
      <footer className="flex flex-col gap-4 bg-ink px-5 pb-10 text-paper sm:flex-row sm:items-center sm:justify-between md:px-10">
        <Link
          href="/"
          data-cursor="link"
          className="font-sans text-xs uppercase tracking-[0.2em] text-paper/50 transition-colors hover:text-paper"
        >
          ← Back to home
        </Link>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-paper/40">
          © {new Date().getFullYear()} Romeo Culp
        </p>
      </footer>
    </main>
  );
}
