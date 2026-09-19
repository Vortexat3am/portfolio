import type { Metadata } from "next";
import { Anton, Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Noise from "@/components/Noise";
import SmoothScroll from "@/components/SmoothScroll";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  variable: "--font-serif",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Romeo Culp — Web Developer & Digital Artist",
  description:
    "Portfolio of Romeo Culp — web developer and digital artist. Front-end builds, photo edits, posters, and brand work.",
  openGraph: {
    title: "Romeo Culp — Web Developer & Digital Artist",
    description:
      "Portfolio of Romeo Culp — web developer and digital artist. Front-end builds, photo edits, posters, and brand work.",
    siteName: "Romeo Culp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Romeo Culp — Web Developer & Digital Artist",
    description:
      "Portfolio of Romeo Culp — web developer and digital artist. Front-end builds, photo edits, posters, and brand work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll>
          <Noise />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
