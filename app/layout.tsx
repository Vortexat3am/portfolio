import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Anton, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Noise from "@/components/Noise";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE_URL } from "@/lib/site";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const TITLE = "Romeo Culp — Web Developer & Front-End Engineer Portfolio";
const DESCRIPTION =
  "Portfolio of Romeo Culp, a web developer and front-end engineer building clean interfaces with React and Next.js — plus photo edits, posters, and brand work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Romeo Culp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Romeo Culp",
  url: SITE_URL,
  jobTitle: "Web Developer",
  description: DESCRIPTION,
  sameAs: ["https://github.com/Vortexat3am"],
  knowsAbout: ["Web Development", "Front-End Engineering", "React", "Next.js", "UI/UX", "Digital Art"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${atkinson.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <PageTransition />
        <SmoothScroll>
          <Noise />
          <Nav />
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
