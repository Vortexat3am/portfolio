import type { Metadata } from "next";
import Link from "next/link";
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import ContactLinks from "@/components/ContactLinks";
import ArrowIcon from "@/components/ArrowIcon";

export const metadata: Metadata = {
  title: "Contact — Romeo Culp",
  description: "Get in touch with Romeo Culp.",
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <ContactLinks />
      <footer className="bg-ink px-5 pb-10 text-paper md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            data-cursor="link"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-paper/50 transition-colors hover:text-paper"
          >
            <ArrowIcon direction="left" />
            Back to home
          </Link>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-paper/60">
            © {new Date().getFullYear()} Romeo Culp
          </p>
        </div>
      </footer>
    </main>
  );
}
